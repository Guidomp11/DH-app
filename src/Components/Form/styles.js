import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    form: {
        margin: 25,
        height: '92%'
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
        position: 'absolute',
        bottom: 10
    },
    preview: {
        width: 300,
        height: 300,
        borderWidth: 2,
        opacity: 1,
        borderColor: 'black'
    }
})