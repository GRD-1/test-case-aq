import fastq from 'fastq';

class TaskQueue {
  constructor(concurrency = 1) {
    this.queue = fastq.promise(this, this._worker, concurrency);
    this.failedTasks = [];
    this.results = [];
    this.limit = 10;
    this.interval = 1000;
  }

  async _worker(task) {
    try {
      console.log(`Processing task: ${task.id}`);
      const result = await task.execute();
      console.log(`Task ${task.id} completed.`);
      this.results.push({ id: task.id, status: 'success', result });
    } catch (error) {
      console.error(`Error in task ${task.id}:`, error.message);
      this.failedTasks.push(task);
      throw error;
    }
  }

  async addTasks(tasks) {
    try {
      let count = 0;
      for (let task of tasks) {
        if (count >= this.limit) {
          await this.wait();
          this.limit = count - this.failedTasks.length;
          tasks.push(...this.failedTasks);
          this.failedTasks = [];
          count = 0;
        }
        void this.queue.push(task);
        count++;
      }
    } catch (error) {
      console.log('Failed to add task due to an error.');
    }
  }

  async wait() {
    const delay = this.interval / this.limit;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  getResults() {
    return this.results;
  }
}

const taskQueueInstance = new TaskQueue();
export default taskQueueInstance;
