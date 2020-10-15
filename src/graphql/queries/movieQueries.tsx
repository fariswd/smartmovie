import React from 'react'
import { gql } from '@apollo/client'

import config from '../../constants/config'

export const TOPRATED = gql`
  query TopRated {
    toprated(page: $page)
      @rest(
        type: "TopRated",
        path: "movie/top_rated?api_key=${config.APIKEY}&{args}"
      ) {
        page
        results {
          id
          poster_path
          title
          vote_average
          release_date
          overview
          backdrop_path
          popularity
          genre_ids
        }
      }
  }
`;

export const UPCOMING = gql`
  query Upcoming {
    upcoming(page: $page)
      @rest(
        type: "Upcoming",
        path: "movie/upcoming?api_key=${config.APIKEY}&{args}"
      ) {
        page
        results {
          id
          poster_path
          title
          vote_average
          release_date
          overview
          backdrop_path
          popularity
          genre_ids
        }
      }
  }
`;

export const NOWPLAYING = gql`
  query NowPlaying {
    nowplaying(page: $page)
      @rest(
        type: "NowPlaying",
        path: "movie/now_playing?api_key=${config.APIKEY}&{args}"
      ) {
        page
        results {
          id
          poster_path
          title
          vote_average
          release_date
          overview
          backdrop_path
          popularity
          genre_ids
        }
      }
  }
`;

export const POPULAR = gql`
  query Popular {
    popular(page: $page)
      @rest(
        type: "Popular",
        path: "movie/popular?api_key=${config.APIKEY}&{args}"
      ) {
        page
        results {
          id
          poster_path
          title
          vote_average
          release_date
          overview
          backdrop_path
          popularity
          genre_ids
        }
      }
  }
`;