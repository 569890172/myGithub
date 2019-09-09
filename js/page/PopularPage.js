/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import {DeviceInfo} from 'react-native'
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux'
import actions from '../action/index';
import PopularItem from '../common/PopularItem'
import Toast from 'react-native-easy-toast';
import NavigationBar from '../common/NavigationBar';

import NavigationUtil from '../navigator/NavigationUtil';

const URL= 'https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars'
const THEME_COLOR='#678'



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
                screen : props => <PopularTabPage {...props} tabLabel={item} ></PopularTabPage> ,  //传递参数写法
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
            title={'最热'}
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
                        height:30,
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
class PopularTab extends Component{ //自定义组件
    constructor(props){
        super(props);
        const {tabLabel} =this.props;
        this.storeName = tabLabel;
    }
    componentDidMount(){
        this.loadData(false);
    }
    loadData(loadMore){
        const {onLoadPopularData,onLoadMorePopular} = this.props;
        const store=this._store();
        const url = this.getFetchUrl(this.storeName);
        if(loadMore){
            onLoadMorePopular(this.storeName, ++store.pageIndex,pageSize,store.items,callBack=>{
              this.refs.toast.show('没有更多了');
            })
        }else{
            onLoadPopularData(this.storeName,url,pageSize)
        }
    }
    /**
     * 获取当前页面相关数据
     */
    _store(){
        const {popular} = this.props;
        let store = popular[this.storeName]; //动态获取state
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
        return URL+ key + QUERY_STR;
    }
    renderItem(data){
        const item = data.item;
        return <PopularItem
            item={item}
            projectModes={item}
            onSelect={()=>{
                NavigationUtil.goPage({
                    projectModes:item
                },'DetailPage')
            }}
        ></PopularItem>
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
        const {popular} = this.props;
        let store = this._store();
        return(
            <View style={styles.container}>
                <FlatList
                    data={store.projectModes}
                    renderItem ={data=>this.renderItem(data)}
                    keyExtractor={item => ""+item.id}
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
    popular: state.popular
})
const mapDispatchToProps = dispatch =>({
    onLoadPopularData:(storeName,url,pageSize) => dispatch(actions.onLoadPopularData(storeName,url,pageSize)),
    onLoadMorePopular:(storeName,pageIndex,pageSize,items,callBack) => dispatch(actions.onLoadMorePopular(storeName,pageIndex,pageSize,items,callBack))
})
const PopularTabPage = connect(mapStateToProps,mapDispatchToProps)(PopularTab)

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

