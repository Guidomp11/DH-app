import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';

import { styles } from './styles';

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
                                this.state.photo ? <Image style={styles.preview} source={{uri: this.state.photo}} /> : <Text>Error en carga preview</Text>
                            }

                            <TouchableOpacity
                                style={styles.accept}
                                onPress={() => this.uploadImage()}
                            ><Text style={styles.text}>Subir</Text></TouchableOpacity>

                            <TouchableOpacity
                                style={styles.reject}
                                onPress={() => this.onReject()}
                            ><Text style={styles.text}>Cancelar</Text></TouchableOpacity>
                        </MyModal>
                    )
                }
            </View>
        )
    }
}

