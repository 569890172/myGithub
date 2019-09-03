/**
 * desc：
 * author：
 * date：
 */

import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import {goNext} from './store'
import { connect } from 'react-redux'
import { bindActionCreators, createStore } from 'redux'
class FirstPage extends Component {
  next () {
    console.log(this.props.navigation)
    // this.props.goNext()
    this.props.navigation.push('screen2') // store2
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Redux Navigation!</Text>
        <TouchableOpacity onPress={() => { this.next() }}><Text style={styles.button}>Next</Text></TouchableOpacity>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10
  },
  button: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: '#448bff'
  }
})

const mapDispatchToProps = dispatch => (bindActionCreators({goNext}, dispatch))

export default connect(null, mapDispatchToProps)(FirstPage)
