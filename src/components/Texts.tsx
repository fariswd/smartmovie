import React from 'react'
import {
  Text,
  StyleSheet,
} from 'react-native'

export function XBig (props:any){
  return (
    <Text style={[styles.XBig, props.style]}>
      {props.children}
    </Text>
  )
}

export function Big (props:any){
  return (
    <Text style={[styles.Big, props.style]}>
      {props.children}
    </Text>
  )
}

export function Medium (props:any){
  return (
    <Text style={[styles.Medium, props.style]}>
      {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
  XBig: {
    fontSize: 24,
    flexWrap: 'wrap'
  },
  Big: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  MediumBold: {
    fontSize: 14,
  },
  Medium: {
    fontSize: 14,
  },
  Small: {
    fontSize: 10,
  },
  SSmall: {
    fontSize: 8,
  }
})