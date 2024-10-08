import { Header } from "@/components/Header";
import { useStore } from "@/store";
import type { StackNavigation } from "@/types/routes";
import { truncate } from "@/util/string";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text } from "react-native";

type Props = {
  route: {
    params: {
      id: string;
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 10,
  }
})

export const DetailScreen = ({ route }: Props) => {
  const { id } = route.params;
  const navigation = useNavigation<StackNavigation>();
  const blogs = useStore((state) => state.blogs);
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Header
        title={truncate(blog.title, 20)}
        headerRight={{
          icon: <Feather name="edit-2" />,
          onPress: () => navigation.navigate('CreateOrEdit', {
            id: blog.id,
          })
        }}
      />
      <Image source={{ uri: blog.imageURL }} style={styles.image} />
      <Text style={styles.content}>{blog.content}</Text>
    </ScrollView>
  );
};
