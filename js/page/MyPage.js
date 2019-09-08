/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import actions from '../action/index';
import NavigationBar from '../common/NavigationBar'


const THEME_COLOR = '#678';
import Feater from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

class MyPage extends Component {

    getRightButton() {
        return <View style={{ flexDirection: 'row' }} >
            <TouchableOpacity
                onPress={() => {

                }}
            >
                <View style={{ padding: 5, marginRight: 8, }}>
                    <Feater
                        name={'search'}
                        size={24}
                        style={{ color: 'white' }}
                    ></Feater>
                </View>
            </TouchableOpacity>
        </View>
    }
    getLeftButton(callBack) {
        return <TouchableOpacity style={{ padding: 8, paddingLeft: 12 }}
            onPress={callBack}
        >
            <Ionicons
                name={'ios-arrow-back'}
                size={26}
                style={{ color: 'white' }}
            ></Ionicons>
        </TouchableOpacity>
    }


    render() {
        const { navigation } = this.props;
        let statusBar={
            backgroundColor: THEME_COLOR,
            barsStyle:'light-content'
        }
        let navigationBar=<NavigationBar
            title={'我的'}
            statusBar={statusBar}
            rightButton={this.getRightButton()}
            leftButton={this.getLeftButton()}
        ></NavigationBar>
        return (
            <View style={styles.container} >
                {navigationBar}
                <Text style={styles.welcome} >我的页面</Text>
                <Button
                    title="改变主题颜色"
                    onPress={() => {
                        // navigation.setParams({
                        //     theme:{
                        //         tintColor:'blue',
                        //         updateTime: new Date().getTime()
                        //     }
                        // })
                        this.props.onThemeChange('#096')
                    }}
                ></Button>
                <Text onPress={() => {
                    NavigationUtil.goPage({
                        navigation: this.props.navigation
                    }, "DetailPage")
                }}>跳转到详情页面</Text>
                <Button
                    title={'Fetch获取数据'}
                    onPress={() => {
                        NavigationUtil.goPage({
                            navigation: this.props.navigation
                        }, "FetchDemoPage")
                    }}
                ></Button>
                <Button
                    title={'AsynStorege  的使用'}
                    onPress={() => {
                        NavigationUtil.goPage({
                            navigation: this.props.navigation
                        }, "AsyncStoregeDemoPage")
                    }}
                ></Button>
                <Button
                    title={'离线缓存框架  的使用'}
                    onPress={() => {
                        NavigationUtil.goPage({
                            navigation: this.props.navigation
                        }, "DataStoreDemoPage")
                    }}
                ></Button>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:30,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    onThemeChange: (theme) => dispatch(actions.onThemeChange(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPage)

