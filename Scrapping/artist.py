import requests
from bs4 import BeautifulSoup

# URL of the artist's profile page
url = 'https://genius.com/artists/Adele'

# Send a GET request to the page
response = requests.get(url)

# Parse the content with BeautifulSoup
soup = BeautifulSoup(response.text, 'html.parser')

# Extract artist name
artist_name = soup.find('h1', class_='profile_identity-name_iq_and_role_icon').text.strip()

# Extract artist image (background-image URL)
artist_image = soup.find('div', class_='user_avatar').get('style').replace('background-image: url(', '').replace(');', '')

# Extract the description text (first paragraph) - You can extend this to get more details
artist_description = soup.find('p').text

# Print the collected data
print(f"Artist Name: {artist_name}")
print(f"Artist Image URL: {artist_image}")
print(f"Artist Description: {artist_description}")
