import { useState, useMemo, useCallback, useReducer } from "react";
import { favouriteReducer } from "../reducer/favouriteReducer";
import useFetchPhotos from "../hooks/useFetchPhotos";

function Gallery() {
  const { photos, loading, error } = useFetchPhotos();

  const initialFav = JSON.parse(localStorage.getItem("favourites")) || [];
  const [favourites, dispatch] = useReducer(favouriteReducer, initialFav);

  const [search, setSearch] = useState("");

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [photos, search]);

  if (loading)
  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="px-6">

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-10">
        <input
          type="text"
          placeholder="🔍 Search by author..."
          className="w-full px-5 py-3 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          onChange={handleSearch}
        />
      </div>

      {/* If no photo found */}
      {filteredPhotos.length === 0 ? (
        <p className="text-center text-2xl font-bold text-gray-400 mt-10">
          📷 Photo Not Found
        </p>
      ) : (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >

              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={`https://picsum.photos/id/${photo.id}/400/300`}
                  alt={photo.author}
                  className="w-full h-48 object-cover hover:scale-110 transition duration-500"
                />
              </div>

              {/* Author + Heart */}
              <div className="flex justify-between items-center p-4">

                <p className="text-gray-900 font-bold text-base tracking-wide">
                  {photo.author}
                </p>

                <button
                  className="text-xl transition transform hover:scale-125"
                  onClick={() =>
                    dispatch({
                      type: favourites.some((fav) => fav.id === photo.id)
                        ? "REMOVE_FAV"
                        : "ADD_FAV",
                      payload: photo,
                    })
                  }
                >
                  {favourites.some((fav) => fav.id === photo.id) ? "❤️" : "🤍"}
                </button>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Gallery;