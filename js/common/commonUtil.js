import React,{Component} from 'react';

export default class commonUtil extends Component{

/**
 * 是否为空
 * @param {*} obj 
 */
 static isEmpty(obj){
    if(typeof (obj) != 'number' && (!obj || obj == null || obj == ' ' || obj == undefined || typeof (obj) == 'undefined')){
        return true;
    }
    return false;
}




}






