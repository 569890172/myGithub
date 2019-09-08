import {onThemeChange} from './theme'
import {onLoadPopularData,onLoadMorePopular} from './popular'
import {onRefreshTrending,onLoadMoreTrending} from './trending';

export default{
    onThemeChange,
    onLoadPopularData, //热门模块 下拉刷新
    onLoadMorePopular, //热门模块 上拉加载更多
    onRefreshTrending, //趋势模块 下拉刷新
    onLoadMoreTrending, // 趋势模块 上拉加载更多
}