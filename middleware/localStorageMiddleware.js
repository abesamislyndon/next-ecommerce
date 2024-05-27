const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (typeof window !== "undefined") {
    const state = store.getState();
    localStorage.setItem("cart", JSON.stringify(state.cart.cart));
  }
  return result;
};

export default localStorageMiddleware;
