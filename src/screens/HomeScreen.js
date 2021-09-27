import React from 'react';
import { View, StyleSheet } from 'react-native';
import Posts from '../Components/Posts/Posts';
import MyActivityIndicator from '../Components/ActivityIndicator/MyActivityIndicator';

import { db } from '../config/firebase';

export default class HomeScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            posts: [],
            isLoading: true
        };
    }

    componentDidMount() {
        this.fetchGallery();
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.fetchGallery();
        });
    }

    componentWillUnmount(){
        this._unsubscribe();
    }

    fetchGallery(){
        this.setState({isLoading: true});

        const dbresults = [];
        db.collection('gallery').get()
        .then(response => {
            response.forEach(result => {
                dbresults.push(result.data());
            });
            dbresults.sort((a, b) => a.created_at < b.created_at);

            this.setState({posts: dbresults, isLoading: false});
        })
    }
    

    render(){
        return(
            <View style={styles.container}>
                {
                    this.state.isLoading ? 
                        <MyActivityIndicator />
                    :
                        <Posts posts={this.state.posts}/>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      justifyContent: 'center',
    },
});