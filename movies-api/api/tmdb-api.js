import fetch from 'node-fetch';

export const getMovies = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    );

    if (!response.ok) {
        let message = "TMDB request failed";
        try {
            const errorJson = await response.json();
            message = errorJson.status_message || message;
        } catch (e) {
            // ignore JSON parse errors
        }
        throw new Error(message);
    }

    return await response.json();
};
