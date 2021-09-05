import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import {NavigationContainer} from "@react-navigation/native"
import MyDrawer from './src/Components/Drawer/MyDrawer';
import AuthForm from './src/screens/AuthForm';

import { auth } from './src/config/firebase';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      form: 'register',
      isLoggedIn: false,
      error: ''
    }
  }

  selectLabel(label){
    this.setState({form: label});
  }

  loggedIn(email, pass){
    auth.signInWithEmailAndPassword(email, pass)
    .then(() => {
      this.setState({isLoggedIn: true});
    })
    .catch(error => {
      this.setState({isLoggedIn: false, error: 'Credenciales invalidas.'})
    })
  }

  register(email, pass){
    auth.createUserWithEmailAndPassword(email, pass)
    .then(response => {
      this.setState({isLoggedIn: true});
    })
    .catch(error => {
      this.setState({isLoggedIn: false, error: error})
    })
  }

  componentDidMount(){
    //auth.signOut();
    auth.onAuthStateChanged(user => {
      if(user){
        this.setState({isLoggedIn: true})
      }else{
        this.setState({isLoggedIn: false})
      }
    })
  }

  render(){
    if(this.state.isLoggedIn) {
      return (
        <NavigationContainer>
          <MyDrawer />
        </NavigationContainer>
      );
    }else{
      return(
        <AuthForm 
          loggedIn={(email, pass) => this.loggedIn(email, pass)} 
          register={(email, pass) => this.register(email, pass)}
          form={this.state.form}
          selectLabel={(label) => this.selectLabel(label)}
          error={this.state.error}
        />
      )
    }    
  }  
}