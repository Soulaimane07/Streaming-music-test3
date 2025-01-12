import requests
from bs4 import BeautifulSoup
import os
import json
import re

# Function to sanitize filenames
def sanitize_filename(name):
    return re.sub(r'[<>:"/\\|?*]', '-', name)

# URL of the artist's albums page
url = "https://genius.com/artists/Aaliyah/albums"

# Directory to save downloaded cover images
image_directory = "album_covers"
os.makedirs(image_directory, exist_ok=True)

# Make an HTTP GET request to fetch the page content
response = requests.get(url)

if response.status_code == 200:
    # Parse the HTML content
    soup = BeautifulSoup(response.content, "html.parser")
    
    # Find all album items on the page
    albums = soup.select("ul.ListSection-desktop-sc-2bca79e6-8 li.ListItem-sc-4f1bc3d5-0")
    
    album_data = []  # List to hold album details
    
    for album in albums:
        # Extract album details
        album_name = album.select_one("h3.ListItem-sc-4f1bc3d5-4").text.strip()
        release_year = album.select_one("div.ListItem-sc-4f1bc3d5-5").text.strip()
        album_link = album.find("a", class_="ListItem-sc-4f1bc3d5-1")["href"]
        album_cover_img = album.select_one("div.SizedImage-sc-39a204ed-0 img")["src"]
        
        # Sanitize album name for the filename
        sanitized_album_name = sanitize_filename(album_name)
        
        # Save the cover image locally
        image_filename = os.path.join(image_directory, f"{sanitized_album_name}.jpg")
        img_response = requests.get(album_cover_img)
        if img_response.status_code == 200:
            with open(image_filename, "wb") as img_file:
                img_file.write(img_response.content)
        
        # Append album details to the list
        album_data.append({
            "album_name": album_name,
            "release_year": release_year,
            "album_link": album_link,
            "cover_image": image_filename  # Local path to the downloaded image
        })
        print(f"Downloaded cover for: {album_name}")
    
    # Save the album data as a JSON file
    json_filename = "album_data.json"
    with open(json_filename, "w", encoding="utf-8") as json_file:
        json.dump(album_data, json_file, indent=4, ensure_ascii=False)
    print(f"Data exported to {json_filename}")
else:
    print(f"Failed to retrieve the page. Status code: {response.status_code}")
