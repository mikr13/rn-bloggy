import { Header } from "@/components/Header";
import { useStore } from "@/store";
import type { Blog } from "@/types/blog";
import type { StackNavigation } from "@/types/routes";
import Feather from '@expo/vector-icons/Feather';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { z } from 'zod';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  input: {
    height: 40,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 5,
  },
  inputFocused: {
    backgroundColor: '#f7f7f7',
    borderColor: '#007BFF',
  },
  errorText: {
    color: 'red',
  },
});

const schema = z.object({
  title: z.string().min(10, 'Title is required & should be at least 10 characters'),
  content: z.string().min(20, 'Content is required & should be at least 20 characters'),
  imageURL: z.string().url('Invalid URL'),
});

type Props = {
  route: {
    params: {
      id?: string;
    }
  }
}

export const CreateScreen = ({ route }: Props) => {
  const navigation = useNavigation<StackNavigation>();
  const addBlog = useStore((state) => state.addBlog);
  const editBlog = useStore((state) => state.editBlog);
  const blogs = useStore((state) => state.blogs);
  const blog = blogs.find((b) => b.id === route.params?.id);
  const { register, handleSubmit, setValue, formState: { errors }, control } = useForm<Omit<Blog, "id">>({
    resolver: zodResolver(schema),
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  useEffect(() => {
    if (route.params?.id) {
      if (blog) {
        setValue('title', blog.title);
        setValue('content', blog.content);
        setValue('imageURL', blog.imageURL);
        setIsEdit(true);
      }
    }
  }, [route.params?.id]);

  const onSubmit = (data: Omit<Blog, "id">) => {
    if (isEdit) {
      editBlog({
        ...data,
        id: blog?.id ?? '',
      });
    } else {
      addBlog(data);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        title="Create Blog"
        headerRight={{
          icon: <Feather name="save" />,
          onPress: () => {
            handleSubmit((values) => {
              onSubmit(values);
              navigation.navigate('Index', {});
            })();
          }
        }}
      />
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                focusedInput === 'title' && styles.inputFocused,
              ]}
              onBlur={() => {
                onBlur();
                setFocusedInput(null);
              }}
              onFocus={() => setFocusedInput('title')}
              onChangeText={onChange}
              value={value}
              placeholder="Title"
            />
          )}
        />
        {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}
        <Controller
          control={control}
          name="imageURL"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                focusedInput === 'imageURL' && styles.inputFocused,
              ]}
              onBlur={() => {
                onBlur();
                setFocusedInput(null);
              }}
              onFocus={() => setFocusedInput('imageURL')}
              onChangeText={onChange}
              value={value}
              placeholder="Image URL"
            />
          )}
        />
        {errors.imageURL && <Text style={styles.errorText}>{errors.imageURL.message}</Text>}
        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              multiline
              style={[
                styles.input,
                focusedInput === 'content' && styles.inputFocused,
                { height: "auto", minHeight: 100 },
              ]}
              onBlur={() => {
                onBlur();
                setFocusedInput(null);
              }}
              onFocus={() => setFocusedInput('content')}
              onChangeText={onChange}
              value={value}
              placeholder="Content"
            />
          )}
        />
        {errors.content && <Text style={styles.errorText}>{errors.content.message}</Text>}
        <Button onPress={handleSubmit((values) => {
          onSubmit(values);
          navigation.navigate('Index', {});
        })} title="Save" />
      </View>
    </View>
  );
};
