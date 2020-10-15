import React from 'react'
import { gql } from '@apollo/client'

import config from '../../constants/config'

export const DETAILMOVIE = gql`
  query DetailMovie {
    movie(id: $id)
      @rest(
        type: "DetailMovie",
        path: "movie/{args.id}?api_key=${config.APIKEY}"
      ) {
        id
        poster_path
        title
        vote_average
        release_date
        overview
        backdrop_path
        popularity
        genre
        status
      }
  }
`;

export const DETAILTV = gql`
  query DetailTv {
    tv(id: $id)
      @rest(
        type: "DetailTv",
        path: "tv/{args.id}?api_key=${config.APIKEY}"
      ) {
        id
        poster_path
        name
        vote_average
        first_air_date
        overview
        backdrop_path
        popularity
        genre
        status
      }
  }
`;