import pickle
import requests
import os

# Get the correct path to the model files
current_dir = os.path.dirname(os.path.abspath(__file__))
model_dir = os.path.join(os.path.dirname(current_dir), "model")

# Load pre-computed data
movies = pickle.load(open(os.path.join(model_dir, "movies_list.pkl"), "rb"))
similarity = pickle.load(open(os.path.join(model_dir, "similarity.pkl"), "rb"))

TMDB_API_KEY = "8265bd1679663a7ea12ac168da84d2e8"

def fetch_poster(movie_id):
    try:
        url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={TMDB_API_KEY}&language=en-US"
        response = requests.get(url, timeout=10)
        response.raise_for_status()  # Raise exception for bad status codes
        data = response.json()
        poster_path = data.get("poster_path")
        if poster_path:
            return f"https://image.tmdb.org/t/p/w500{poster_path}"
        return None
    except requests.exceptions.RequestException as e:
        print(f"Error fetching poster for movie ID {movie_id}: {str(e)}")
        return None

def recommend(movie_name, top_k=5):
    try:
        idx = movies[movies["title"] == movie_name].index[0]
    except IndexError:
        return []

    distances = list(enumerate(similarity[idx]))
    distances = sorted(distances, key=lambda x: x[1], reverse=True)[1: top_k + 1]

    recommendations = []
    for i, _ in distances:
        movie_id = movies.iloc[i].movie_id
        recommendations.append({
            "title": movies.iloc[i].title,
            "poster": fetch_poster(movie_id),
            "movie_id": int(movie_id)
        })
    return recommendations
