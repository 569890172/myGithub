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
  Button,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {DeviceInfo} from 'react-native'
import {connect} from 'react-redux'
import actions from '../action/index';
import TrendingItem from '../common/TrendingItem'
import Toast from 'react-native-easy-toast';
import NavigationBar from '../common/NavigationBar';


const URL= 'https://github.com/trending/';
const QUERY_STR='?since=daily'
const THEME_COLOR='#678'



export default class TrendingPage extends Component {
    constructor(props){
        super(props);
        this.tabNames=['All','C','C#','PHP','JavaScript']
    }
    _getTabs(){ //循环取出 item
        const tabs={};
        this.tabNames.forEach((item,index)=>{
            tabs[`tab${index}`]={
                screen : props => <TrendingTabPage {...props} tabLabel={item} ></TrendingTabPage> ,  //传递参数写法
                navigationOptions:{
                    title : item  
                }
            }
        });
        return tabs;
    }

    render(){
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'default',
        };
        let navigationBar = <NavigationBar
            title={'趋势'}
            statusBar={statusBar}
           style={{backgroundColor:THEME_COLOR}}
        />;

         const TabNavigator =createAppContainer( createMaterialTopTabNavigator(
            this._getTabs(),{
                tabBarOptions:{
                    tabStyle:styles.tabStyle,
                    upperCaseLabel:false, //标签是否大写
                    scrollEnabled:true, // 是否支持选项卡 滚动,默认 false
                    style:{
                        backgroundColor:'#678', // TabBar 背景颜色
                        height:30, //开启scrollEnabled 安卓初次加载会闪烁。
                    },
                    indicatorStyle:styles.indicatorStyle, //标签指示器样式
                    labelStyle:styles.lableStyle, //文字样式
                }
            }
        ));
        return(
            <View style={{flex:1,marginTop:DeviceInfo.isIPhoneX_deprecated?30:0}} >
                {navigationBar}
                <TabNavigator></TabNavigator>
            </View>
        )
    }
};

const pageSize = 10; //设置为常量，防止被修改。
class TrendingTab extends Component{ //自定义组件
    constructor(props){
        super(props);
        const {tabLabel} =this.props;
        this.storeName = tabLabel;
    }
    componentDidMount(){
        this.loadData(false);
    }
    loadData(loadMore){
        const {onRefreshTrending,onLoadMoreTrending} = this.props;
        const store=this._store();
        const url = this.getFetchUrl(this.storeName);
        if(loadMore){
            onLoadMoreTrending(this.storeName, ++store.pageIndex,pageSize,store.items,callBack=>{
              this.refs.toast.show('没有更多了');
            })
        }else{
            onRefreshTrending(this.storeName,url,pageSize)
        }
    }
    /**
     * 获取当前页面相关数据
     */
    _store(){
        const {trending} = this.props;
        let store = trending[this.storeName]; //动态获取state
        if(!store){
            store ={
                item:[],
                isLoading: false,
                projectModes:[],//要显示的数据
                hideLoadingMore:true, //默认隐藏加载更多
            }
        }
        return store;
    }
    getFetchUrl(key){
        if(key ==='All'){
            return URL + QUERY_STR;
        }
        return URL+ key + QUERY_STR;
    }
    renderItem(data){
        const item =data.item;
        return <TrendingItem
            item={item}
            onSelect={()=>{

            }}
        ></TrendingItem>
    }
    getIndicator(){
        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer} >
                <ActivityIndicator 
                    style={styles.indicator}
                ></ActivityIndicator>
                <Text>加载更多</Text>
            </View>
    }
    render(){
        const {trending} = this.props;
        let store = this._store();
        return(
            <View style={styles.container}>
                <FlatList
                    data={store.projectModes}
                    renderItem ={data=>this.renderItem(data)}
                    keyExtractor={item => ""+item.fullName}
                    refreshControl={ //刷新加载数据
                        <RefreshControl
                            title={'玩命加载中...'}
                            titleColor={'red'}
                            colors={['red']}
                            refreshing={store.isLoading}
                            onRefresh={()=>this.loadData(false)}
                            tintColor={'red'}
                        ></RefreshControl>
                    }
                    ListFooterComponent={()=> this.getIndicator()}
                    onEndReached={()=>{ //滑动到底部
                        console.log('------onEndReached--------')
                        setTimeout(() => { // 确保onMomentumScrollBegin 先执行
                            if(this.canLoadMore){
                                this.loadData(true); //加载更多
                                this.canLoadMore=false;
                            }
                        }, 100);
                        
                    }}
                    onEndReachedThreshold={0.5} //距离底部距离
                    onMomentumScrollBegin={()=>{
                        this.canLoadMore= true;
                        console.log('------onMomentumScrollBegin--------');
                    }}
                ></FlatList>
                <Toast ref={'toast'} 
                    position={'center'}
                ></Toast>
            </View>
        );
    }
}

const mapStateToProps = state =>({
    trending: state.trending
})
const mapDispatchToProps = dispatch =>({
    onRefreshTrending:(storeName,url,pageSize) => dispatch(actions.onRefreshTrending(storeName,url,pageSize)),
    onLoadMoreTrending:(storeName,pageIndex,pageSize,items,callBack) => dispatch(actions.onLoadMoreTrending(storeName,pageIndex,pageSize,items,callBack))
})
const TrendingTabPage = connect(mapStateToProps,mapDispatchToProps)(TrendingTab)

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
        // minWidth:30
        padding:0,
    },
    indicatorStyle:{
        height:2,
        backgroundColor:'white'
    },
    lableStyle:{
        fontSize:13,
        margin:0,
    },
    indicatorContainer:{
        alignItems:'center',
    },
    indicator:{
        color:'red',
        margin:10,
    },
});

