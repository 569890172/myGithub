/**
 * 详情页面
 */
import React, { Component } from 'react';
import { DeviceInfo } from 'react-native'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { WebView } from 'react-native-webview';
import NavigationBar from '../common/NavigationBar'
import ViewUtil from '../util/ViewUtil'
import { TouchableOpacity } from 'react-native-gesture-handler';
import NavigationUtil from '../navigator/NavigationUtil'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BackPressComponent from '../common/BackPressComponent'


const THEME_COLOR = '#678'
const TRENDING_URL = 'https://github.com/'

export default class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        const { projectModes } = this.params;
        this.url = projectModes.html_url || TRENDING_URL + projectModes.fullName;
        const title = projectModes.full_name || projectModes.fullName;
        this.state = {
            title: title,
            url: this.url,
            canGoBack: false, //是否可以返回上一级
        }
        this.backPress= new BackPressComponent({backPress:()=>this.onBackPress()});
    }
    componentDidMount(){
        this.backPress.componentDidMount();
    }
    componentWillUnmount(){
        this.backPress.componentWillUnmount();
    }
    onBackPress(){
        this.onBack();
        return true;
    }
    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            NavigationUtil.goBack(this.props.navigation);
        }
    }
    renderRightButton() {
        return (<View style={{ flexDirection: 'row'}} >
            <TouchableOpacity
                onPress={() => {

                }}
            >
                <FontAwesome
                    name={'star-o'}
                    size={20}
                    style={{ color: 'white', marginRight: 0, marginTop:10 }}
                ></FontAwesome>
            </TouchableOpacity>
            {ViewUtil.getShareButton(() => {

            })}
        </View>

        )
    }
    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url
        })
    }
    render() {

        const titleLayoutStyle = this.state.title.length > 20 ? {paddingRight: 30} : null;
        let navigationBar = <NavigationBar
            leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
            title={this.state.title}
            style={{ backgroundColor: THEME_COLOR }}
            titleLayoutStyle={titleLayoutStyle}
            rightButton={this.renderRightButton()}
        ></NavigationBar>
        return (
            <View style={styles.container} >
                {navigationBar}
                <WebView
                    ref={webView => this.webView = webView}
                    startInLoadingState={true} // 显示loading
                    onNavigationStateChange={e => this.onNavigationStateChange(e)}
                    source={{ uri: this.state.url }}
                ></WebView>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0,

    },

});

