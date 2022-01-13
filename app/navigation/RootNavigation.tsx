import { NavigationProp, useNavigation } from '@react-navigation/core';
import { useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { runInAction } from 'mobx';
import React, { useEffect } from 'react';
import addIcon from '../res/add';
import chevronInCircle from '../res/chevronCircle';
import Noodle from '../screens/noodle';
import NoodlesList from '../screens/noodlesList';
import { useNoodlesListStore } from '../stores/NoodlesStore';
import { RootStackParamList } from './types';

const RootStackNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onPressAdd = () => {
    navigation.navigate('Noodle');
  };

  const AddIcon = () => addIcon({ onPress: onPressAdd });

  const { dark } = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='NoodlesList'
        component={NoodlesList}
        options={{
          headerTitle: 'МОЯ ЛАПША',
          headerRight: AddIcon,
          headerTitleStyle: {
            color: dark ? '#ffffff' : '#222222',
          },
        }}
      />
      <Stack.Screen
        name='Noodle'
        component={Noodle}
        options={{
          headerTitle: 'ЛАПША',
          headerBackTitle: 'Назад',
          headerTitleStyle: {
            color: dark ? '#ffffff' : '#222222',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
