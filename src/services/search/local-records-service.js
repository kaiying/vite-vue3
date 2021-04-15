import { dropLast, pipe, length, ifElse, uniq, prepend } from 'ramda';
import { LocalStorageKey } from '@/src/constant/local-storage';
import { historyCount } from '@/src/constant/search/search';
import { BrowserNotSupportException, browserNotSupportType } from '@/src/exceptions/browser-not-support-exception';

/**
 * 移除超過的紀錄筆數
 */
const isRedundant = (records) => length(records) > historyCount;
const dropRedundant = (records) => dropLast(length(records) - historyCount, records);
const removeRedundant = ifElse(isRedundant, dropRedundant, (x) => x);

export default class LocalRecordsService {
  constructor(localStorageService) {
    /** localStorageService */
    this.localStorageService = localStorageService;
    this.key = LocalStorageKey.searchRecord;
    this.check();
  }

  isSupport() {
    return this.localStorageService.isSupport();
  }

  check() {
    if (!this.isSupport()) throw new BrowserNotSupportException(browserNotSupportType.localStorage);
  }

  get() {
    if (!this.isSupport()) return [];
    return this.localStorageService.get(this.key, []);
  }

  save(keyword) {
    if (!this.isSupport()) return;
    const prependRecords = pipe(prepend(keyword), uniq, removeRedundant);
    this.localStorageService.set(this.key, prependRecords(this.get()));
  }
}
