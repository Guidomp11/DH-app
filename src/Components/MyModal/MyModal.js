import React from 'react';
import { Modal, View } from 'react-native';
import { styles } from '../MyCamera/styles';

export default function MyModal({children, visible}){
    return(
        <Modal
            animationType="slide"
            trasparent={true}
            visible={visible}
            avoidKeyboard={false}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        {children}
                    </View>
                </View>
            </View>
        </Modal>
    )
}