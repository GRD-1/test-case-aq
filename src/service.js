import footprintApi from './footprintApi';
import getHome from './home';
import { fetchingQueue, processingQueue } from './utils/task-queue.js';

export default {
  async getHomePage() {
    return getHome();
  },

  async getEmission(args) {
    const { year } = args;
    let fetchingResults = [];
    let processingResults = [];
    let lastProcessedIndex = -1;

    let countries = await footprintApi.getCountries();
    countries = countries.slice(0, 4);

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

        if (lastProcessedIndex < fetchingResults.length - 1) {
          processData(fetchingResults, lastProcessedIndex, countries);
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
  },
};

async function processData(fetchingResults, lastProcessedIndex, countries) {
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
