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
    AsyncStorage
} from 'react-native';

const KEY='save_key'


export default class FetchDemoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
    /**
     * 存储数据
     */
    async doSave(){
        // 方法1
        AsyncStorage.setItem(KEY,this.value,error =>{
            error && console.log(error.toString());
        })
        // // 方法2
        // AsyncStorage.setItem(KEY,this.value)
        // .catch(error =>{
        //     error && console.log(error.toString());
        // });
        // // 方法3
        // try{
        //     await AsyncStorage.setItem(KEY,this.value);
        // } catch(error){
        //     error && console.log(error.toString());
        // }
    }
    async getData(){
        // 方法1
        AsyncStorage.getItem(KEY,(error,value) =>{
            this.setState({
                showText:value
            })
            console.log(value);
            error && console.log(error.toString())
        });
        //  // 方法2
        //  AsyncStorage.getItem(KEY)
        //  .then(value => {
        //     this.setState({
        //         showText:value
        //     })
        //     console.log(value)
        //  })
        //  .catch(error=>{
        //      error && console.log(error.toString())
        //  });
        //  // 方法3
        //  try{
        //     const value= await AsyncStorage.getItem(KEY);
        //     this.setState({
        //         showText:value
        //     })
        //     console.log(value);
        //  }catch(error){
        //     error && console.log(error.toString())
        //  }
    }
    async doRemove(){
        // 用法1
        AsyncStorage.removeItem(KEY,error =>{
            error && console.log(error.toString())
        })
        // // 用法2
        // AsyncStorage.removeItem(KEY)
        // .catch(error=>{
        //     error && console.log(error.toString())
        // })
        // // 用法3
        // try {
        //     await AsyncStorage.removeItem(KEY)
        // } catch (error) {
        //     error && console.log(error.toString())
        // }
    }
    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.container} >
                <Text style={styles.welcome} >AsyncStorage 使用</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text =>{
                        this.value = text
                    }}
                ></TextInput>
                <View style={styles.input_container} >
                    <Text
                        onPress={()=>{
                            this.doSave();
                        }}
                    >存储</Text>
                     <Text
                        onPress={()=>{
                            this.doRemove();
                        }}
                    >删除</Text>
                     <Text
                        onPress={()=>{
                            this.getData();
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
        borderColor: 'black',
        borderWidth: 1,
        marginRight: 10,
    },
    input_container:{
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-around'
    },
});



