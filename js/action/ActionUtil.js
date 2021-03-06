

export  function handleData(actionType,dispatch,storeName,data,pageSize){ //处理数据
    let fixItems =[];
    if(data && data.data){
        if(Array.isArray(data.data)){
            fixItems=data.data;
        }else if(Array.isArray(data.data.items)){
            fixItems= data.data.items;
        }
        
    }
    dispatch({
        type:actionType,
        items:fixItems,
        projectModes: pageSize > fixItems.length? fixItems : fixItems.slice(0,pageSize), //第一次要加载的数据
        storeName,
        pageIndex: 1,
    })
}
