import AsyncStorage from '@react-native-community/async-storage'


export default class DataStore{

    /**获取数据，优先从本地获取，如果本地数据或者本地数据过期，则从服务器获取
     * 
     * @param {*} url 
     */
    fetchData(url){
        return new Promise((resolve,reject)=>{
            this.fetchLocalData(url).then((wrapData)=>{ //本地读取
                if(wrapData && DataStore.checkTimestampValid(wrapData.timestamp)){
                    resolve(wrapData);
                }else{
                    this.fetchNetData(url).then((data)=>{ //网路读取
                        resolve(this._warpData(data));
                    }).catch((error)=>{
                        reject(error);
                    })
                }
            }).catch((error)=>{
                this.fetchNetData(url).then((data)=>{ // 网络读取
                    resolve(this._warpData(data));
                }).catch((error)=>{
                    reject(error);
                })
            })
        })
    }


    
    /** 保存数据 */
    saveData(url,data,callback){
        if(!data || !url ){
            return;
        }
        AsyncStorage.setItem(url,JSON.stringify(this._warpData(data)),callback);

    }
    _warpData(data){
        return {data:data,timestamp: new Date().getTime()};
    }

    /** 获取数据
     * 
     * @param {*} url 
     */
    fetchLocalData(url){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(url,(error,result)=>{
                if(!error){
                    try{
                        resolve(JSON.parse(result));
                    }catch(e){
                        reject(e);
                        console.log(e);
                    }
                }else{
                    reject(error);
                    console.error(error);
                }
            })
        })
    }
    /**网络获取数据
     * 
     * @param {*} url 
     */
    fetchNetData(url){
        return new Promise((resolve,reject)=>{
            fetch(url)
            .then((response) => {
                if(response.ok){
                    return response.json();
                }
                throw new Error('Net response was not ok')
            })
            .then((responseData)=>{
                this.saveData(url,responseData)
                resolve(responseData);
            })
            .catch((error)=>{
                reject(error)
            })
        });
    }

    /**
     * 检查数据有效期
     * @param {*} timestamp 
     */
    static checkTimestampValid(timestamp){
        const currentData= new Date();
        const targetDate= new Date();
        targetDate.setTime(timestamp);
        if(currentData.getMonth() !== targetDate.getMonth()) return false;
        if(currentData.getDate() !== targetDate.getDate()) return false;
        if(currentData.getHours() - targetDate.getHours() > 4) return false;

        return true;
    }



}