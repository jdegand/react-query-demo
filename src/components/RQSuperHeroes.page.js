import { useState } from 'react'
import { useSuperHeroesData } from '../hooks/useSuperHeroesData'
import { Link } from 'react-router-dom'
import { useAddSuperHeroData } from '../hooks/useSuperHeroesData'
//import { useQuery } from "react-query"
//import axios from 'axios'

/*
const fetchSuperHeroes = () => { 
    return axios.get('http://localhost:4000/superheroes')
}

useQuery("super-heroes", fetchSuperHeroes, { 
  onSuccess, 
  onError, 
  select: (data) => {
    const superHeroNames = data.data.map(hero => hero.name);
    return superHeroNames;
  }
})
*/

export const RQSuperHeroesPage = () => {

  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')

  const { mutate, isLoading:isMutating, isError:mutationFail, error:reason } = useAddSuperHeroData();

  const handleAddHeroClick = (e) => {
    e.preventDefault()
    const hero = {name, alterEgo};
    mutate(hero);
    setName('')
    setAlterEgo('')
  }

  const onSuccess = (data) => {
    console.log('Perform side effect after data fetching', data)
  }

  const onError = (error) => {
    console.log('Perform side effect after encountering error', error)
  }

  const {isLoading, data, isError, isFetching, error} = useSuperHeroesData(onSuccess, onError);

  if (isLoading || isFetching || isMutating) {
    return <h2>Loading...</h2>
  }

  if(isError || mutationFail){
      return <h2>{error.message || reason.message}</h2>
  }

  return (
    <>
      <h2>RQSuper Heroes Page</h2>

      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="Super Hero Name" value={name} onChange={(e)=> setName(e.target.value)} />
        <label htmlFor="alterEgo">Alter Ego</label>
        <input type="text" id="alterEgo" placeholder="Super Hero Alter Ego" value={alterEgo} onChange={(e)=> setAlterEgo(e.target.value)} />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </form>
      
      {data?.data.map(hero => {
        return <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      })} 
      {/*{
        data.map(heroName => {
          return <div key={heroName}>{heroName}</div>
        })
      } */}

    </>
  )
}

/*
Fetch on click 

add enabled:false to useQuery 3rd parameter obj
destructure refetch from hook
add <button onClick={refetch}>Fetch</button> to JSX

*/

/*

Video 11 Homework

import { useState } from 'react'
import { useQuery } from "react-query"
import axios from 'axios'

const fetchSuperHeroes = () => { 
    return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {

  const [refetchInterval, setRefetchInterval] = useState(3000);

  const onSuccess = (data) => {
    if(data.data.length === 4){
      setRefetchInterval(false)
    }
    console.log('Perform side effect after data fetching', data)
  }

  const onError = (error) => {
    if(error){
      setRefetchInterval(false)
    }
    console.log('Perform side effect after encountering error', error)
  }

const {isLoading, data, isError, isFetching, error, refetch} = useQuery("super-heroes", fetchSuperHeroes, { onSuccess, onError, refetchInterval})

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }

  if(isError){
      return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>RQSuper Heroes Page</h2>
      
      {data?.data.map(hero => {
        return <div key={hero.id}>{hero.name}</div>
      })}
    </>
  )
}
*/