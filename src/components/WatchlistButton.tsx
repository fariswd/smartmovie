import React, {useContext} from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../constants/colors'

import { WatchlistContext } from  '../contexts/watchlist'
const useWatchlist = () => useContext(WatchlistContext)

export default function WatchlistButton(props:{item:any, show:string}) {
  const {watchlist, addWatchlist, removeWatchlist} = useWatchlist()
  const isInWatchList = watchlist.filter((w:{id:number}) => w.id == props.item.id).length>0
  return (
    <View style={styles.outline}>
      <View style={styles.backgroundHeart}>
        <TouchableOpacity
          onPress={() => {
            if(isInWatchList){
              removeWatchlist({...props.item, show:props.show})
            } else {
              addWatchlist({...props.item, show:props.show})
            }
          }}
        >
          <Ionicons
            name="heart"
            size={25}
            color={isInWatchList ? colors.blood : colors.lightgray}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outline: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 16,
  },
  backgroundHeart: {
    padding: 8,
    borderRadius: 100,
    backgroundColor: 'white',
    overflow: 'hidden',
    elevation: 5,
  }
})