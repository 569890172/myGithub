/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';


export default class WelcomePage extends Component {
    componentDidMount(){
        this.timer = setTimeout(() => {
            // const {navigation} =this.props;
            // navigation.navigate("HomePage");
            NavigationUtil.resetToHomePage({
                navigation:this.props.navigation
            })
        }, 2000);
    }
    UNSAFE_componentWillMount(){
        this.timer && clearTimeout(this.timer);
    }
    render(){
        return(
           <View style={styles.container} >
            <Text style={styles.welcome} >欢迎</Text>
           </View>
        )
    }
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    welcome:{
        fontSize:20,
        textAlign:'center',
        margin:10,
    },
});

