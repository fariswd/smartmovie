import React from 'react'

import { TOPRATED, UPCOMING, NOWPLAYING, POPULAR } from '../graphql/queries/movieQueries'
import {
  TOPRATEDTV,
  OTA,
  AIRTODAY,
  POPULARTV,
} from '../graphql/queries/tvQueries'

export default function convertQuery(key:string){
  switch (key) {
    case 'nowplaying':
      return NOWPLAYING
    case 'popular':
      return POPULAR
    case 'toprated':
      return TOPRATED
    case 'upcoming':
      return UPCOMING

    case 'topratedtv':
      return TOPRATEDTV
    case 'ontheair':
      return OTA
    case 'airtoday':
      return AIRTODAY
    case 'populartv':
      return POPULARTV
  }
}