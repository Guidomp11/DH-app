import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import Post from './Post';

export default function Posts({posts, isOwner=false, deletePhoto=null}){
    
    const renderItem = ({item}) => {
        if(isOwner){
            return(
                <TouchableOpacity
                    onLongPress={() => deletePhoto(item.created_at)}
                    activeOpacity={0.5}
                >
                    <Post post={item} />
                </TouchableOpacity>
            )
        }else{
            return <Post post={item} />
        }
    }

    return(
        <View style={{width: '100%', flex: 1}}>
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={item => item.created_at}
            />
        </View>
    )
}