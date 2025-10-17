import os
import numpy as np
from dotenv import load_dotenv
from supabase import create_client, Client
from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.recommender import recommend
from utils.recommender import movies
from langchain_community.embeddings import HuggingFaceEmbeddings


load_dotenv()

# Initialize Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# Initialize HuggingFace Embeddings
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

app = Flask(__name__)
CORS(app)  # allow requests from Next.js

@app.route("/")
def home():
    return {"message": "Movie recommender API is running"}

@app.route("/recommend", methods=["POST"])
def get_recommendations():
    data = request.get_json()
    movie = data.get("movie")
    if not movie:
        return jsonify({"error": "Movie name required"}), 400
    results = recommend(movie)
    return jsonify({"recommendations": results})

# @app.route("/api/users/upsert", methods=["POST"])
# def upsert_user():
#     data = request.json
#     clerk_id = data.get("id")
#     email = data.get("email")
#     name = data.get("name")

#     print("Received:", data)
#     return jsonify({"message": "User upserted successfully!"})

#     if not clerk_id:
#         return jsonify({"error": "Missing user id"}), 400

#     res = supabase.table("users").upsert({
#         "id": clerk_id,
#         "email": email,
#         "name": name
#     }).execute()

#     if res.error:
#         return jsonify({"error": res.error.message}), 400

#     return jsonify({"success": True, "data": res.data})

@app.route('/movie/<int:movie_id>')
def get_movie(movie_id):
    movie = movies[movies['id'] == movie_id].to_dict(orient='records')
    if not movie:
        return jsonify({'error': 'Movie not found'}), 404
    return jsonify(movie[0])

@app.route('/watchlist/<string:user_id>')
def get_watchlist(user_id):
    try:
        res = supabase.table("watchlists").select("*").eq("user_id", user_id).execute()
        if res.error:
            return jsonify({"error": res.error.message}), 400
        return jsonify({"data": res.data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/movies', methods=['GET'])
def list_movies():
    try:
        # Expect movies DataFrame with columns including 'title' and 'movie_id'
        data = movies[["title", "movie_id"]].to_dict(orient='records')
        # Normalize keys
        data = [{"title": m["title"], "movie_id": int(m["movie_id"])} for m in data]
        return jsonify({"data": data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500



# @app.route("/generate-embeddings", methods=["POST"])
# def generate_embeddings():
#     # Fetch all movies that don’t have embeddings yet
#     result = supabase.table("movies").select("id, overview").execute()
#     movies = result.data
#     # movies = supabase.table("movies").select("id, name, overview").is_("embedding", None).execute().data


#     for m in movies:
#         if not m["overview"]:
#             continue
#         vector = embeddings.embed_query(m["overview"])
#         supabase.table("movies").update({"embedding": vector}).eq("id", m["id"]).execute()

#     return jsonify({"message": "Embeddings generated successfully!"})


@app.route("/generate-embeddings", methods=["POST"])
def generate_embeddings():
    try:
        # ✅ Fetch only movies with NULL embeddings
        result = (
            supabase.table("movies")
            .select("id, title, overview")
            .is_("embedding", None)
            .execute()
        )
        movies = result.data

        if not movies:
            return jsonify({"message": "✅ All movies already have embeddings!"})

        print(f"🎬 Found {len(movies)} movies missing embeddings")

        # for m in movies:
        #     # overview = m.get("overview", "")

        #     # # ✅ Skip empty or invalid text
        #     # if not overview.strip():
        #     #     print(f"⚠️ Skipping '{m.get('title', 'Unknown')}' (no overview text)")
        #     #     continue

        #     # # ✅ Trim to prevent overly long text errors
        #     # overview = overview[:2000]

        #     try:
        #         # Generate embedding vector
        #         vector = embeddings.embed_query(overview)

        #         # ✅ Update Supabase with new embedding
        #         supabase.table("movies").update({"embedding": vector}).eq("id", m["id"]).execute()

        #         print(f"✅ Embedded: {m.get('title', 'Unknown')}")

        #     except Exception as e:
        #         print(f"❌ Failed for {m.get('title', 'Unknown')}: {e}")
        #         time.sleep(1)  # Prevent rate-limit issues
        for m in movies:
            overview = m.get("overview")

            # Skip if overview is missing or empty
            if not overview:
                continue

            # ✅ Clean and trim safely
            overview = overview.strip()[:2000]

            # Generate embeddings
            vector = embeddings.embed_query(overview)
            supabase.table("movies").update({"embedding": vector}).eq("id", m["id"]).execute()


        return jsonify({"message": "✅ Embeddings generated successfully!"})

    except Exception as e:
        print(f"🚨 Error during embedding generation: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/recommend/vector", methods=["POST"])
def recommend_vector_based():
    data = request.get_json()
    user_input = data.get("query", "")

    if not user_input:
        return jsonify({"error": "Query text required"}), 400

    # 1. Get user input embedding
    query_vector = embeddings.embed_query(user_input)

    # 2. Perform vector similarity search in Supabase
    response = supabase.rpc("match_movies", {
        "query_embedding": query_vector,
        "match_threshold": 0.3,  # higher = stricter
        "match_count": 5
    }).execute()

    return jsonify(response.data)





if __name__ == "__main__":
    app.run(debug=True)
