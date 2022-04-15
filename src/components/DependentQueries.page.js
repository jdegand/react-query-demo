import { useQuery } from "react-query"
import axios from 'axios'

const fetchUserByEmail = (email) => {
    return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchCoursesByChannelId = (channelId) => {
    return axios.get(`http://localhost:4000/channels/${channelId}`)
}

export const DependentQueriesPage = ({ email }) => {

    const { data: user } = useQuery(['user', email], () => fetchUserByEmail(email))
    const channelId = user?.data.channelId;

    const {data: courses, isLoading} = useQuery(['courses', channelId], ()=> fetchCoursesByChannelId(channelId), {enabled: !!channelId})

    if (isLoading) {
        return <h2>Loading...</h2>
      }

    return (
        <>
        <div>DependentQueriesPage</div>
            {courses?.data.courses.map(course => {
                return <div key={course}>
                    {course}
                </div>
            })} 
        </>
    )
}