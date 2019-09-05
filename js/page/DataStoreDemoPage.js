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
    TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import DataStore from '../expand/dao/DataStore';

export default class DataStoreDemoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: ''
        }
        this.dataStore = new DataStore();
    }
    loadData() {
        let url = `https://api.github.com/search/repositories?q=${this.value}`;
        this.dataStore.fetchData(url)
            .then(data=>{
                let showData = `初次数据加载时间:${new Date(data.timestamp)}\n ${JSON.stringify(data.data)} `
                this.setState({
                    showText:showData
                })
            })
            .catch(error => {
                error && console.log(error.toString())
            })

    }
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container} >
                <Text style={styles.welcome} >离线缓存框架设计</Text>
                <View style={styles.input_container} >
                    <TextInput style={styles.input}
                        onChangeText={text => {
                            this.value = text;
                        }}
                    ></TextInput>
                   <Text
                    onPress={()=>{
                        this.loadData();
                    }}
                   >获取</Text>
                </View>
                <Text>{this.state.showText}</Text>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        height: 30,
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        marginRight: 10,
    },
    input_container:{
        flexDirection:'row',
        alignContent:'center'
    },
});



