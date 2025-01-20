import footprintApi from './footprintApi';
import getHome from './home';
import { InternalError } from './errors/errors';
import { INTERNAL_ERROR_CODES } from './errors/error-codes';
import Provider from './utils/provider';
import TaskQueue from './utils/task-queue';

export default {
  async getHomePage() {
    return getHome();
  },

  async getEmission(args) {
    const fetchingQueue = Provider.getService(TaskQueue, [1, 10, 1000]);
    const processingQueue = Provider.getService(TaskQueue, [100, 100, 1000]);

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
  countries = countries.slice(0, 20);

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
  const timeoutMs = process.env.GLOBAL_TIMEOUT;

  return new Promise((_, reject) => {
    setTimeout(() => {
      fetchingQueue.queue.kill();
      processingQueue.queue.kill();
      reject(
        new InternalError(
          `Request timed out after ${timeoutMs} ms`,
          INTERNAL_ERROR_CODES.TIMEOUT_EXPIRED,
        ),
      );
    }, timeoutMs);
  });
}
