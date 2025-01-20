import fastq from 'fastq';

export default class TaskQueue {
  constructor(concurrency = 1, limit, interval) {
    this.queue = fastq.promise(this, this._worker, concurrency);
    this.failedTasks = [];
    this.results = [];
    this.limit = limit;
    this.interval = interval;
  }

  async _worker(task) {
    try {
      const result = await task.execute();
      this.results.push({ id: task.id, status: 'success', result });
    } catch (error) {
      this.failedTasks.push(task);
      throw error;
    }
  }

  async addTasks(tasks) {
    let count = 0;
    for (let task of tasks) {
      try {
        if (count >= this.limit) {
          await this.wait();
          this.limit = count - this.failedTasks.length;
          count = 0;
        }
        void this.queue.push(task);
        count++;
      } catch (error) {
        this.failedTasks.push(task);
      }
    }
  }

  async wait() {
    const delay = this.interval / this.limit;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  getResults() {
    return this.results;
  }

  rerunFailed() {
    if (this.failedTasks.length > 0) {
      void this.addTasks(this.failedTasks);
      this.failedTasks = [];
    }
  }
}
