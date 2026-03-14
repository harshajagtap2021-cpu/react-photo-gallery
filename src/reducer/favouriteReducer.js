export const favouriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAV":
      const added = [...state, action.payload];
      localStorage.setItem("favourites", JSON.stringify(added));
      return added;

    case "REMOVE_FAV":
      const removed = state.filter((p) => p.id !== action.payload.id);
      localStorage.setItem("favourites", JSON.stringify(removed));
      return removed;

    default:
      return state;
  }
};