/**
 * 全局导航跳转类 
 * 
 */
export default class NavigationUtil{
    /**
     *跳转到指定页面
     *
     * @static
     * @param {*} params 要传递参数
     * @param {*} page 要跳转页面
     * @memberof NavigationUtil
     */
    static goPage(params,page){
        const navigation= NavigationUtil.navigation;
        if(!navigation){
            console.log('NavigationUtil navigation can not be null');
            return;
        }
        navigation.navigate(
            page,
            {
                ...params
            }
        )
    }
    /**
     *返回上一页
     *
     * @static
     * @param {*} navigation
     * @memberof NavigationUtil
     */
    static goBack(navigation){
        navigation.goBack();
    }
    /**
     *重置到首页
     *
     * @static
     * @param {*} params
     * @memberof NavigationUtil
     */
    static resetToHomePage(params){
        const {navigation} = params;
        navigation.navigate("HomePage");
    }
}