import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import { useApolloClient } from '@apollo/client'

import convertQuery from '../helpers/convertQuery'
import moviegenre from '../helpers/moviegenre'
import tvgenre from '../helpers/tvgenre'
import * as Texts from '../components/Texts'

import config from '../constants/config'
import colors from '../constants/colors'

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
}

function renderItem(props: {item:item}, navigation, show:string){
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', {id: props.item.id, title: props.item.title, show })}
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
          {show=='movie' ? props.item.title : props.item.name}
          ({(show=='movie' ? props.item.release_date : props.item.first_air_date)?.substr(0,4)})
        </Texts.Big>
        
        <Texts.Medium>Release Date: {show=='movie' ? props.item.release_date : props.item.first_air_date}</Texts.Medium>
        <Texts.Medium>Popularity: {props.item.popularity}</Texts.Medium>
        <Texts.Medium>Vote Average: {props.item.vote_average}</Texts.Medium>
        <Texts.Medium>
          Genre: {props.item.genre_ids.map((id:Number) => {
            if(show == 'movie'){
              return `${moviegenre(id ?? 0)} `
            } else {
              return `${tvgenre(id ?? 0)} `
            }
          })}
        </Texts.Medium>
      </View>
    </TouchableOpacity>
  )
}

interface params {
  title:string,
  type:string,
  show:string
}

export default function ListShow (props: {route: { params:params }, navigation:any}) {
  const {type, title, show} = props.route.params

  const [listShow, setListShow] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const client = useApolloClient()
  const query:any = convertQuery(type)
  
  useEffect(() => {
    props.navigation.setOptions({ title })
    callQuery(1)
  }, [])

  const callQuery = (page:number):void => {
    setLoading(true)
    client.query({ query, variables: {page} })
    .then(({data, loading}) => {
      setListShow(listShow.concat(data[type].results))
      setLoading(loading)
    })
  }

  return (
    <View>
      <FlatList
        data={listShow}
        renderItem={(item) => renderItem(item, props.navigation, show)}
        keyExtractor={(item: {id:number}, i) => `${item.id}${i}`}
        onEndReached={() => {
          callQuery(page+1)
          setPage(page+1)
        }}
        ListFooterComponent={() => {
          if(loading) {
            return (
              <View style={{flex: 1, paddingVertical: 16, justifyContent: 'center'}}>
                <ActivityIndicator size="large" color={colors.blood} />
              </View>
            )}
            else {
              return <View style={{flex: 1, paddingVertical: 16}} />
            }
          }}
      />
    </View>
  )
}