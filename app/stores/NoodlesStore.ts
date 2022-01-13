import AsyncStorage from '@react-native-async-storage/async-storage';
import { action, computed, makeObservable, observable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { createContext, useContext } from 'react';
import { NoodleItem } from '../screens/noodlesList/types';

type NoodlesRecord = Record<string, NoodleItem>;

class NoodlesStore {
  noodlesList: NoodleItem[] = [];

  get noodlesIdxItems() {
    return this.noodlesList.map(({ id }) => id);
  }

  get noodlesRecord() {
    return this.noodlesList.reduce((res: NoodlesRecord, innerItem) => {
      res = {
        ...res,
        [innerItem.id]: innerItem,
      };
      return res;
    }, {});
  }

  addNoodleItem(noodle: NoodleItem) {
    this.noodlesList.push(noodle);
  }

  editNoodleItem(noodle: NoodleItem) {
    this.noodlesList = this.noodlesList.map((innerItem) => {
      if (innerItem.id === noodle.id) {
        return {
          ...noodle,
        };
      }

      return {
        ...innerItem,
      };
    });
  }

  removeNoodleItem(id: string) {
    this.noodlesList = this.noodlesList.filter(
      ({ id: noodleId }) => noodleId !== id,
    );
  }

  constructor() {
    makeObservable(this, {
      noodlesList: observable.deep,
      addNoodleItem: action.bound,
      removeNoodleItem: action.bound,
      editNoodleItem: action.bound,
      noodlesRecord: computed.struct,
      noodlesIdxItems: computed.struct,
    });

    makePersistable(this, {
      name: 'NoodlesStore',
      properties: ['noodlesList'],
      storage: AsyncStorage,
    });
  }
}

const noodlesListStore = new NoodlesStore();

const NoodlesListStoreContext = createContext(noodlesListStore);

const useNoodlesListStore = () => useContext(NoodlesListStoreContext);

export {
  noodlesListStore,
  NoodlesListStoreContext,
  useNoodlesListStore,
  NoodlesStore,
};
