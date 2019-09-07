import Types from '../types'
import DataStore from '../../expand/dao/DataStore';

/**
 * 获取最热数据的异步Action
 * @param {查询分类类型名称} storeName 
 * @param {请求地址} url 
 * @param {页面大小} pageSize
 */
export function onLoadPopularData(storeName,url,pageSize){ //action创建函数
    return dispatch=>{ //异步Action
        dispatch({type:Types.POPULAR_REFRESH,storeName:storeName}); //刷新数据 准备工作，例如下拉刷新，显示加载动作。
        let dataStore= new DataStore();
        dataStore.fetchData(url)  //异步action与数据流 
            .then(data=>{
                handleData(dispatch,storeName,data,pageSize);//成功，
            })
            .catch(error=>{ //异常
                console.log(error);
                dispatch({type:Types.LOAD_POPULAR_FAIL,storeName:storeName,error:error}); //失败
                
            })
    }
}

function handleData(dispatch,storeName,data,pageSize){ //处理数据
    let fixItems =[];
    if(data && data.data && data.data.items){
        fixItems= data.data.items;
    }
    dispatch({
        type:Types.POPULAR_REFRESH_SUCCESS,
        items:fixItems,
        projectModes: pageSize > fixItems.length? fixItems : fixItems.slice(0,pageSize), //第一次要加载的数据
        storeName,
        pageIndex: 1,
    })
}

/**
 * 加载更多
 * @param {名称} storeName 
 * @param {第几页} pageIndex 
 * @param {每页大小} pageSize 
 * @param {原始数据} dataArray 
 * @param {回调函数，返回例如：异常信息，没有更多} callBack 
 */
export function onLoadMorePopular(storeName,pageIndex,pageSize,dataArray=[],callBack){//加载更多数据
    return dispatch =>{
        setTimeout(() => { //模拟数据请求
            if((pageIndex-1) * pageSize >= dataArray.length){ //已加载完全部数据
                if(typeof callBack ==='function'){
                    callBack('no more')
                }
                dispatch({
                    type:Types.POPULAR_LOAD_MORE_FAIL,  //上拉加载更多失败
                    error:'no more',
                    storeName:storeName,
                    pageIndex: -- pageIndex,
                })
            }else{ //翻页数据
                // 本次和载入的最大数据量
                let max= pageSize * pageIndex > dataArray.length ? dataArray.length :pageSize * pageIndex;
                dispatch({
                    type:Types.POPULAR_REFRESH_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModes:dataArray.slice(0,max),
                })
            }
        }, 500);
    }
}
