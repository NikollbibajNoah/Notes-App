
import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';
import { useSearchParams } from 'expo-router/build/hooks';

const NotesPage = () => {
    const [params] = useSearchParams();
    const id:number = Number(params[1]);

  return (
    <View>
        <Stack.Screen options={{headerTitle: `Details #${id}`}} />
      <Text>NotesPage: {id}</Text>
    </View>
  )
}

export default NotesPage