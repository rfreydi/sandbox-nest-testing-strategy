export class Tracker {
  #count = 1;

  track(data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.#count > 5) {
        reject('Capacity exceeded, upgrade your plan ! :)');
      }
      console.log(`Track[${this.#count++}]`, data);
      resolve(undefined);
    });
  }
}
