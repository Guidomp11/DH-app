import React from 'react';
import { View, Image, Text } from 'react-native';

import { styles } from './styles';

export default function Post({post}) {
    return(
        <View style={styles.post}>
            <Text style={styles.username}>{post.name}</Text>
            <Image style={styles.image} source={{uri: post.image}} />
            <Text style={styles.description}>{post.description}</Text>
        </View>
    )
}