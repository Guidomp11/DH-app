import React from 'react';
import {NavigationContainer} from "@react-navigation/native"

import MyDrawer from './src/Components/Drawer/MyDrawer';
import AuthForm from './src/screens/AuthForm';
import MyActivityIndicator from './src/Components/ActivityIndicator/MyActivityIndicator';

import { auth } from './src/config/firebase';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      form: 'register',
      isLoggedIn: false,
      isLoading: false,
      error: ''
    }
  }

  selectLabel(label){
    this.setState({form: label});
  }

  loggedIn(email, pass){
    this.setState({isLoading: true})
    auth.signInWithEmailAndPassword(email, pass)
    .then(() => {
      this.setState({isLoggedIn: true, isLoading: false});
    })
    .catch(error => {
      this.setState({isLoggedIn: false, error: 'Credenciales invalidas.', isLoading: false})
    })
  }

  register(email, username, pass){
    this.setState({isLoading: true})
    auth.createUserWithEmailAndPassword(email, pass)
    .then(response => {
      response.user.updateProfile({
        displayName: username
      }).then(() => {
        this.setState({isLoggedIn: true, isLoading: false});
      });      
    })
    .catch(error => {
      this.setState({isLoggedIn: false, error: error, isLoading: false})
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
        <>
          {
            this.state.isLoading ? 
              <MyActivityIndicator visible={true}/> 
            :
              <AuthForm 
                loggedIn={(email, pass) => this.loggedIn(email, pass)} 
                register={(email, username, pass) => this.register(email, username, pass)}
                form={this.state.form}
                selectLabel={(label) => this.selectLabel(label)}
                error={this.state.error}
              />
          }
          
          
        </>
      )
    }    
  }  
}