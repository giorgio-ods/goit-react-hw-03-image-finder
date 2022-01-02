function fetchPix(searchQuery, pages) {
  const key = "23373005-f6518b9f8c0fff9e8298e5fbb";

  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${pages}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Error`));
  });
}

const api = {
  fetchPix,
};

export default api;
