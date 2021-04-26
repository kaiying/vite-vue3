import LocalRecordsService from '@/src/services/search/local-records-service';
import LocalStorageServices from '@/src/services/local-storage-services';

export const getLocalRecordsService = () => {
  try {
    return new LocalRecordsService(new LocalStorageServices(Storage, localStorage));
  } catch (error) {
    console.log(error.message);
    return {
      get: () => [],
      save: (val) => null,
    };
  }
};
export const getLocalRecommends = ({ items, recommendKeywords, localService }) => () => {
  items.value = [...(localService.get() || [])];
  recommendKeywords.value = '';
};

export const setLocalRecommends = ({ searchKeywords, localService }) => () => {
  localService.save(searchKeywords.value);
};
