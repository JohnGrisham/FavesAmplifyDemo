import * as React from 'react';
import { DataStore } from 'aws-amplify';
import { StyleSheet } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { FlatList } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Post } from '../src/models';

export default function PostsScreen({
  navigation,
}: RootTabScreenProps<'Posts'>) {
  const [posts, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    const initPosts = async () => {
      try {
        const subscriber = DataStore.observeQuery(Post);
        subscriber.subscribe((snapshot) => {
          const { items } = snapshot;
          console.log(
            'Posts retrieved successfully!',
            JSON.stringify(items, null, 2),
          );
          setPosts(items);
        });
      } catch (error) {
        console.log('Error retrieving posts', error);
      }
    };

    initPosts();
  }, []);

  const renderItem = React.useCallback(
    ({ item }) => <Text>{item.title}</Text>,
    [],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posts</Text>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
