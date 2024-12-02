import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const UserServiceUrl = "http://localhost:5002/api"
export const CatalogServiceUrl = "http://localhost:5003/api"

export const artists = [
    {
        "name": "Kendrik Lamar",
        "image": "../images/singer.jpg"
    }
    ,2,3,4,5,6,7,8,9,10]

export const artist = {
    "name": "Kendrik Lamar",
    "image": "../images/singer.jpg",
    "monthlyListeners": 100000
}

export const playlist = {
    "title": "Friendly Rap",
    "image": "../images/singer.jpg",
}

export const playlists = [
    {"title": "Friendly rap", image: "../images/song.jpg"},
    {"title": "Rap", image: "../images/song.jpg"},
    {"title": "Test 1", image: "../images/song.jpg"},
    {"title": "Test 2", image: "../images/song.jpg"},
    {"title": "Test 3"},
    {"title": "Test 4", image: "../images/song.jpg"},
    {"title": "Test 5", image: "../images/song.jpg"},
    {"title": "Test 6"},
    {"title": "Test 7", image: "../images/song.jpg"},
    {"title": "Test 8", image: "../images/song.jpg"},
    {"title": "Test 9", image: "../images/song.jpg"},
    {"title": "Test 10"},
]

export const albums = [1,2,3,4,5]
export const tracks = [{"image": "../images/song.jpg", "title": "Lbaroud", "album": "Colors", artist: {name: "Draganov"}},2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20]



export const genres = [
    {
        "title": "All"
    },
    {
        "title": "Songs"
    },
    {
        "title": "Artists"
    },
    {
        "title": "Albums"
    },
    {
        "title": "Playlists"
    },
]

export const GetTop = (title) => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
        document.title = "Spotify | " + title;
    }, []);
}