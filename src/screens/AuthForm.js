import React from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';


export default class LogIn extends React.Component{
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            username: ''
        }
    }

    onSubmit(){
        if(this.props.form === 'login') {
            this.props.loggedIn(this.state.email, this.state.password);
        }else{
            this.props.register(this.state.email, this.state.username, this.state.password);
        }
    }

    render(){
        return(
            <View style={styles.auth}>
                <View style={styles.headerForm}>
                    <TouchableOpacity 
                      style={
                        this.props.form === 'register' ? styles.labelBtnActive : styles.labelBtnDeact
                      }
                      activeOpacity={0.5}
                      onPress={() => this.props.selectLabel('register')}
                    >
                      <Text style={styles.labels}>Registrarse</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={
                        this.props.form === 'login' ? styles.labelBtnActive : styles.labelBtnDeact
                      }
                      activeOpacity={0.5}
                      onPress={() => this.props.selectLabel('login')}
                    >
                      <Text style={styles.labels}>Ingresar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.form}>
                    <Text style={{marginTop: 30, marginLeft: 30, color: 'red'}}>{this.props.error}</Text>
                    <Text style={styles.text}>Email:</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={(text) => this.setState({email: text})}
                    />

                    { this.props.form === 'register' &&
                        <>
                            <Text style={styles.text}>Username:</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => this.setState({username: text})}
                            />
                        </>
                    }

                    <Text style={styles.text}>Contraseña:</Text>
                    <TextInput
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={(text) => this.setState({password: text})}
                    />
                    {
                        this.props.form === 'register' ? (
                            <TouchableOpacity
                                style={styles.btnSubmit}
                                onPress={() => this.onSubmit()}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.btnText}>Registrarse</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.btnSubmit}
                                onPress={() => this.onSubmit()}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.btnText}>Ingresar</Text>
                            </TouchableOpacity>
                        )
                    }
                
                </View>
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    form: {
        margin: 25,
        flex: 10,
    },
    text: {
        fontSize: 24
    },
    btnText: {
        textAlign: 'center',
        fontSize: 24,
        color: 'white'
    },
    input: {
        backgroundColor: '#fafafa',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        height: 50,
        marginBottom: 10,

    },
    btnSubmit: {
        width: '100%',
        height: 50,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 20
    },
    preview: {
        width: 300,
        height: 300,
        borderWidth: 2,
        opacity: 1,
        borderColor: 'black'
    },

    headerForm: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        backgroundColor: '#fff'
      },
      labels: {
        fontSize: 24,
        textAlign: 'center'
      },
      labelBtnDeact: {
        width: '50%',
        borderBottomWidth: 2,
        borderColor: 'black'
      },
      labelBtnActive: {
        width: '50%',
        borderWidth: 2,
        borderBottomWidth: 0,
        borderColor: 'black'
      },
      auth: {
        flex: 10
      }
});