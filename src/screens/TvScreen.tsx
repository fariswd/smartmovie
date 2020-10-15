import React, { useEffect, useState } from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { useApolloClient } from '@apollo/client';

import {
  TOPRATEDTV,
  OTA,
  AIRTODAY,
  POPULARTV,
} from '../graphql/queries/tvQueries'

import HorizontalShowcase from '../components/HorizontalShowcase'
import * as Texts from '../components/Texts'
import colors from '../constants/colors';

export default function TvScreen(props:any){
  const [onTheAir, setOnTheAir] = useState({loading: true})
  const [popularTv, setPopularTv] = useState({loading: true})
  const [topRatedTv, setTopRatedTv] = useState({loading: true})
  const [airToday, setAirToday] = useState({loading: true})
  
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
    callQuery(OTA, setOnTheAir, 'ontheair')
    callQuery(POPULARTV, setPopularTv, 'populartv')
    callQuery(TOPRATEDTV, setTopRatedTv, 'topratedtv')
    callQuery(AIRTODAY, setAirToday, 'airtoday')
  }, [])

  return (
    <ScrollView>
      <View>
        <View style={styles.showcaseHeader}>
          <Texts.Big>On The Air</Texts.Big>
          <TouchableOpacity
            style={styles.showAllButton}
            onPress={() => () => navigateListShow({
              title: 'On The Air',
              type: 'ontheair',
              show: 'tv'
            })}
          >
            <Texts.Medium style={styles.textShowAll}>Show All</Texts.Medium>
          </TouchableOpacity>
        </View>
        <HorizontalShowcase
          navigation={props.navigation}
          show="tv"
          showcaseData={onTheAir}
          footerOnPress={() => navigateListShow({
            title: 'On The Air',
            type: 'ontheair',
            show: 'tv'
          })}
        />
      </View>

      <View>
        <View style={styles.showcaseHeader}>
          <Texts.Big>Popular TV</Texts.Big>
          <TouchableOpacity
            style={styles.showAllButton}
            onPress={() => navigateListShow({
              title: 'Popular TV',
              type: 'populartv',
              show: 'tv'
            })}
          >
            <Texts.Medium style={styles.textShowAll}>Show All</Texts.Medium>
          </TouchableOpacity>
        </View>
        <HorizontalShowcase
          navigation={props.navigation}
          show="tv"
          showcaseData={popularTv}
          footerOnPress={() => navigateListShow({
            title: 'Popular TV',
            type: 'populartv',
            show: 'tv'
          })}
        />
      </View>

      <View>
        <View style={styles.showcaseHeader}>
          <Texts.Big>Top Rated TV</Texts.Big>
          <TouchableOpacity
            style={styles.showAllButton}
            onPress={() => navigateListShow({
              title: 'Top Rated TV',
              type: 'topratedtv',
              show: 'tv'
            })}
          >
            <Texts.Medium style={styles.textShowAll}>Show All</Texts.Medium>
          </TouchableOpacity>
        </View>
        <HorizontalShowcase
          navigation={props.navigation}
          show="tv"
          showcaseData={topRatedTv}
          footerOnPress={() => navigateListShow({
            title: 'Top Rated TV',
            type: 'topratedtv',
            show: 'tv'
          })}
        />
      </View>

      <View>
        <View style={styles.showcaseHeader}>
          <Texts.Big>Air Today</Texts.Big>
          <TouchableOpacity
            style={styles.showAllButton}
            onPress={() => navigateListShow({
              title: 'Air Today',
              type: 'airtoday',
              show: 'tv'
            })}
          >
            <Texts.Medium style={styles.textShowAll}>Show All</Texts.Medium>
          </TouchableOpacity>
        </View>
        <HorizontalShowcase
          navigation={props.navigation}
          show="tv"
          showcaseData={airToday}
          footerOnPress={() => navigateListShow({
            title: 'Air Today',
            type: 'airtoday',
            show: 'tv'
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