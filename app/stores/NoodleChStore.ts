import { createContext, useContext } from 'react';
import { CharacterStore } from './CharacterStore';
import { NoodlesStore } from './NoodlesStore';

class NoodleChStore {
  noodleStore: NoodlesStore = new NoodlesStore();
  chStore: CharacterStore = new CharacterStore();

  constructor() {
    this.noodleStore = new NoodlesStore();
    this.chStore = new CharacterStore();
  }
}

const noodlesChListStore = new NoodleChStore();

const NoodlesChListStoreContext = createContext(noodlesChListStore);

const useNoodlesChListStore = () => useContext(NoodlesChListStoreContext);

export {
  noodlesChListStore,
  NoodlesChListStoreContext,
  useNoodlesChListStore,
  NoodleChStore,
};
