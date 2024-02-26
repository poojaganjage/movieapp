import {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import MovieList from "./components/MovieList";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";
import './App.css';

function App() {
  const[movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async(searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=1e837370`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if(responseJson.Search) {
      setMovies(responseJson.Search);
    }
  }

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourite'));
    if(movieFavourites) {
      setMovies(movieFavourites);
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (movies) => {
    localStorage.setItem('react-movie-app-favourite', JSON.stringify(movies))
  }

  const addFavouriteMovies = (movies) => {
    const newFavouriteList = [...favourites, movies];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  const removeFavouriteMovies = (movies) => {
    const newFavouriteList = favourites.filter((favourite) => {
      return favourite.imdbID !== movies.imdbID;
    });
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading={"Movies"} />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList 
          movies={movies}
          handleFavouritesClick={addFavouriteMovies}
          favouriteComponent={<AddFavourites />}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading={"Favourites"} />
      </div>
      <div className="row">
        <MovieList 
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovies}
          favouriteComponent={<RemoveFavourites />}
        />
      </div>
    </div>
  );
}
export default App;
