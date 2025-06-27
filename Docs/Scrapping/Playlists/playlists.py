import requests
from bs4 import BeautifulSoup
import json
import os

# URL of the page containing playlists
url = "https://music.apple.com/ca/playlist/buzzworthy/pl.b879b0aae78e4752bcc82247977a9f3d"

# Directory to save images
image_dir = "playlist_images"
os.makedirs(image_dir, exist_ok=True)

# Send a GET request to fetch the HTML content
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}
response = requests.get(url, headers=headers)

# Check the response status
if response.status_code == 200:
    # Parse the HTML content
    soup = BeautifulSoup(response.content, "html.parser")
    
    # Find the playlist container
    playlists = soup.find_all("li", class_="shelf-grid__list-item")
    
    # Limit to the first 7 playlists
    playlists = playlists[:7]
    
    # List to store playlist data
    playlist_data = []
    
    # Iterate through each playlist and extract data
    for index, playlist in enumerate(playlists, start=1):
        # Extract playlist name
        name_tag = playlist.find("a", class_="product-lockup__title")
        playlist_name = name_tag.text.strip() if name_tag else "N/A"
        
        # Extract playlist link
        playlist_link = name_tag["href"] if name_tag else "N/A"
        
        # Extract playlist description
        description_tag = playlist.find("span", class_="product-lockup__subtitle")
        playlist_description = description_tag.text.strip() if description_tag else "N/A"
        
        # Extract playlist image URL
        image_tag = playlist.find("source", {"type": "image/webp"})
        image_url = image_tag["srcset"].split(",")[0].strip() if image_tag else "N/A"
        
        # Download the image
        image_filename = os.path.join(image_dir, f"playlist_{index}.webp")
        if image_url != "N/A":
            image_response = requests.get(image_url, stream=True)
            if image_response.status_code == 200:
                with open(image_filename, "wb") as img_file:
                    for chunk in image_response.iter_content(1024):
                        img_file.write(chunk)
        
        # Add data to the list
        playlist_data.append({
            "name": playlist_name,
            "link": playlist_link,
            "description": playlist_description,
            "image_url": image_url,
            "image_file": image_filename if image_url != "N/A" else "N/A"
        })
    
    # Save data to JSON
    json_filename = "playlists.json"
    with open(json_filename, "w", encoding="utf-8") as json_file:
        json.dump(playlist_data, json_file, indent=4, ensure_ascii=False)
    
    print(f"Data has been exported to {json_filename}")
    print(f"Images have been downloaded to the directory: {image_dir}")
else:
    print(f"Failed to fetch the page. Status code: {response.status_code}")
