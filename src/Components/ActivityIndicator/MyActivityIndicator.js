import React from 'react';
import { ActivityIndicator, View, StyleSheet, Dimensions } from 'react-native';


export default function MyActivityIndicator(){
    return(
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
    }
})