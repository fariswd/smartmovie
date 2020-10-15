import React from 'react'
import { gql } from '@apollo/client'

import config from '../../constants/config'

export const TOPRATEDTV = gql`
  query TopRatedTv {
    topratedtv(page: $page)
      @rest(
        type: "TopRatedTv",
        path: "tv/top_rated?api_key=${config.APIKEY}&{args}"
      ) {
        page
        results {
          id
          poster_path
          name
          vote_average
          first_air_date
          overview
          backdrop_path
          popularity
          genre_ids
        }
      }
  }
`;

export const OTA = gql`
  query OnTheAir {
    ontheair(page: $page)
      @rest(
        type: "OnTheAir",
        path: "tv/on_the_air?api_key=${config.APIKEY}&{args}"
      ) {
        page
        results {
          id
          poster_path
          name
          vote_average
          first_air_date
          overview
          backdrop_path
          popularity
          genre_ids
        }
      }
  }
`;

export const AIRTODAY = gql`
  query AirToday {
    airtoday(page: $page)
      @rest(
        type: "AirToday",
        path: "tv/airing_today?api_key=${config.APIKEY}&{args}"
      ) {
        page
        results {
          id
          poster_path
          name
          vote_average
          first_air_date
          overview
          backdrop_path
          popularity
          genre_ids
        }
      }
  }
`;

export const POPULARTV = gql`
  query PopularTv {
    populartv(page: $page)
      @rest(
        type: "PopularTv",
        path: "tv/popular?api_key=${config.APIKEY}&{args}"
      ) {
        page
        results {
          id
          poster_path
          name
          vote_average
          first_air_date
          overview
          backdrop_path
          popularity
          genre_ids
        }
      }
  }
`;