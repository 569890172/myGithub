/**
 * desc：
 * author：
 * date：
 */
 
import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

export default class SecondPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <View>
        <Text style={styles.text}>SecondPage</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  text: {
    margin: 15,
    color: '#31a6ff',
    fontSize: 20
  }
})
