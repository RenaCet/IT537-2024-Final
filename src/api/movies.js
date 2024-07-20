import axios from 'axios';

const API_KEY = 'your_tmdb_api_key'; // Replace with your TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
      },
    });
    console.log('API response:', response); // Add this line to check the response
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};
