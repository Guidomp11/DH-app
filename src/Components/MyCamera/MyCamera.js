import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

import MyModal from '../MyModal/MyModal';

import { storage } from '../../config/firebase';

export default class MyCamera extends React.Component{
    constructor(){
        super();
        this.state = {
            photo: '',
            modal: false
        }
        this.camera;
    }

    takePicture(){
        if(!this.camera) return;
        this.camera.takePictureAsync()
        .then(photo => {
            this.setState({
                photo: photo.uri,
                modal: true
            })
        })
    }

    uploadImage() {
        new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onerror = reject;
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4) {
                    resolve(xhr.response);
                }
            }
            xhr.open("GET", this.state.photo);
            xhr.responseType = 'blob';
            xhr.send();
        })
        .then(resolve => {
            const ref = storage.ref(`images/${Date.now()}`)
            ref.put(resolve)
            .then(() => {
                ref.getDownloadURL()
                .then(url => {
                    this.props.onImageUpload(url);
                    this.setState({modal: false});
                })
            })
        })
    }

    onReject() {
        this.setState({modal: false, photo: ''})
    }

    render(){
        return(
            <View style={styles.container}>
                <Camera style={styles.camera} type={Camera.Constants.Type.back}
                    ref={ref => this.camera = ref}
                >
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.takePicture()}>
                      </TouchableOpacity>
                    </View>
                </Camera>
                {
                    this.state.modal && (
                        <MyModal visible={this.state.modal}>
                            {
                                this.state.photo ? 
                                    <View style={styles.imageContainer}>
                                        <Image style={styles.preview} source={{uri: this.state.photo}} />
                                    </View>
                                :
                                    <Text>Error en carga preview</Text>
                            }

                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                    style={styles.reject}
                                    onPress={() => this.onReject()}
                                ><Text style={styles.text}>Cancelar</Text></TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.accept}
                                    onPress={() => this.uploadImage()}
                                ><Text style={styles.text}>Subir</Text></TouchableOpacity>
                            </View>
                        </MyModal>
                    )
                }
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    camera: {
        flex: 1,
        width: '100%'
    },
    buttonContainer: {
        width: '100%',
        height: 124,
        position: 'absolute',
        bottom: 40,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        width: 124,
        height: '100%',
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 100,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    text: {
        width: '100%',
        textAlign: 'center',
        color: 'white',
        paddingTop: 15
    },
    imageContainer: {
        height: '90%',
    },
    preview: {
        width: '100%',
        height: '100%'
    },
    btnContainer: {
        height: '10%',
        backgroundColor: 'rgba(0,0,0,0.1)',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    accept: {
        
        width: 100,
        height: 50,
        backgroundColor: 'green',
        borderRadius: 50
    },
    reject: {
        
        width: 100,
        height: 50,
        backgroundColor: 'red',
        borderRadius: 50
    }
})
