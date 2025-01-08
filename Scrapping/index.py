import os
import requests
from bs4 import BeautifulSoup
import csv

# URL to scrape
url = "https://genius.com/artists-index/a"

# Directory to save images
image_dir = "artist_images"
os.makedirs(image_dir, exist_ok=True)

# Send a GET request
response = requests.get(url)

# Check for request success
if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all 'ul' elements with the class 'artists_index_list'
    artists_list = soup.find_all('ul', class_='artists_index_list')
    
    if len(artists_list) > 1:
        # Select the second 'ul' (index 1, as list is 0-indexed)
        artists_list = artists_list[1]

        # Extract artist names and URLs
        artists_data = []
        for li in artists_list.find_all('li'):
            if len(artists_data) >= 10:
                break  # Stop when we reach 80 artists
            
            link_tag = li.find('a')
            if link_tag:
                artist_url = link_tag['href']
                response2 = requests.get(artist_url)

                # Parse the content with BeautifulSoup
                soup = BeautifulSoup(response2.text, 'html.parser')

                # Extract artist name
                artist_name_tag = li.find('a')
                artist_name = artist_name_tag.text.strip() if artist_name_tag else 'Unknown'

                # Sanitize artist name for file paths
                safe_artist_name = "".join(c for c in artist_name if c.isalnum() or c in " _-").strip()

                # Extract artist image (background-image URL)
                artist_image_tag = soup.find('div', class_='user_avatar')
                artist_image = artist_image_tag.get('style').replace('background-image: url(', '').replace(');', '').strip("'") if artist_image_tag else None

                # Extract the description text (first paragraph or summary)
                artist_description_tag = soup.find('p')
                artist_description = artist_description_tag.text.strip() if artist_description_tag else 'No description available'

                # Download and save the image
                image_path = "No image available"
                if artist_image and artist_image.startswith('http'):
                    try:
                        image_response = requests.get(artist_image)
                        if image_response.status_code == 200:
                            image_path = os.path.join(image_dir, f"{safe_artist_name}.jpg")
                            with open(image_path, 'wb') as img_file:
                                img_file.write(image_response.content)
                        else:
                            print(f"Failed to download image for {artist_name}: HTTP {image_response.status_code}")
                    except Exception as e:
                        print(f"Failed to download image for {artist_name}: {e}")

                # Only add if artist has a name
                if artist_name != 'Unknown':
                    artists_data.append((artist_name, image_path, artist_description))
                    print(f"Scraped: {artist_name}")
                    print(f"Total so far: {len(artists_data)}")

        # Save to a CSV file
        csv_filename = "artists_data.csv"
        with open(csv_filename, mode='w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(['Artist Name', 'Image Path', 'Artist Description'])
            writer.writerows(artists_data)

        print(f"Data scraped and saved to '{csv_filename}'")
        print(f"Total artists scraped: {len(artists_data)}")

    else:
        print("Second artist list not found.")
else:
    print(f"Failed to fetch the URL: {response.status_code}")
