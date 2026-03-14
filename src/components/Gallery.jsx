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

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">

      <input
        type="text"
        placeholder="Search by author..."
        className="border p-2 w-full mb-6 rounded"
        onChange={handleSearch}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

  {filteredPhotos.length === 0 ? (
    <p className="text-center col-span-4 text-gray-500">
      No photos found
    </p>
  ) : (
    filteredPhotos.map((photo) => (
      <div key={photo.id} className="border rounded-lg p-2">

        <img
          src={photo.download_url}
          alt={photo.author}
          className="w-full h-40 object-cover"
        />

        <div className="flex justify-between items-center mt-2">

          <p className="font-semibold">{photo.author}</p>

          <button
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
    ))
  )}

</div>
    </div>
  );
}

export default Gallery;