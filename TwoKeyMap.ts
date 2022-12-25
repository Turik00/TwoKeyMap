export class TwoKeyMap<S, T, U> {
  #map: Map<S, Map<T, U>>;

  constructor() {
    this.#map = new Map<S, Map<T, U>>();
  }

  public has(key1: S, key2: T): boolean {
    if (this.#map.has(key1) && this.#map.get(key1)?.has(key2)) {
      return true;
    }
    return false;
  }

  public get(key1: S, key2: T): U | undefined {
    if (this.#map.has(key1) && this.#map.get(key1)?.has(key2)) {
      return this.#map.get(key1)?.get(key2);
    }
    return undefined;
  }

  public set(key1: S, key2: T, value: U): void {
    if (!this.#map.has(key1)) {
      this.#map.set(key1, new Map([[key2, value]]));
      return;
    }
    this.#map.get(key1)?.set(key2, value);
  }

  public remove(key1: S, key2: T): void {
    if (!this.#map.has(key1)) {
      return;
    }
    this.#map.get(key1)?.delete(key2);
  }

  public keys(): Array<[S, T]> {
    const keyArray: [S, T][] = [];
    [...this.#map.keys()].forEach(key => [...(this.#map.get(key)?.keys() ?? [])].forEach(secondKey => keyArray.push([key, secondKey])));
    return keyArray;
  }

  public clear(): void {
    [...this.#map.values()].forEach(v => v.clear());
    this.#map.clear();
  }
}
