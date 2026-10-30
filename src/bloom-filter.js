import { NotImplementedError } from "../extensions/index.js";

export default class BloomFilter {
  constructor(size = 100) {
    this.size = size;
    this.storage = this.createStore(size);
  }

  insert(item) {
    this.getHashValues(item).forEach((v) => this.storage.setValue(v));
  }

  mayContain(item) {
    return this.getHashValues(item).every((v) => this.storage.getValue(v));
  }

  createStore(size) {
    const storage = new Array(size).fill(false);
    return {
      getValue(index) { return storage[index]; },
      setValue(index) { storage[index] = true; },
    };
  }

  hash1(item) {
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      hash = (hash << 5) + hash + item.charCodeAt(i);
      hash &= hash;
      hash = Math.abs(hash);
    }
    return hash % this.size;
  }

  hash2(item) {
    let hash = 5381;
    for (let i = 0; i < item.length; i++) {
      hash = (hash << 5) + hash + item.charCodeAt(i);
    }
    return Math.abs(hash % this.size);
  }

  hash3(item) {
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      hash = (hash << 5) - hash;
      hash += item.charCodeAt(i);
      hash &= hash;
    }
    return Math.abs(hash % this.size);
  }

  getHashValues(item) {
    return [this.hash1(item), this.hash2(item), this.hash3(item)];
  }
}
