/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';


export default class PopularPage extends Component {
    constructor(props){
        super(props);
        this.tabNames=['Java','Android','ios','React','React-Native','php']
    }
    _getTabs(){ //循环取出 item
        const tabs={};
        this.tabNames.forEach((item,index)=>{
            tabs[`tab${index}`]={
                // screen:PopularTab,  // 常规写法
                screen : props => <PopularTab {...props} tabLabel={item} ></PopularTab> ,  //传递参数写法
                navigationOptions:{
                    title : item  
                }
            }
        });
        return tabs;
    }

    render(){
        // const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
        //     this._getTabs(),
        //     {
        //     PopularTab1:{
        //         screen:PopularTab,
        //         navigationOptions:{
        //             title:'Tab1'
        //         }
        //     },
        //     PopularTab2:{
        //         screen:PopularTab,
        //         navigationOptions:{
        //             title:'Tab2'
        //         }
        //     },
        //  }
        //  ));
         const TabNavigator =createAppContainer( createMaterialTopTabNavigator(
            this._getTabs(),{
                tabBarOptions:{
                    tabStyle:styles.tabStyle,
                    upperCaseLabel:false, //标签是否大写
                    scrollEnabled:true, // 是否支持选项卡 滚动,默认 false
                    style:{
                        backgroundColor:'#678', // TabBar 背景颜色
                    },
                    indicatorStyle:styles.indicatorStyle, //标签指示器样式
                    labelStyle:styles.lableStyle, //文字样式
                }
            }
        ));
        return(
            <View style={{flex:1,marginTop:44}} >
                <TabNavigator></TabNavigator>
            </View>
        )
    }
};

class PopularTab extends Component{ //自定义组件
    render(){
        const {tabLabel} =this.props;
        return(
            <View >
                <Text>{tabLabel}</Text>
                <Text onPress={()=>{
                  NavigationUtil.goPage({
                      navigation:this.props.navigation
                  },"DetailPage")  
                }}>跳转到详情页面</Text>
            </View>
        );
    }
}


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
    tabStyle:{
        minWidth:30
    },
    indicatorStyle:{
        height:2,
        backgroundColor:'white'
    },
    lableStyle:{
        fontSize:13,
        marginTop:6,
        marginBottom:6,
    },
});

