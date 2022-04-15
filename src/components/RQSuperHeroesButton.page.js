import { useSuperHeroesData } from '../hooks/useSuperHeroesData'

export const RQSuperHeroesButtonPage = () => {

    const onSuccess = (data) => {
      console.log('Perform side effect after data fetching', data)
    }
  
    const onError = (error) => {
      console.log('Perform side effect after encountering error', error)
    }
  

    /* Add enable value to hook */
  const {isLoading, data, isError, isFetching, error, refetch} = useSuperHeroesData(onSuccess, onError, true);
  
    if (isLoading || isFetching) {
      return <h2>Loading...</h2>
    }
  
    if(isError){
        return <h2>{error.message}</h2>
    }
  
    return (
      <>
        <h2>RQSuper Heroes Page</h2>
        
        <button onClick={refetch}>Fetch</button>
        {
          data?.map(heroName => {
            return <div key={heroName}>{heroName}</div>
          })
        }
  
      </>
    )
  }