import footprintApi from './footprintApi.js';
import getHome from './home.js';
import { InternalError } from './errors/errors.js';
import { INTERNAL_ERRORS } from './errors/error-codes.js';
import Provider from './utils/provider.js';
import TaskQueue from './utils/task-queue.js';

export default {
  async getHomePage() {
    return getHome();
  },

  async getEmission(args) {
    const fetchingQueueArgs = [
      process.env.FETCH_QUEUE_CONCURRENCY,
      process.env.FETCH_QUEUE_LIMIT,
      process.env.FETCH_QUEUE_INTERVAL,
    ];
    const processingQueueArgs = [
      process.env.PROCESS_QUEUE_CONCURRENCY,
      process.env.PROCESS_QUEUE_LIMIT,
      process.env.PROCESS_QUEUE_INTERVAL,
    ];
    const fetchingQueue = Provider.getService(TaskQueue, fetchingQueueArgs);
    const processingQueue = Provider.getService(TaskQueue, processingQueueArgs);

    return Promise.race([
      setCustomTimeout(fetchingQueue, processingQueue),
      getEmissionData(args, fetchingQueue, processingQueue),
    ]);
  },
};

async function getEmissionData(args, fetchingQueue, processingQueue) {
  const { year } = args;
  let fetchingResults = [];
  let processingResults = [];
  let lastProcessedIndex = -1;

  let countries = await footprintApi.getCountries();
  countries = countries.slice(0, 5);
  console.log('In application file:', footprintApi);

  const fetchingTasks = countries.map((country) => {
    return {
      id: country.countryCode,
      execute: async () => {
        const countryEmission = await footprintApi.getDataForCountry(country.countryCode);

        return countryEmission.find((item) => item.year === year);
      },
    };
  });

  await fetchingQueue.addTasks(fetchingTasks);

  await new Promise((resolve) => {
    const checkQueue = setInterval(() => {
      fetchingResults = fetchingQueue.getResults();
      processingResults = processingQueue.getResults();

      if (fetchingQueue.queue.idle()) {
        fetchingQueue.rerunFailed();
      }
      if (processingQueue.queue.idle()) {
        processingQueue.rerunFailed();
      }

      if (lastProcessedIndex < fetchingResults.length - 1) {
        processData(processingQueue, fetchingResults, lastProcessedIndex, countries);
        lastProcessedIndex = fetchingResults.length - 1;
      }

      const isFetchingCompleted = fetchingResults.length === fetchingTasks.length;
      const isProcessingCompleted = processingResults.length === fetchingTasks.length;

      if (isProcessingCompleted && isFetchingCompleted) {
        clearInterval(checkQueue);
        resolve();
      }
    }, 100);
  });

  return processingResults;
}

async function processData(processingQueue, fetchingResults, lastProcessedIndex, countries) {
  const processingResults = processingQueue.getResults();
  if (processingResults.length < fetchingResults.length) {
    const startIndex = lastProcessedIndex + 1;
    const data = fetchingResults.slice(startIndex);
    const processingTasks = data.map((item) => {
      let countryData = item.result;
      if (!countryData) {
        countryData = countries.find((country) => country.countryCode === item.id);
      }

      return {
        id: item.countryCode,
        execute: async () => {
          return {
            ...countryData,
            carbon: countryData.carbon || null,
          };
        },
      };
    });

    await processingQueue.addTasks(processingTasks);
  }
}

async function setCustomTimeout(fetchingQueue, processingQueue) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      fetchingQueue.queue.kill();
      processingQueue.queue.kill();
      reject(new InternalError(INTERNAL_ERRORS.TIMEOUT_EXPIRED));
    }, process.env.GLOBAL_TIMEOUT);
  });
}
