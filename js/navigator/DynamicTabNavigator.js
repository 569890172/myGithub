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
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {BottomTabBar} from 'react-navigation-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import {connect} from 'react-redux'

import PopularPage from '../page/PopularPage'
import TrendingPage from '../page/TrendingPage'
import FavoritePage from '../page/FavoritePage'
import MyPage from '../page/MyPage'
import NavigationUtil from '../navigator/NavigationUtil';


const TABS = { //配置页面路由
    PopularPage:{
        screen:PopularPage,
        navigationOptions:{
            tabBarLabel:'最热',
            tabBarIcon:({tintColor,focused})=>(
                <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{color:tintColor}}
                ></MaterialIcons>
            )
        }
    },
    TrendingPage:{
        screen:TrendingPage,
        navigationOptions:{
            tabBarLabel:'趋势',
            tabBarIcon:({tintColor,focused})=>(
                <Ionicons
                    name={'md-trending-up'}
                    size={26}
                    style={{color:tintColor}}
                ></Ionicons>
            )
        }
    },
    FavoritePage:{
        screen:FavoritePage,
        navigationOptions:{
            tabBarLabel:'收藏',
            tabBarIcon:({tintColor,focused})=>(
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{color:tintColor}}
                ></MaterialIcons>
            )
        }
    },
    MyPage:{
        screen:MyPage,
        navigationOptions:{
            tabBarLabel:'我的',
            tabBarIcon:({tintColor,focused})=>(
                <Entypo
                    name={'user'}
                    size={26}
                    style={{color:tintColor}}
                ></Entypo>
            )
        }
    }
};



 class DynamicTabNavigator extends Component {
    _tabNavigator(){
        if(this.tabs){
            return this.tabs;
        }
        const {PopularPage,TrendingPage,FavoritePage,MyPage} = TABS;
        const tabs={PopularPage,TrendingPage,FavoritePage,MyPage}; //根据需要定制显示内容
        PopularPage.navigationOptions.tabBarLabel='最新';
        return this.tabs=createAppContainer(createBottomTabNavigator(tabs,{
            // tabBarComponent:TabBarComponent
            tabBarComponent : props =>{
                return <TabBarComponent theme={this.props.theme} {...props} ></TabBarComponent>
            }
        }));
    }
    render(){
        NavigationUtil.navigation = this.props.navigation; // 里面导航器跳转到外部跳转导航器
       const Tab = this._tabNavigator();
       return <Tab></Tab>
    }
};

class TabBarComponent extends React.Component{
    constructor(props){
        super(props);
        console.disableYellowBox= true; //禁止黄色警告
        this.theme={
            tintColor:props.activeTintColor,
            updateTime: new Date().getTime(),
        }
    }
    render(){
        // const {routes,index} = this.props.navigation.state;
        // if(routes[index].params){
        //     const {theme}=routes[index].params;
        //     // 以最新主题为主，防止被覆盖。
        //     if(theme && theme.updateTime > this.theme.updateTime){
        //         this.theme=theme;
        //     }
        // }
        return <BottomTabBar 
            {...this.props}
            // activeTintColor={this.theme.tintColor || this.props.activeTintColor}
            activeTintColor={this.props.theme}
        ></BottomTabBar>
    }

}

const mapStateToProps = state => ({
    theme: state.theme.theme,
});

export default connect(mapStateToProps)(DynamicTabNavigator);