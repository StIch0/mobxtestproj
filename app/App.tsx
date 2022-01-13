import { NavigationContainer } from '@react-navigation/native';
import { configure } from 'mobx';
import { stopPersisting } from 'mobx-persist-store';
import { default as React, useEffect, useLayoutEffect, useState } from 'react';
import { LogBox } from 'react-native';
import RootStackNavigator from './navigation/RootNavigation';
import { noodlesChListStore } from './stores/NoodleChStore';
import { noodlesListStore } from './stores/NoodlesStore';

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: false,
});

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs([
      '`flexWrap: `wrap`` is not supported with the `VirtualizedList` components.Consider using `numColumns` with `FlatList` instead.',
    ]);
    stopPersisting(noodlesListStore);
    return () => {
      stopPersisting(noodlesListStore);
    };
  }, []);

  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default App;
