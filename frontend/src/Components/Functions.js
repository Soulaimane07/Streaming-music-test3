import { useEffect } from "react"

export const UserServiceUrl = "http://localhost:5002/api"
export const CatalogServiceUrl = "http://localhost:5003/api"



export const tracks = [{"image": "../images/song.jpg", "title": "Lbaroud", "album": "Colors", artist: {name: "Draganov"}},2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20]



export const GetTop = (title) => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
        document.title = "Spotify | " + title;
        console.log("--> Get Top");
    }, [title]);
}