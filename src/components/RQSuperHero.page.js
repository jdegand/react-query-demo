import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData"

export const RQSuperHeroPage = () => {

    const {id} = useParams()

    const {isLoading, data, isError, error } = useSuperHeroData(id);

    /* Video 18 - using if(isLoading || isFetching) prevents the initial data from the hook being used */
    if (isLoading) {
      return <h2>Loading...</h2>
    }
  
    if(isError){
        return <h2>{error.message}</h2>
    }

    return (
        <div>
            {data?.data.id} | {data?.data.name} | {data?.data.alterEgo}
         </div>
    )
}