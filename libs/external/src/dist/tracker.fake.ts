export class TrackerFake {
  #count = 1;

  constructor() {
    console.log('[TrackerFake] instantiated.');
  }

  track(data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.#count > 5) {
        reject('MAX CAPACITY');
      }
      console.log(`TrackFake[${this.#count++}]`, data);
      resolve(undefined);
    });
  }
}
