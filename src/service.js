import footprintApi from './footprintApi';
import getHome from './home';
import taskQueue from './utils/task-queue.js';

export default {
  async getHomePage() {
    return getHome();
  },

  async getEmission(args) {
    const { year, pageFrom, pageTo } = args;
    let results = [];

    const countries = await footprintApi.getCountries();

    const tasks = countries.map((country) => {
      return {
        id: country.countryCode,
        execute: async () => {
          console.log(`Fetching data for country: ${country.countryCode}`);
          const countryEmission = await footprintApi.getDataForCountry(country.countryCode);

          return countryEmission.find((item) => item.year === year);
        },
      };
    });

    await taskQueue.addTasks(tasks);

    await new Promise((resolve) => {
      const checkQueue = setInterval(() => {
        results = taskQueue.getResults();
        if (taskQueue.queue.idle() && results.length === tasks.length) {
          clearInterval(checkQueue);
          resolve();
        }
      }, 100);
    });

    const isThereConditions = pageFrom || pageTo;

    return isThereConditions ? processData(results, args) : results;
  },
};

function processData(data, args) {
  const { year, pageFrom, pageTo, recordsPerPage } = args;
  let processedData;

  if (year) {
    processedData = [data.find((item) => Number(item.year) === year)];
  }
  if (pageFrom || pageTo) {
    const firstRecord = pageFrom ? pageFrom * recordsPerPage : 0;
    const lastRecord = pageTo ? pageTo * recordsPerPage : data.length - 1;

    processedData = data.slice(firstRecord, lastRecord);
  }

  return processedData;
}
