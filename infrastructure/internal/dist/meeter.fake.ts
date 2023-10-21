export class MeeterFake {
  #store = {};

  constructor() {
    console.log('[MeeterFake] instantiated.');
  }

  meet(email: string, date: Date): Promise<{ id: string; date: Date }> {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(this.#store[email])) {
        this.#store[email] = [];
      }
      if (
        this.#store[email].some(({ date: d }) => d.getTime() > date.getTime())
      ) {
        reject('There is already some meeting that are planned for later.');
      }
      const id = email.length.toString();
      const item = {
        id,
        date,
      };
      this.#store[email].push(item);
      resolve(item);
    });
  }
}
