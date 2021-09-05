import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    camera: {
        flex: 1,
        width: '100%'
    },
    buttonContainer: {
        width: '100%',
        height: 124,
        position: 'absolute',
        bottom: 40,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        width: 124,
        height: '100%',
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 100,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    text: {
        width: '100%',
        textAlign: 'center',
        color: 'white',
        paddingTop: 15
    },
    preview: {
        width: '100%',
        height: '100%',
    },
    accept: {
        position: 'absolute',
        bottom: 20,
        right: 30,
        zIndex: 10,
        width: 100,
        height: 50,
        backgroundColor: 'green',
        borderRadius: 50
    },
    reject: {
        position: 'absolute',
        bottom: 20,
        left: 30,
        zIndex: 10,
        width: 100,
        height: 50,
        backgroundColor: 'red',
        borderRadius: 50
    }
})