export class Meeter {
  #store = {};

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
      const id = `${
        (date.getTime() +
          [...email].reduce((acc, value) => acc + value.charCodeAt(0), 0)) /
        42
      }`;
      const item = {
        id,
        date,
      };
      this.#store[email].push(item);
      resolve(item);
    });
  }
}
