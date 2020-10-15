import React, { useEffect, useState } from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { useApolloClient } from '@apollo/client';

import { TOPRATED, UPCOMING, NOWPLAYING, POPULAR } from '../graphql/queries/movieQueries'

import HorizontalShowcase from '../components/HorizontalShowcase'
import * as Texts from '../components/Texts'
import colors from '../constants/colors';

export default function MovieScreen(props:any){
  const [nowPlaying, setNowPlaying] = useState({loading: true})
  const [popular, setPopular] = useState({loading: true})
  const [topRated, setTopRated] = useState({loading: true})
  const [upcoming, setUpcoming] = useState({loading: true})
  
  const client = useApolloClient()
  const callQuery = (query:any, updateState:Function, type:string):void => {
    client.query({ query, variables: {
      page: 1
    } })
    .then(({data, loading}) => {
      const states = {
        loading: loading,
        results: data[type].results
      }
      updateState(states)
    })
  }

  const navigateListShow = ({title, type, show}) => {
    return props.navigation.navigate('ListShow', {
      title,
      type,
      show
    })
  }

  useEffect(() => {
    callQuery(NOWPLAYING, setNowPlaying, 'nowplaying')
    callQuery(POPULAR, setPopular, 'popular')
    callQuery(TOPRATED, setTopRated, 'toprated')
    callQuery(UPCOMING, setUpcoming, 'upcoming')
  }, [])

  return (
    <ScrollView>
      <View>
        <View style={styles.showcaseHeader}>
          <Texts.Big>Now Playing</Texts.Big>
          <TouchableOpacity
            style={styles.showAllButton}
            onPress={() => navigateListShow({
              title: 'Now Playing',
              type: 'nowplaying',
              show: 'movie'
            })}
          >
            <Texts.Medium style={styles.textShowAll}>Show All</Texts.Medium>
          </TouchableOpacity>
        </View>
        <HorizontalShowcase
          navigation={props.navigation}
          show="movie"
          showcaseData={nowPlaying}
          footerOnPress={() => navigateListShow({
            title: 'Now Playing',
            type: 'nowplaying',
            show: 'movie'
          })}
        />
      </View>

      <View>
        <View style={styles.showcaseHeader}>
          <Texts.Big>Popular</Texts.Big>
          <TouchableOpacity
            style={styles.showAllButton}
            onPress={() => navigateListShow({
              title: 'Popular',
              type: 'popular',
              show: 'movie'
            })}
          >
            <Texts.Medium style={styles.textShowAll}>Show All</Texts.Medium>
          </TouchableOpacity>
        </View>
        <HorizontalShowcase
          navigation={props.navigation}
          show="movie"
          showcaseData={popular}
          footerOnPress={() => navigateListShow({
            title: 'Popular',
            type: 'popular',
            show: 'movie'
          })}
        />
      </View>

      <View>
        <View style={styles.showcaseHeader}>
          <Texts.Big>Top Rated</Texts.Big>
          <TouchableOpacity
            style={styles.showAllButton}
            onPress={() => navigateListShow({
              title: 'Top Rated',
              type: 'toprated',
              show: 'movie',
            })}
          >
            <Texts.Medium style={styles.textShowAll}>Show All</Texts.Medium>
          </TouchableOpacity>
        </View>
        <HorizontalShowcase
          navigation={props.navigation}
          show="movie"
          showcaseData={topRated}
          footerOnPress={() => navigateListShow({
            title: 'Top Rated',
            type: 'toprated',
            show: 'movie',
          })}
        />
      </View>

      <View>
        <View style={styles.showcaseHeader}>
          <Texts.Big>Upcoming</Texts.Big>
          <TouchableOpacity
            style={styles.showAllButton}
            onPress={() => navigateListShow({
              title: 'Upcoming',
              type: 'upcoming',
              show: 'movie'
            })}
          >
            <Texts.Medium style={styles.textShowAll}>Show All</Texts.Medium>
          </TouchableOpacity>
        </View>
        <HorizontalShowcase
          navigation={props.navigation}
          show="movie"
          showcaseData={upcoming}
          footerOnPress={() => navigateListShow({
            title: 'Upcoming',
            type: 'upcoming',
            show: 'movie'
          })}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  showcaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingHorizontal: 8,
    paddingTop: 24
  },
  showAllButton: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: colors.blood
  },
  textShowAll: {
    color: 'white'
  }
})