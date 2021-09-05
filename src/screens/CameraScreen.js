import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MyModal from '../Components/MyModal/MyModal';
import Form from '../Components/Form/Form';
import MyCamera from '../Components/MyCamera/MyCamera';

import { Camera } from 'expo-camera';

import { db } from '../config/firebase';

export default class CameraScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            permission: false,
            modal: false,
            url: '',
            description: ''
        }
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(response => this.setState({permission: response}))
    }

    onImageUpload(url) {
        this.setState({modal: true, url});
    }

    submit(description){
        db.collection("gallery").add({
            name: 'Username',
            description,
            image: this.state.url
        })
        .then(() => {
            this.setState({modal: false});
        })
        .catch(e => console.error(e))
    }

    render(){
        if(!this.state.permission) return (<View><Text> Sin permisos :( </Text></View>)

        return(
            <View style={styles.container}>
                <MyCamera onImageUpload={(url) => this.onImageUpload(url)} />
                {
                    this.state.modal && (
                        <MyModal visible={this.state.modal}>
                            <Form submit={(description) => this.submit(description)} />
                        </MyModal>
                    )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});