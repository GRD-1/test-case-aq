class RateLimiter {
  static _instance = null;
  limit = Number(process.env.FOOTPRINT_RATE_LIMIT);
  interval = this.limit * 1000;
  requestLog = [];

  constructor(limit) {}

  static getInstance() {
    if (!RateLimiter._instance) {
      RateLimiter._instance = new RateLimiter();
    }
    return RateLimiter._instance;
  }

  getDelayForNextRequest() {
    this.updateRequestLog()
    let delay = 0;

    if (this.requestLog.length < this.limit) {
      const nextTime = this.requestLog[this.requestLog.length - this.limit] + this.interval;
      delay = nextTime - Date.now()
    }

    return delay;
  }

  updateRequestLog() {
    const now = Date.now();
    const start = now - this.interval;

    const firstValidIndex = this.requestLog.findIndex((item) => item >= start);
    this.requestLog = firstValidIndex ? this.requestLog.slice(firstValidIndex) : [];

    this.requestLog.push(now);
  }

  updateLimit() {
    this.updateRequestLog();
    this.limit = this.requestLog.length - 1;
  }
}

export default RateLimiter.getInstance();
