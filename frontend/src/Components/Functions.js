import { useEffect, useState } from "react"
import axios from "axios"

export const UserServiceUrl = "http://localhost:5002/api"
export const CatalogServiceUrl = "http://localhost:5003/api"
export const PlaylistServiceUrl = "http://localhost:5004/api"



export const tracks = [{"image": "../images/song.jpg", "title": "Lbaroud", "album": "Colors", artist: {name: "Draganov"}},2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20]



export const GetTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
}

export const PageTitle = (title) => {
    useEffect(() => {
        document.title = "Spotify | " + title;
    }, [title]);
}


export const GetPlans = () => {
    const [plans, setPlans] = useState([])
    
    useEffect(()=> {
        axios.get(`${UserServiceUrl}/subscriptionplans`)
            .then((res)=> {
                setPlans(res.data)
            })
            .catch((err)=> {
                console.error(err);
            })
    }, [])

    return plans
}