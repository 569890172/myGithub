import React from 'react';
import {TouchableOpacity} from 'react-native';
import  Ionicons from 'react-native-vector-icons/Ionicons'
export default class ViewUtil{

    /**
     * 左侧返回按钮
     * @param {回调函数} callBack 
     */
    static getLeftBackButton(callBack){
        return <TouchableOpacity
            style={{padding:8, paddingLeft:12}}
            onPress={callBack}
        >
            <Ionicons
                name={'ios-arrow-back'}
                size={26}
                style={{color:'white'}}
            ></Ionicons>
        </TouchableOpacity>

    }
    /**
     * 分享
     * @param {回调函数} callBack 
     */
    static getShareButton(callBack){
        return <TouchableOpacity
            underlayColor={'transparent'}

            style={{padding:8, paddingLeft:12}}
            onPress={callBack}
        >
            <Ionicons
                name={'md-share'}
                size={20}
                style={{color:'white',opacity:0.9,marginRight:10}}
            ></Ionicons>
        </TouchableOpacity>
    }
}