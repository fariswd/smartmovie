import { useApolloClient } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import {
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  StyleSheet
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
    genres: [],
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
      <View style={styles.boxContainer}>
        <Texts.XBig>
          {show=='movie' ? `${detail.title}` : `${detail.name}`}
          {` (`}
          {show=='movie' ? detail.release_date.substr(0,4) : detail.first_air_date.substr(0,4)}
          {`) `}
        </Texts.XBig>
        <View style={{borderBottomWidth: 0.5, marginVertical: 4}} />
        <View style={styles.listed}>
          <Texts.Medium>Release Date:</Texts.Medium>
          <Texts.Medium>{show=='movie' ? detail.release_date : detail.first_air_date}</Texts.Medium>
        </View>
        <View style={styles.listed}>
          <Texts.Medium>Status:</Texts.Medium>
          <Texts.Medium>{detail.status}</Texts.Medium>
        </View>
        <View style={styles.listed}>
          <Texts.Medium>Genres:</Texts.Medium>
          <Texts.Medium>{detail.genres.map((g:{name:string}) => `${g.name} `)}</Texts.Medium>
        </View>
        <View style={styles.listed}>
          <Texts.Medium>Popularity:</Texts.Medium>
          <Texts.Medium>{detail.popularity}</Texts.Medium>
        </View>
        <View style={styles.listed}>
          <Texts.Medium>Vote Average:</Texts.Medium>
          <Texts.Medium>{detail.vote_average}</Texts.Medium>
        </View>
        <View style={{paddingVertical: 8}}>
          <Texts.Medium>Overview</Texts.Medium>
          <View style={{paddingBottom: 8}} />
          <Texts.Medium style={{lineHeight: 24}}>{detail.overview}</Texts.Medium>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  listed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  boxContainer: {
    paddingBottom: 24,
    paddingTop: 8,
    paddingHorizontal: 8,
    marginTop: 8,
    marginHorizontal: 8,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    }
})