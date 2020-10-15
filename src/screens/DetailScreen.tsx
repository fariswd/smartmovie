import { useApolloClient } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import {
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  Dimensions
} from 'react-native'

import { DETAILMOVIE, DETAILTV } from '../graphql/queries/detailQueries'
import config from '../constants/config'
import colors from '../constants/colors'

import * as Texts from '../components/Texts'
import WatchlistButton from '../components/WatchlistButton'

const screenWidth = Math.round(Dimensions.get('window').width);

interface params {
  id:string,
  title:string,
  show:string
}

export default function DetailScreen (props: {route: { params:params }, navigation:any}) {
  const {id, title, show} = props.route.params
  const [detail, setDetail] = useState({
    id,
    poster_path: '',
    title,
    name: '',
    vote_average: '',
    release_date: '',
    overview: '',
    backdrop_path: '',
    first_air_date: '',
    popularity: '',
    genre: '',
    status: ''
  })
  const [loading, setLoading] = useState(true)
  const client = useApolloClient()

  const query = show == 'movie' ? DETAILMOVIE : DETAILTV

  useEffect(() => {
    client.query({ query, variables: {id} })
    .then(({data, loading}) => {
      setDetail(data[show])
      setLoading(loading)
      props.navigation.setOptions({ title: show == 'movie' ? title : data[show].name })
    })
  }, [])

  if(loading){
    return (
      <View style={{paddingTop: 20}}>
        <ActivityIndicator size="large" color={colors.blood} />
      </View>
    )
  }
  return (
    <ScrollView>
      <Image
        source={{uri: `${config.IMGBASE}${detail.backdrop_path}`}}
        style={{width: screenWidth, height: 200}}
      />
      <View style={{marginTop: -60, marginLeft: 16, flexDirection: 'row', alignItems: 'flex-end'}}>
        <View>
          <Image
            source={{uri: `${config.IMGBASE}${detail.poster_path}`}}
            style={{width: 80, height: 120}}
          />
        </View>
        <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
          <WatchlistButton item={detail} show={show}/>
        </View>
      </View>
      <View style={{paddingHorizontal: 16, marginTop: 8}}>
        <Texts.XBig>
          {show=='movie' ? `${detail.title}` : `${detail.name}`}
        </Texts.XBig>
        <Texts.Medium>Release Date: {show=='movie' ? detail.release_date : detail.first_air_date}</Texts.Medium>
        <Texts.Medium>Status: {detail.status}</Texts.Medium>
        <Texts.Medium>Popularity: {detail.popularity}</Texts.Medium>
        <Texts.Medium>Vote Average: {detail.vote_average}</Texts.Medium>
        <Texts.Medium>{detail.overview}</Texts.Medium>
      </View>
    </ScrollView>
  )
}