import requests
import os
from time import sleep
from supabase import create_client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Supabase setup
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# TMDB API setup
TMDB_API_KEY = os.getenv("TMDB_API_KEY")
TMDB_BASE_URL = "https://api.themoviedb.org/3/movie"  # <- MUST be BEFORE fetch_poster()

# Fetch movies from Supabase
movies = supabase.table("movies").select("id, title").execute().data

# Function to fetch poster
def fetch_poster(movie_id):
    url = f"{TMDB_BASE_URL}/{movie_id}?api_key={TMDB_API_KEY}&language=en-US"
    res = requests.get(url)
    if res.status_code == 200:
        data = res.json()
        return data.get("poster_path")  # Example: "/abc123.jpg"
    else:
        print(f"Failed to fetch {movie_id}: {res.status_code}")
        return None

# Loop to update all movies
for movie in movies:
    poster_path = fetch_poster(movie["id"])
    if poster_path:
        supabase.table("movies").update({"poster_path": poster_path}).eq("id", movie["id"]).execute()
        print(f"Updated {movie['title']} with poster {poster_path}")
    else:
        print(f"No poster found for {movie['title']}")
    sleep(0.25)  # avoid hitting TMDB rate limits
