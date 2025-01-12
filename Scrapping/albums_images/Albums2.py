import requests
from bs4 import BeautifulSoup
import os
import re
import json

# Function to sanitize filenames and ensure compatibility with URLs
def sanitize_filename(name):
    return re.sub(r'[<>:"/\\|?* ]', '+', name)

# URL to scrape
url = "https://genius.com/artists/Aaron-fraser-nash/albums"

# Send a GET request to fetch the webpage
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}
response = requests.get(url, headers=headers)

if response.status_code == 200:
    # Parse the HTML content
    soup = BeautifulSoup(response.content, "html.parser")
    
    # Define the artist ID (as per Swagger example)
    artist_id = "678164ce9550e6bd88f73f13"
    
    # Directory to save cover images (optional, for debugging)
    image_directory = "album_covers"
    os.makedirs(image_directory, exist_ok=True)
    
    # List to store albums data
    albums_data = []

    # Find all album entries
    albums = soup.select("ul.ListSection-desktop-sc-2bca79e6-8 li.ListItem-sc-4f1bc3d5-0")
    
    for album in albums:
        # Extract album title
        album_name = album.select_one("h3.ListItem-sc-4f1bc3d5-4").text.strip()
        
        # Extract release year
        release_date = album.select_one("div.ListItem-sc-4f1bc3d5-5").text.strip()
        release_year = release_date.split()[-1]  # Extract the year (last part of the date)
        
        # Extract album cover image URL
        cover_img_element = album.select_one("div.SizedImage-sc-39a204ed-0 img")
        cover_img_url = cover_img_element["src"] if cover_img_element else None
        
        # Create a sanitized image URL for the S3 bucket
        sanitized_album_name = sanitize_filename(album_name)
        s3_image_url = f"https://streaming-app-datastore.s3.eu-west-3.amazonaws.com/albums/{sanitized_album_name}.jpg"
        
        # Save the cover image locally (optional)
        if cover_img_url:
            image_filename = os.path.join(image_directory, f"{sanitized_album_name}.jpg")
            img_response = requests.get(cover_img_url)
            if img_response.status_code == 200:
                with open(image_filename, "wb") as img_file:
                    img_file.write(img_response.content)
                print(f"Downloaded cover image for: {album_name}")

        # Add album details to the list
        albums_data.append({
            "title": album_name,
            "year": release_year,
            "songs": 0,  # No song count available from the page
            "artistId": artist_id,
            "image": s3_image_url
        })
    
    # Save the album data as a JSON file
    json_filename = "swagger_albums.json"
    with open(json_filename, "w", encoding="utf-8") as json_file:
        json.dump(albums_data, json_file, indent=4, ensure_ascii=False)
    
    print(f"Album data exported to {json_filename}")

else:
    print(f"Failed to fetch the webpage. Status code: {response.status_code}")
