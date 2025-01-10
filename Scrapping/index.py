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





[
  {
    "Artist Name": "Aaliyah",
    "Image Path": "artist_images\\Aaliyah.jpg",
    "Artist Description": "Born on January 16, 1979 in Brooklyn, New York and raised in Detroit, Michigan, Aaliyah Dana Haughton, sometimes referred to as the “Princess of R&B,” was an American singer and actress who debuted in the early ‘90s. In 1989, at age ten, she appeared on the American talent television show, Star Search. In 1994, she made her debut in the music industry with her debut album, Age Ain’t Nothing But a Number."
  },
  {
    "Artist Name": "Aaron Fraser-Nash",
    "Image Path": "artist_images\\Aaron Fraser-Nash.jpg",
    "Artist Description": "Aaron Fraser-Nash (born April 18, 1987) is an English songwriter and artist, specializing in songs related to meme culture, movies and video games."
  },
  {
    "Artist Name": "Aaron Keyes",
    "Image Path": "artist_images\\Aaron Keyes.jpg",
    "Artist Description": "Aaron Keyes is a singer and songwriter from Snellville, GA. Over his career, Keyes has released one independent album, two studio albums, and two live recordings; some of his top songs include “Sovereign Over Us,” “Psalm 62,” “Trust You,” and more. Keyes is also the founder of worship school 10,000 Fathers and MereWorship, a source of content made by worship leaders for worship leaders. Currently, Keyes is a worship pastor for New Life Church in Colorado Springs, CO with his wife Megan and their four sons."
  },
  {
    "Artist Name": "Aaron Lewis",
    "Image Path": "artist_images\\Aaron Lewis.jpg",
    "Artist Description": "Aaron Lewis (born April 13, 1972) is an American musician, who is the lead vocalist, rhythm guitarist, and founding member of the rock group Staind, with whom he has released seven studio albums. He has since ventured into country music with his debut solo EP Town Line, which was released on March 1, 2011 on Stroudavarious Records. Lewis' first full-length solo release, The Road, was released by Blaster Records on November 13, 2012"
  },
  {
    "Artist Name": "Aaron May",
    "Image Path": "artist_images\\Aaron May.jpg",
    "Artist Description": "20 YEARS IN HOUSTON"
  },
  {
    "Artist Name": "Aaron Smith",
    "Image Path": "artist_images\\Aaron Smith.jpg",
    "Artist Description": "Aaron J. Simpson Smith is an American house music DJ from Chicago, Illinois. He is best known for recording a track called “Dancin'” which features female vocalist Luvli."
  },
  {
    "Artist Name": "Aaron Tveit",
    "Image Path": "artist_images\\Aaron Tveit.jpg",
    "Artist Description": "Aaron Tveit is an American actor and singer. He originated the roles of Gabe, Frank Abagnale Jr. and Christian in the broadway musicals Next to Normal, Catch Me If You Can, and Moulin Rouge the Musical, respectively. He also starred in film musicals as Enjolras in Les Miserables and Danny Zuko in Grease Live, as well as appearing in multiple TV shows and movies."
  },
  {
    "Artist Name": "E1 (3x3)",
    "Image Path": "artist_images\\E1 3x3.jpg",
    "Artist Description": "E1 is a young UK rapper who specialises in drill music. He is apart of the drill group 3x3 from Edmonton Green, North London."
  },
  {
    "Artist Name": "E-40",
    "Image Path": "artist_images\\E-40.jpg",
    "Artist Description": "Known as The Ambassador of the Bay, Vallejo’s Earl “E-40” Stevens is a boss, from starting his own independent record label Sick Wid It Records to releasing his own line of wine. 40 Water has been in the rap game since the 1980s and has stayed relevant for decades as his slanguage has found its way into the songs of other rappers."
  },
  {
    "Artist Name": "Eagle-Eye Cherry",
    "Image Path": "artist_images\\Eagle-Eye Cherry.jpg",
    "Artist Description": "Eagle-Eye Lanoo Cherry is a Swedish singer and stage performer, born 7 May 1968 in Stockholm, Sweden."
  },
  {
    "Artist Name": "Eagles of Death Metal",
    "Image Path": "artist_images\\Eagles of Death Metal.jpg",
    "Artist Description": "Founded in Palm Desert, Ca in 1998 by Jesse Hughes and Josh Homme, Eagles of Death Metal is a fun, tongue-in-cheek rock and roll band."
  },
  {
    "Artist Name": "eaJ",
    "Image Path": "artist_images\\eaJ.jpg",
    "Artist Description": "Jae Park, otherwise known by his Korean name Park Jae Hyung (박제형), is a former vocalist and electric guitarist for the band DAY6. He was born in Buenos Aires, Argentina, raised in Long Beach, California and is currently based in South Korea. Prior to joining DAY6, he gained attention as one of the final six finalists of the first season of the singing competition television series K-pop Star."
  },
  {
    "Artist Name": "Eamon",
    "Image Path": "artist_images\\Eamon.jpg",
    "Artist Description": "Platinum recording artist and unapologetic soul singer Eamon is set to release his new album Captive Thoughts on December 6 through Now Again Records. After his ambitious and critically acclaimed 2017 album Golden Rail Motel, Eamon’s new record feels like an even deeper expression of the lost art of the singer’s ability to make the listener feel every single lyric. “Simply put, I’m singing every note as if my life depends on it,” says Eamon through a thick Staten Island accent that hasn’t faded since relocating to Los Angeles."
  },
  {
    "Artist Name": "Early B",
    "Image Path": "artist_images\\Early B.jpg",
    "Artist Description": "Early B is an Afrikaans/English rapper from Port Elizabeth South Africa. He is known for his humorous storytelling and using the catch phrase “Van die Dal af”, which is the neighborhood he grew up in. Real name Earl Swartz, he started making music as part of a group known as MC Earl and Agemi."
  },
  {
    "Artist Name": "The Early November",
    "Image Path": "artist_images\\The Early November.jpg",
    "Artist Description": "The Early November is an American Emo/Indie Rock rock band from Hammonton, New Jersey, formed in 1999. Their current line-up consists of vocalist/guitarist Ace Enders and drummer Jeff Kummer. Lead guitarist Bill Lugg, bassist Sergio Anello, and keyboardist Joe Marro all contributed to the recording of the group’s fifth album, Lilac, released in 2019; however, they are not officially part of TEN and do not tour with them (although Joe manages the group)."
  },
  {
    "Artist Name": "D12",
    "Image Path": "artist_images\\D12.jpg",
    "Artist Description": "https://www.youtube.com/watch?v=f5hQjoL1drM"
  },
  {
    "Artist Name": "D1MA",
    "Image Path": "artist_images\\D1MA.jpg",
    "Artist Description": "D1MA er en af danmarks mest omtalte franskinspireret Rap og Hiphop stjerner. Han debuterede med sangen “COME MY WAY” i samarbejde med den svenske rapper VC Barre. Senere har han udgivet store singler som “DRØM MIG VÆK” og “NO LOVE”, som har dannet grundlaget for udgivelsen af debutalbummet “EV1GT&ALT1D”, der bl.a indeholder kæmpehittet “MOONLIGHT”. I efteråret 2024 udgav D1MA det album alle havde ventet, men en helt anden lyd overraskede D1MA-elskerne, den 11. oktober da “7” blev udgivet. “CLEOPATRA” blev en lille appetizer til et nyt lydunivers der for alvor kom til udtryk i boombap-sangen “VÅGN OP” der har indtaget pladserne på TOP-50 op til flere gange. Han er dog stadig maskeret og hans indentitet er endnu ukendt. Der går mange teorier om ham, vi kan sige med stor sikkerhed at han er over 21 år, marrokansk baggrund, kører en Rolls Royce Drophead Coupé, fra Aarhus (Gellerupparken/Trillegården), har haft en svær opvækst og har gået under navnet Grizzy (hans musik findes på SoundCloud)."
  },
  {
    "Artist Name": "D3",
    "Image Path": "artist_images\\D3.jpg",
    "Artist Description": "Hip-hop kariyerine 2017-2018 yıllarında Karaköy'de graffiti yaparak Dant3 mahlası ile başlayan Deniz, daha sonrasında soundcloud'da paylaştığı demolarla devam etti. 2020 yılının başında https://genius.com/artists/2run ile birlikte başladığı Anne Affet kollektifinin ilk EP'si olan https://genius.com/albums/D3-and-2run/Playboy-magazine ile profesyonel olarak müziğe girdi. Daha sonrasında https://genius.com/artists/Sam ile tanışması ile beraber Tophane Aç Kurtlar projesi altında ÇEKBİNBEŞYÜZDUMAN ile çıkış yaptı."
  },
  {
    "Artist Name": "d3r",
    "Image Path": "artist_images\\d3r.jpg",
    "Artist Description": "d3r (pronounced “der”) is a 21-year-old vocalist and new time producer from British Columbia, Canada. He is currently a part of the music collective, FabFantasy."
  },
  {
    "Artist Name": "D4L",
    "Image Path": "artist_images\\D4L.jpg",
    "Artist Description": "D4L was a hip-hop group formed in 2003 formerly comprised of Atlanta rappers Fabo, Mook-B, Stoney aka Stuntman, and Shawty Lo. The group’s name stands for “Down for Life” and signed to Dee Money Entertainment."
  },
  {
    "Artist Name": "DaBaby",
    "Image Path": "artist_images\\DaBaby.jpg",
    "Artist Description": "Jonathan Lyndale Kirk (b. December 22, 1991), better known as his stage name DaBaby (formerly Baby Jesus), is a rapper hailing from Charlotte, North Carolina."
  },
  {
    "Artist Name": "Dabeull",
    "Image Path": "artist_images\\Dabeull.jpg",
    "Artist Description": "Dabeull is a self-proclaimed French “NewFonk” artist, who is part of the popular French label Roche Musique. Dabeull recently collaborated on disco legend Cerrone’s hit record ‘Red Lips’ and later featured Cerrone on his own 2017 compilation “Indastudio”. The name for the compilation came from the songs stemming from his popular videos of him creating them in his homestudio."
  },
  {
    "Artist Name": "DaBoii",
    "Image Path": "artist_images\\DaBoii.jpg",
    "Artist Description": "DaBoii, born on August 14, 1997, is a former member of rap collective SOB X RBE and went to school with another SOB member Slimmy B."
  },
  {
    "Artist Name": "Ca7riel & Paco Amoroso",
    "Image Path": "artist_images\\Ca7riel  Paco Amoroso.jpg",
    "Artist Description": "Ca7riel & Paco Amoroso son un dúo de artistas argentinos dedicados al pop experimental, formados en Buenos Aires en 2016. Sus discos se caracterizan por combinar géneros musicales variados como el trap, el rock, la música electrónica y el reggaetón, lo que les da un sonido innovador y fresco."
  }
]
