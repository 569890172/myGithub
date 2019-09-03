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
  Button,
} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action/index';


 class MyPage extends Component {
    render(){
        const {navigation} = this.props;
        return(
           <View style={styles.container} >
            <Text style={styles.welcome} >我的页面</Text>
            <Button 
                title="改变主题颜色"
                onPress={()=>{
                    // navigation.setParams({
                    //     theme:{
                    //         tintColor:'blue',
                    //         updateTime: new Date().getTime()
                    //     }
                    // })
                    this.props.onThemeChange('#096')
                }}
            ></Button>
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

const mapStateToProps = state =>({});
const mapDispatchToProps = dispatch => ({
    onThemeChange: (theme) => dispatch(actions.onThemeChange(theme))
});

export default connect(mapStateToProps,mapDispatchToProps)(MyPage)

