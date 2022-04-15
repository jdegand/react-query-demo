import { useQuery, useMutation, useQueryClient } from "react-query"
//import axios from 'axios'
import { request } from "../utils/axios-utils"

const fetchSuperHeroes = () => { 
    //return axios.get('http://localhost:4000/superheroes')
    return request({ url: '/superheroes' })
}

export const useSuperHeroesData = (onSuccess, onError) => {
    return useQuery("super-heroes", fetchSuperHeroes, { 
        onSuccess, 
        onError, 
        //enabled: enable ? false : true, 
        //select: (data) => {
        //  const superHeroNames = data.data.map(hero => hero.name);
        //  return superHeroNames;
       // }
      })
}

const addSuperHero = (hero) => {
  //return axios.post('http://localhost:4000/superheroes', hero)
  return request({ url: '/superheroes', method: 'post', data: hero })
}

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    //onSuccess: (data) => {
      //queryClient.invalidateQueries('super-heroes') uses additional network request
    //  queryClient.setQueryData('super-heroes', (oldQueryData) => {
    //    return {
    //      ...oldQueryData, 
    //      data: [...oldQueryData.data, data.data]
    //    }
    //  })
   // }
   onMutate: async (newHero) => {
     await queryClient.cancelQueries('super-heroes')
     const previousHeroData = queryClient.getQueryData('super-heroes')
     queryClient.setQueryData('super-heroes', (oldQueryData) => {
          return {
            ...oldQueryData, 
            data: [...oldQueryData.data, {id: oldQueryData?.data?.length + 1, ...newHero }]
        }
      })
      return {
        previousHeroData
      }
   },
   onError: (_error, _hero, context) => {
     queryClient.setQueryData('super-heroes', context.previousHeroData)
   },
   onSettled: () => {
     queryClient.invalidateQueries('super-heroes')
   }
  })
}

/* Video 13 Homework 

// need to look into a better way of doing this 

export const useSuperHeroesData = (onSuccess, onError, enable) => {
    return useQuery("super-heroes", fetchSuperHeroes, { 
        onSuccess, 
        onError, 
        enabled: enable ? false : true, 
        select: (data) => {
          const superHeroNames = data.data.map(hero => hero.name);
          return superHeroNames;
        }
      })
}
*/