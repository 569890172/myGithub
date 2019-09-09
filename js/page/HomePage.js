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
import {BackHandler} from 'react-native';
import {NavigationActions} from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'

import PopularPage from './PopularPage'
import TrendingPage from './TrendingPage'
import FavoritePage from './FavoritePage'
import MyPage from './MyPage'
import NavigationUtil from '../navigator/NavigationUtil';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import {connect} from 'react-redux';
import BackPressComponent from '../common/BackPressComponent'


class HomePage extends Component {
    constructor(props){
        super(props);
        this.backPress= new BackPressComponent({backPress:this.onBackPress()});
    }


    componentDidMount(){//在第一次渲染后调用，只在客户端
        this.backPress.componentDidMount();
    }
    componentWillUnmount(){//组件从DOM中移除之前立刻被调用
        this.backPress.componentWillUnmount();
    }
    // 处理安卓物理返回键
    onBackPress=()=>{
        const { dispatch,nav } =this.props;
        if(nav.routes[1].index === 0){//如果RootNavigator的MainNavigator的index为0，则处理返回事件
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    }



    // _tabNavigator(){
    //     return createAppContainer(createBottomTabNavigator({
    //         PopularPage:{
    //             screen:PopularPage,
    //             navigationOptions:{
    //                 tabBarLabel:'最热',
    //                 tabBarIcon:({tintColor,focused})=>(
    //                     <MaterialIcons
    //                         name={'whatshot'}
    //                         size={26}
    //                         style={{color:tintColor}}
    //                     ></MaterialIcons>
    //                 )
    //             }
    //         },
    //         TrendingPage:{
    //             screen:TrendingPage,
    //             navigationOptions:{
    //                 tabBarLabel:'趋势',
    //                 tabBarIcon:({tintColor,focused})=>(
    //                     <Ionicons
    //                         name={'md-trending-up'}
    //                         size={26}
    //                         style={{color:tintColor}}
    //                     ></Ionicons>
    //                 )
    //             }
    //         },
    //         FavoritePage:{
    //             screen:FavoritePage,
    //             navigationOptions:{
    //                 tabBarLabel:'收藏',
    //                 tabBarIcon:({tintColor,focused})=>(
    //                     <MaterialIcons
    //                         name={'favorite'}
    //                         size={26}
    //                         style={{color:tintColor}}
    //                     ></MaterialIcons>
    //                 )
    //             }
    //         },
    //         MyPage:{
    //             screen:MyPage,
    //             navigationOptions:{
    //                 tabBarLabel:'我的',
    //                 tabBarIcon:({tintColor,focused})=>(
    //                     <Entypo
    //                         name={'user'}
    //                         size={26}
    //                         style={{color:tintColor}}
    //                     ></Entypo>
    //                 )
    //             }
    //         },
    //     }))
    // }
    render(){
        NavigationUtil.navigation = this.props.navigation; // 里面导航器跳转到外部跳转导航器
    //    const Tab = this._tabNavigator();
    
       return <DynamicTabNavigator></DynamicTabNavigator>
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


const mapStateToProps = state =>({
    nav:state.nav
});

export default connect(mapStateToProps)(HomePage)