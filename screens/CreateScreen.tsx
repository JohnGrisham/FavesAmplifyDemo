import * as React from 'react';
import { DataStore } from 'aws-amplify';
import { Button, TextInput, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Post } from '../src/models';

export default function CreateScreen() {
  const [title, setTitle] = React.useState('');

  const onCreatePost = React.useCallback(async () => {
    const post = await DataStore.save(new Post({ title }));
    console.log('Post created successfully!', JSON.stringify(post, null, 2));
  }, [title]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create</Text>
      <View>
        <TextInput
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.nativeEvent.text)}
        />
        <Button title="Create Post" onPress={onCreatePost}></Button>
      </View>
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
