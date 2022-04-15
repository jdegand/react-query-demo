import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'

const fetchSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1]
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

/* Loading indicator is still seen when clicking on hero if you also show the loading indicator when isFetching is true */

export const useSuperHeroData = heroId => {
  const queryClient = useQueryClient()
  return useQuery(['super-hero', heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData('super-heroes')
        ?.data?.find(hero => hero.id === parseInt(heroId))

      if (hero) {
        return { data: hero }
      } else {
        return undefined
      }
    }
  })
}

/*

const fetchSuperHero = (id) => { 
    return axios.get(`http://localhost:4000/superheroes/${id}`)
}

export const useSuperHeroData = (id) => {
    return useQuery(['super-hero', id], () => fetchSuperHero(id))
}

*/

/*
import { useQuery } from "react-query"
import axios from 'axios'

const fetchSuperHero = ({ queryKey }) => { 

    const heroId = queryKey[1]

    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const useSuperHeroData = (id) => {
    return useQuery(['super-hero', id], fetchSuperHero)
}
*/