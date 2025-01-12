import requests
from bs4 import BeautifulSoup
import json

# URL of the album page
url = "https://genius.com/albums/Aaron-fraser-nash/The-cursed-characters-album-pt-1"

# Send a GET request to the URL
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the HTML content
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Find all the song titles
    songs = soup.find_all('h3', class_='chart_row-content-title')
    
    # Prepare song data according to the Swagger schema
    song_data = []
    for idx, song in enumerate(songs):
        song_entry = {
            "id": idx + 1,  # Auto-generated ID
            "name": song.get_text(strip=True),  # Song title
            "description": f"{song.get_text(strip=True)} description",  # Placeholder description
            "duration": 180,  # Placeholder duration in seconds
            "audioUrl": f"https://example.com/audio/{idx + 1}",  # Placeholder audio URL
            "imageUrl": f"https://example.com/images/{idx + 1}.jpg",  # Placeholder image URL
            "artistId": "artist-123",  # Placeholder artist ID
            "albumId": "album-456",  # Placeholder album ID
            "genreIds": ["genre-1", "genre-2"]  # Placeholder genre IDs
        }
        song_data.append(song_entry)
    
    # Convert the data to JSON and save to a file
    json_file_name = "album_songs.json"
    with open(json_file_name, "w", encoding="utf-8") as json_file:
        json.dump(song_data, json_file, ensure_ascii=False, indent=4)
    
    print(f"Data has been saved to {json_file_name}.")
else:
    print(f"Failed to fetch the page. Status code: {response.status_code}")
