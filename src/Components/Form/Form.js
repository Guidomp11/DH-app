import React from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { styles } from './styles';

export default class Form extends React.Component{
    constructor(){
        super();
        this.state = {
            description: ''
        }
    }

    onSubmit(){
        this.props.submit(this.state.description);
    }

    render(){
        return(
            <View style={styles.form}>
                <Text style={styles.text}>Descripcion:</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={(text) => this.setState({description: text})}
                />
                <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={() => this.onSubmit()}
                    activeOpacity={0.7}
                >
                    <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}