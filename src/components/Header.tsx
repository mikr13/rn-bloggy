
import type { StackNavigation } from "@/types/routes";
import Feather from '@expo/vector-icons/Feather';
import { Header as ReactNavigationHeader } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { cloneElement, type ReactElement, type ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  headerRight: {
    icon: ReactNode;
    onPress: () => void;
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  button: {
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    margin: 5,
    marginHorizontal: 10,
  },
})

export const Header = ({ title, headerRight }: Props) => {
  const navigation = useNavigation<StackNavigation>();
  const canGoBack = navigation.canGoBack();
  return (
    <ReactNavigationHeader
      title={title}
      headerTitle={() => (<Text style={styles.title}>{title}</Text>)}
      headerLeft={() => canGoBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
      ) : null}
      headerRight={() => (
        <TouchableOpacity onPress={headerRight.onPress} style={styles.button}>
          {cloneElement(headerRight.icon as ReactElement, { size: 24 })}
        </TouchableOpacity>
      )}
    />
  )
};
