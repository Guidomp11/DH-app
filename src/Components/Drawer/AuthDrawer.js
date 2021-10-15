import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { auth } from '../../config/firebase';

import LogIn from '../../screens/LoginScreen';
import Register from '../../screens/RegisterScreen';

import MyActivityIndicator from '../../Components/ActivityIndicator/MyActivityIndicator';

const Drawer = createDrawerNavigator();

export default class AuthDrawer extends React.Component {

    constructor(){
        super();
        this.state = {
            error: null,
            isLoading: false
        }
    }

    loggedIn(email, pass){
        this.setState({isLoading: true})
        auth.signInWithEmailAndPassword(email, pass)
        .then(() => {
          this.props.onUserAuth(true);
        })
        .catch(error => {
            this.props.onUserAuth(false);
            this.setState({error: 'Credenciales invalidas.'});
        })
    }

    register(email, username, pass){
        this.setState({isLoading: true})
        auth.createUserWithEmailAndPassword(email, pass)
        .then(response => {
          response.user.updateProfile({
            displayName: username
          }).then(() => {
            this.props.onUserAuth(true);
          });      
        })
        .catch(error => {
            this.props.onUserAuth(false);
            this.setState({error: error});
        })
    }

    render(){
        return (
            <>
                {
                    !this.state.isLoading ? 
                    <Drawer.Navigator>
                        <Drawer.Screen name="Ingresar" component={ () => <LogIn error={this.state.error} loggedIn={(email, pass) => this.loggedIn(email, pass)} />
                        } />
                        <Drawer.Screen name="Registrarse" component={ () => <Register error={this.state.error} register={(email, username, pass) => this.register(email, username, pass)} />
                        } />
                    </Drawer.Navigator> : (
                        <MyActivityIndicator visible={true}/>
                    )
                }
            </>
        );
    }
}