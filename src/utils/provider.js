class Provider {
  constructor() {}

  static getProvider() {
    if (!this._instance) {
      this._instance = new Provider();
    }

    return this._instance;
  }

  getService(classRef, args) {
    return new classRef(...args);
  }
}

export default Provider.getProvider();
