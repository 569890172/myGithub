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
import actions from '../action/index';

export default class FetchDemoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: ''
        }
    }
    loadData() {
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
        fetch(url)
            // .then(response => response.text())
            .then(response =>{
                if(response.ok){
                    return response.text();
                }
                throw new Error('网络错误');
            })
            .then(responseText => {
                this.setState({
                    showText: responseText
                })
            })
            .catch( e => {
                this.setState({
                    showText: e.toString()
                })
            })

    }
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container} >
                <Text style={styles.welcome} >我的页面</Text>
                <View style={styles.input_container} >
                    <TextInput style={styles.input}
                        onChangeText={text => {
                            this.searchKey = text;
                        }}
                    ></TextInput>
                    <Button
                        title="获取数据"
                        onPress={() => {
                            this.loadData();
                        }}
                    ></Button>
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



