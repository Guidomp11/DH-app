import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { auth } from '../config/firebase';


export default class AccountScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            username: auth.currentUser.displayName,
            email: auth.currentUser.email
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Username: {this.state.username}</Text>
                <Text style={styles.text}>E-mail: {this.state.email}</Text>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => auth.signOut()}
                >
                    <Text>Log Out</Text>
                </TouchableOpacity>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20
    },
    btn: {
        padding: 10,
        marginTop: 20,
        backgroundColor: '#d6d6d6'
    }
})