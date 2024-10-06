import type { NavigationProp } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Index: {};
};

export type StackNavigation = NavigationProp<RootStackParamList>;

export type ScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>
