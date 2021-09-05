import React from 'react';
import { View, FlatList } from 'react-native';
import Post from './Post';

export default function Posts({posts}){

    const renderItem = ({item}) => {
        return <Post post={item} />
    }

    return(
        <View style={{width: '100%'}}>
            <FlatList 
                data={posts}
                renderItem={renderItem}
                keyExtractor={item => item.image}
            />
        </View>
    )
}