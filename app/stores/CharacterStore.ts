import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
  when,
} from 'mobx';
import { fromPromise } from 'mobx-utils';
import { createContext, useContext } from 'react';
type Ch = {
  id: number;
  name: string;
};
class CharacterStore {
  chList: Ch[] = [];

  async getChList() {
    const res = fromPromise(fetch('https://rickandmortyapi.com/api/character'));

    when(
      () => res.state !== 'pending',
      async () => {
        switch (res.state) {
          case 'fulfilled': {
            const list = (await res.value.json()).results;
            this.setChList(list);
            break;
          }

          default:
            runInAction(() => {
              //   this.chList = [];
            });

            break;
        }
      },
    );
  }

  setChList = (list: Ch[]) => {
    this.chList = list;
  };

  get charList() {
    return this.chList;
  }

  constructor() {
    makeAutoObservable(this, {
      getChList: action.bound,
      charList: computed,
      chList: observable.deep,
      setChList: action,
    });
  }
}

const characterListStore = new CharacterStore();

const characterListStoreContext = createContext(characterListStore);

const useCharacterListStore = () => useContext(characterListStoreContext);

export {
  characterListStore,
  characterListStoreContext,
  useCharacterListStore,
  CharacterStore,
};
