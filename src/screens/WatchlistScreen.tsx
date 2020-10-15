import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import config from '../constants/config'
import colors from '../constants/colors'

import * as Texts from '../components/Texts'

interface item {
  id?: Number,
  poster_path?: String,
  name?: String,
  title?: String,
  vote_average?: Number,
  release_date?: String,
  first_air_date?: String,
  overview?: String,
  backdrop_path?: String,
  popularity?: Number,
  genre_ids?: any,
  show?: String,
}

import { WatchlistContext } from  '../contexts/watchlist'
import { TextInput } from 'react-native-gesture-handler';
const useWatchlist = () => useContext(WatchlistContext)

function renderItem(props: {item:item}, navigation){
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', {id: props.item.id, title: props.item.title, show:props.item.show })}
      style={{
        flex: 1,
        height: 150,
        marginHorizontal: 8,
        marginVertical: 4,
        flexDirection: 'row',
        backgroundColor: colors.smoke,
        borderRadius: 5,
        overflow: 'hidden'
      }}
    >
      <View style={{width: 110, height: 150, borderRadius: 5, overflow: 'hidden'}}>
        <Image
          source={{uri: `${config.IMGBASE}${props.item.poster_path}`}}
          style={{width: 110, height: 150}}
        />
      </View>
      <View style={{flex: 1, paddingHorizontal: 8, paddingVertical: 4}}>
        <Texts.Big style={{paddingBottom: 4}}>
          {props.item.show=='movie' ? props.item.title : props.item.name}
          ({(props.item.show=='movie' ? props.item.release_date : props.item.first_air_date)?.substr(0,4)})
        </Texts.Big>
        
        <Texts.Medium>Release Date: {props.item.show=='movie' ? props.item.release_date : props.item.first_air_date}</Texts.Medium>
        <Texts.Medium>Popularity: {props.item.popularity}</Texts.Medium>
        <Texts.Medium>Vote Average: {props.item.vote_average}</Texts.Medium>
      </View>
    </TouchableOpacity>
  )
}

export default function WatchlistScreen(props) {
  const [find, setFind] = useState("")
  const [refreshing, setRefreshing] = useState(false)
  const [myWatch, setMyWatch] = useState([])
  const {watchlist} = useWatchlist()

  useEffect(() => {
    setMyWatch(watchlist)
  }, [])

  const findWatchlist = (text) => {
    if(text){
      setFind(text)
      const rex = RegExp(text, 'gi');
      const newWatchlist = myWatch.filter((w:{title:string, name:string, show:string}) => {
        if(w.show=='movie'){
          return rex.test(w.title)
        } else {
          return rex.test(w.name)
        }
      })
      setMyWatch(newWatchlist)
    } else {
      setFind("")
      setMyWatch(watchlist)
    }
  }

  // useEffect(() => {

  // }, [find])

  if(watchlist.length == 0){
    return (
      <View style={{flex: 1, paddingTop: 20, alignItems: 'center'}}>
        <Ionicons name="sad-outline" size={90} color={colors.lightgray} />
        <Texts.Medium style={{color: colors.lightgray, textAlign: 'center'}}>
          No Watchlist so far...
        </Texts.Medium>
      </View>
    )
  }
  return (
    <View>
      <View style={{
        margin: 8,
        borderColor: colors.lightgray,
        borderRadius: 8,
        backgroundColor: colors.smoke,
        flexDirection: 'row',
        paddingHorizontal: 8
        }}
      >
        <View style={{justifyContent: 'center', paddingRight: 4}}>
          <Ionicons name="search-outline" size={18} color={colors.lightgray} />
        </View>
        <View style={{flex: 1}}>
          <TextInput
            value={find}
            onChangeText={(text) => findWatchlist(text)}
            style={{paddingVertical: 6}}
            placeholder="Find watchlist"
          />
        </View>
      </View>
      <FlatList
        data={myWatch}
        refreshing={refreshing}
        onRefresh={() => findWatchlist("")}
        renderItem={(item) => renderItem(item, props.navigation)}
        keyExtractor={(item: {id:number}) => `${item.id}`}
      />
    </View>
  )
}