import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

const initialState = {
  watchlist: [],
  addWatchlist: (item) => {},
  removeWatchlist: (item) => {}
}

export const WatchlistContext = createContext(initialState)

export default function WatchlistProvider({children}) {
  const [watchlist, setWatchlist] = useState([])
  const addWatchlist = (item:any) => {
    setWatchlist(watchlist.concat(item))
  }
  const removeWatchlist = (item:any) => {
    const newWatchlist = watchlist.filter((w:{id:number}) => w.id !== item.id)
    setWatchlist(newWatchlist)
  }

  //set to asnycstorage
  useEffect(() => {
    if (watchlist.length>0) {
      AsyncStorage.setItem('SMARTMOVIE::WATCHLIST', `${JSON.stringify(watchlist)}`);
    }
  }, [watchlist]);

  //set from asyncstorage
  useEffect(() => {
    AsyncStorage.getItem('SMARTMOVIE::WATCHLIST')
    .then((value) => {
      if (value) {
        setWatchlist(JSON.parse(value))
      }
    })
  }, [])

  return (
    <WatchlistContext.Provider
      value={{
        watchlist: watchlist,
        addWatchlist,
        removeWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  )
}