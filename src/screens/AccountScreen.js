import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { auth, db } from '../config/firebase';
import Posts from '../Components/Posts/Posts';


export default class AccountScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            username: auth.currentUser.displayName,
            email: auth.currentUser.email,
            posts: []
        }
    }

    componentDidMount(){
        this.getPosts();
    }

    getPosts(){
        const dbresults = [];
        db.collection('gallery').where('name', '==', this.state.username).get()
        .then(response => {
            response.forEach(result => {
                dbresults.push(result.data());
            });
            dbresults.sort((a, b) => a.created_at < b.created_at);

            this.setState({posts: dbresults});
        })
    }

    async deletePost(param) {
        db.collection('gallery').where('created_at', '==', param).get()
        .then(data => {
            data.forEach(doc => doc.ref.delete())
            const postsFiltered = this.state.posts.filter(post => post.created_at != param)
            this.setState({posts: postsFiltered});
        })        
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.info}>
                    <Text style={styles.text}>Username: {this.state.username}</Text>
                    <Text style={styles.text}>E-mail: {this.state.email}</Text>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => auth.signOut()}
                    >
                        <Text>Log Out</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.posts}>
                    <Posts
                        deletePhoto={(param) => this.deletePost(param)}
                        isOwner={true}
                        posts={this.state.posts}
                    />
                </View>
                
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
    },
    text: {
        fontSize: 20
    },
    btn: {
        padding: 10,
        marginTop: 20,
        backgroundColor: '#d6d6d6'
    },
    posts: {
        flex: 4,
        width: '100%'
    },
    info: {
        flex: 1
    }
})