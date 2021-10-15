import React from 'react';
import {NavigationContainer} from "@react-navigation/native"

import MainDrawer from './src/Components/Drawer/MainDrawer';
import AuthForm from './src/screens/AuthForm';
import MyActivityIndicator from './src/Components/ActivityIndicator/MyActivityIndicator';

import { auth } from './src/config/firebase';
import AuthDrawer from './src/Components/Drawer/AuthDrawer';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      isLoggedIn: false,
      isLoading: false,
      error: ''
    }
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

  onUserAuth(value) {
    this.setState({isLoggedIn: value, isLoading: false});
  }

  render(){
    if(this.state.isLoggedIn) {
      return (
        <NavigationContainer>
          <MainDrawer />
        </NavigationContainer>
      );
    }else{
      return (
        <NavigationContainer>
          <AuthDrawer onUserAuth={(value) => this.onUserAuth(value)} />
        </NavigationContainer>
      )
    }    
  }  
}