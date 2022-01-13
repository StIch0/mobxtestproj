import { NavigationProp, useNavigation } from '@react-navigation/core';
import { useTheme } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';
import addIcon from '../res/add';
import Noodle from '../screens/noodle';
import NoodlesList from '../screens/noodlesList';
import { RootStackParamList } from './types';

const RootStackNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onPressAdd = () => {
    navigation.navigate('Noodle');
  };

  const AddIcon = () => addIcon({ onPress: onPressAdd });

  const { dark } = useTheme();

  const noodlesOptions: NativeStackNavigationOptions = {
    headerTitle: 'МОЯ ЛАПША',
    headerRight: AddIcon,
    headerTitleStyle: {
      color: dark ? '#ffffff' : '#222222',
    },
  };

  const noodleOptions: NativeStackNavigationOptions = {
    ...noodlesOptions,
    headerTitle: 'ЛАПША',
    headerBackTitle: 'Назад',
    headerRight: undefined,
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='NoodlesList'
        component={NoodlesList}
        options={noodlesOptions}
      />
      <Stack.Screen name='Noodle' component={Noodle} options={noodleOptions} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
