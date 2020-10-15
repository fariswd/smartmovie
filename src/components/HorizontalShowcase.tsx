import React from 'react'
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as Texts from '../components/Texts'

import config from '../constants/config'
import colors from '../constants/colors'

interface Item {
  id?: Number,
  poster_path?: String,
  title?: String,
  vote_average?: Number,
  release_date?: String
}

function renderItem (props: {item:Item}, navigation, show) {
  return (
    <TouchableOpacity
      testID="HorizontalTouchToDetail"
      onPress={() => navigation.navigate('Detail', {id: props.item.id, title: props.item.title, show })}
      >
      <Image
        source={{uri: `${config.IMGBASE}${props.item.poster_path}`}}
        style={{width: 160, height: 240}}
      />
    </TouchableOpacity>
  )
}

function renderLoad () {
  return (
    <View style={{height: 240, width: 160, justifyContent: 'center'}}>
      <ActivityIndicator size="large" color={colors.blood} />
    </View>
  )
}

function FooterShowAll (props) {
  return(
    <TouchableOpacity
      testID="ShowAllFooter"
      style={{
        height: 240,
        width: 160,
        borderWidth: 0.5,
        borderColor: colors.lightgray,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8
      }}
      onPress={() => props.footerOnPress()}
    >
      <Texts.XBig>
        Show
      </Texts.XBig>
      <Texts.XBig>
        All
      </Texts.XBig>
      <Ionicons name="arrow-forward-circle" size={34} color={colors.blood} />
    </TouchableOpacity>
  )
}

function HorizontalShowcase(props:any){
  if(props.showcaseData.loading){
    return (
      <FlatList
        data={new Array(3)}
        renderItem={renderLoad}
        keyExtractor={(item, i) => `${i}`}
        horizontal
      />
    )
  }
  return (
    <FlatList
        data={props.showcaseData.results}
        renderItem={(item) => renderItem(item, props.navigation, props.show)}
        keyExtractor={item => `${item.id}`}
        horizontal
        ItemSeparatorComponent={() => <View style={{paddingRight: 8}}/>}
        ListFooterComponent={() => <FooterShowAll footerOnPress={props.footerOnPress} />}
      />
  )
}

export default HorizontalShowcase