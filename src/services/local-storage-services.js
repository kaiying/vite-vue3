import { isEmptyValue } from '@/src/helper/data-process';

export default class LocalStorageServices {
  constructor(storage, localStorage) {
    this.storage = storage;
    this.local = localStorage;
  }

  isSupport() {
    return !isEmptyValue(this.storage);
  }

  get(key, defaultValue) {
    return JSON.parse(this.local.getItem(key)) || defaultValue;
  }

  set(key, data) {
    this.local.setItem(key, JSON.stringify(data));
  }
}
