import { Header } from "@/components/Header";
import { useStore } from "@/store";
import type { StackNavigation } from "@/types/routes";
import { showToast } from "@/util/toast";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  iconStyle: {
    fontSize: 25,
    marginHorizontal: 10,
  },
  createButton: {
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    margin: 5,
    marginRight: 10,
  }
})

export const IndexScreen = () => {
  const navigation = useNavigation<StackNavigation>();
  const blogs = useStore((state) => state.blogs);
  const deleteBlog = useStore((state) => state.deleteBlog);

  const handleDelete = (id: string) => {
    deleteBlog(id);
    showToast("info", "Blog deleted successfully", undefined, true, 2000);
  }

  return (
    <View style={styles.container}>
      <Header
        title="Blogs"
        headerRight={{
          icon: <Feather name="plus" />,
          onPress: () => navigation.navigate('Create', {})
        }}
      />
      <FlatList keyExtractor={(blog) => blog.id} data={blogs} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Detail', {
          id: item.id
        })} style={styles.card}>
          <Text>{item.title}</Text>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Feather name="trash" style={styles.iconStyle} />
          </TouchableOpacity>
        </TouchableOpacity>
      )} />
    </View>
  )
};

// IndexScreen.navigationOptions = ({ navigation }: ScreenProps<"Index">) => ({ // NOTE: could've done this way but whatever
//   title: 'Blogs',
//   headerRight: () => (
//     <TouchableOpacity onPress={() => navigation.navigate('Create', {})} style={styles.createButton}>
//       <Feather name="plus" size={24} />
//     </TouchableOpacity>
//   )
// });
