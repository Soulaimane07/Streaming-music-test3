import requests
import json

# Backend API endpoint
api_url = "http://localhost:5002/api/songs/add-song"

# Read the JSON file
with open("SongsData.json", "r", encoding="utf-8") as file:
    songs = json.load(file)

# Iterate through each song and send POST requests
for song in songs:
    # Remove "id" field if it exists
    song.pop("id", None)

    try:
        # Send a POST request with the song data
        response = requests.post(api_url, json=song)

        # Check if the song was successfully added
        if response.status_code == 201:  # HTTP 201 Created
            print(f"Successfully added song: {song['name']}")
        else:
            print(f"Failed to add song: {song['name']} (Status code: {response.status_code})")
            print("Response:", response.text)
    except Exception as e:
        print(f"Error adding song {song.get('name', 'Unknown')}: {e}")
