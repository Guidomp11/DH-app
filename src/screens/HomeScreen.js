import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Posts from '../Components/Posts/Posts';

import { db } from '../config/firebase';

export default class HomeScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            posts: []
        };
        this.dbresults = [];
    }

    componentDidMount() {
        db.collection('gallery').get()
        .then(response => {
            response.forEach(result => {
                this.dbresults.push(result.data());
            })
            this.setState({posts: this.dbresults});
        })

    }
    

    render(){
        return(
            <View style={styles.container}>
                <Posts posts={this.state.posts}/>
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