import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modalContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '90%',
        minHeight: Dimensions.get('window').height - 150,
        backgroundColor: '#2F2F2F',
        alignSelf: 'center',
        borderRadius: 5,
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})