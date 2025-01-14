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

    # Find all song entries on the page
    songs = soup.find_all('a', href=True, class_='u-display_block')

    # Prepare song data according to the Swagger schema
    song_data = []
    for idx, song in enumerate(songs):
        # Extract song title and link
        title = song.find('h3', class_='chart_row-content-title')
        
        if title:
            song_title = title.get_text(strip=True).replace("Lyrics", "").strip()
            song_url = song['href']  # Link to the song page

            # Send a request to the song's page to fetch lyrics
            song_page_response = requests.get(song_url)
            song_page_soup = BeautifulSoup(song_page_response.content, 'html.parser')

            # Extract the lyrics container from the song page
            lyrics_container = song_page_soup.find('div', {'data-lyrics-container': 'true', 'class': 'Lyrics-sc-1bcc94c6-1 bzTABU'})
            
            first_paragraph = ""
            if lyrics_container:
                consecutive_br_count = 0

                # Extract first paragraph of lyrics
                for element in lyrics_container:
                    # Append text of non-<br> elements
                    if element.name != 'br':
                        first_paragraph += str(element).strip()

                    # Count consecutive <br> tags
                    if element.name == 'br':
                        consecutive_br_count += 1
                    else:
                        consecutive_br_count = 0

                    # Stop if two consecutive <br> tags are found
                    if consecutive_br_count == 2:
                        break

                # Clean up the result by trimming the extra space and <br> tags
                first_paragraph = first_paragraph.replace('<br>', '').strip()

            # Add metadata
            song_entry = {
                "id": idx + 1,  # Auto-generated ID
                "name": song_title,  # Song title
                "description": first_paragraph,  # Extracted first paragraph of lyrics
                "duration": 180,  # Placeholder duration in seconds
                "audioUrl": f"https://example.com/audio/{idx + 1}",  # Placeholder audio URL
                "imageUrl": f"https://example.com/images/{idx + 1}.jpg",  # Placeholder image URL
                "artistId": "artist-123",  # Placeholder artist ID
                "albumId": "album-456",  # Placeholder album ID
                "genreIds": ["genre-1", "genre-2"],  # Placeholder genre IDs
                "songPageUrl": song_url  # Actual song page URL
            }
            song_data.append(song_entry)

    # Convert the data to JSON and save to a file
    json_file_name = "album_songs.json"
    with open(json_file_name, "w", encoding="utf-8") as json_file:
        json.dump(song_data, json_file, ensure_ascii=False, indent=4)

    print(f"Data has been saved to {json_file_name}.")
else:
    print(f"Failed to fetch the page. Status code: {response.status_code}")

