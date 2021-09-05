import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../../screens/HomeScreen';
import CameraScreen from '../../screens/CameraScreen';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Camera" component={CameraScreen} />
    </Drawer.Navigator>
  );
}