import React, { Children } from 'react';
import { Button, Text } from 'react-native';
import { View } from 'react-native';

function CustomButton(props) {
    return (
        <View style={{padding:10,backgroundColor:'#3788E5',width:100,alignItems:'center',borderRadius:15}}>
            <Text style={{color:'white'}}>{props.children}</Text>
        </View>
    );
}

export default CustomButton;