import { useState, useEffect } from "react";

const MovieCard = (props) => {
  return (
    <div className="mb-2 p-3 movie-card-size">
      <div className="card border">
        <div style={{backgroundImage: `url("${props.poster_img}")`, backgroundSize: 'cover', borderRadius: 5}} className="card-body">

        </div>
      </div>
      <h6 className="card-title mt-2 text-xl font-medium">{props.title}</h6>
      <div className="flex justify-content-between mt-2" style={{fontSize: 15}}>
        <div className="font-light">{props.year_released}<i className="px-2 bi bi-dot"></i>136m</div>
        <div className="max-w-[50%] round-border">{props.type}</div>
      </div>
    </div>
  )
}

const MovieGrid = (props) => {
  return ( 
    <div className="container  d-flex justify-content-center align-items-center">
      <div className="row gap-xxl-5 gap-xl-2 mt-4 mb-4 d-flex justify-content-center align-items-center">
        {props.movies.map(movie => {
          if(movie[1].primaryImage != null) {
            return  <MovieCard poster_img={movie[1].primaryImage["url"]} title={movie[1].titleText["text"].toString()} year_released={movie[1].releaseYear == null ? "N/A" : movie[1].releaseYear["year"].toString()} type={movie[1].titleType == null ? "N/A" : movie[1].titleType["text"].toString()} />
          } else {
            return  <MovieCard poster_img="https://img.freepik.com/free-vector/poster-cinema-chair-camera_603843-2752.jpg" title={movie[1].titleText["text"].toString()} year_released={movie[1].releaseYear == null ? "N/A" : movie[1].releaseYear["year"].toString()} type={movie[1].titleType == null ? "N/A" : movie[1].titleType["text"].toString()} />
          }
        })}
      </div>
    </div>
  );
}

const TitleComponent = () => {

  const refreshPage = () => {
    window.location.reload(false);
  }

  return(
    <div className="text-center m-5 ">
        <h1 onClick={refreshPage} id="title" className="text-5xl font-bold"><i class="bi bi-caret-right-square-fill" style={{color: "#143aa2"}} onClick={refreshPage}></i> Media search</h1>
    </div>
  )
}

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [submittedTitle, setSubmittedTitle] = useState("");
  const [movieList, setMovieList] = useState([]);
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f2f69ae8d5mshfdd830ab97f9bafp1fe8e5jsn86e642c32065',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };
  
  const handleInput = (event) => {
    setInputValue(event.target.value);
  }

  const handleSubmission = () => {
    if(inputValue !== ""){
      setSubmittedTitle(inputValue);
    } else {
      alert("Please type in a title");
    }
  }


  useEffect(() => {
    fetch(`https://moviesdatabase.p.rapidapi.com/titles/search/title/${submittedTitle}`, options)
	    .then(response => response.json())
	    .then(response => setMovieList(Object.entries(response.results)))
	    .catch(err => console.error(err));

  }, [submittedTitle]);

  
  useEffect(() => {
    fetch(`https://moviesdatabase.p.rapidapi.com/titles/x/upcoming`, options)
	    .then(response => response.json())
	    .then(response => setMovieList(Object.entries(response.results)))
	    .catch(err => console.error(err));
  }, []); 
  

  const setMovieListData = (url) => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f2f69ae8d5mshfdd830ab97f9bafp1fe8e5jsn86e642c32065',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    };

    fetch(url, options)
      .then(response => response.json())
      .then(response => setMovieList(Object.entries(response.results)))
      .catch(err => console.log(err));

      console.log(movieList.length);
  };

  return (
    <div className=" ">
      <div className="upper-container ">
        <TitleComponent />
        <div className="d-flex justify-content-center align-items-center">
          <form className="m-3 min-w-[70%]">   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
              <input type="search" id="default-search" className="seearch-text block w-full p-4 ps-10  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Movies, TV" onChange={handleInput} value={inputValue} required/>
              <button id="search-button" type="button" className="btn btn-primary text-white absolute end-2.5 bottom-2.5 mb-2 me-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmission}><i class="bi bi-search"></i></button>
            </div>
          </form>
        </div>
        <div className="flex justify-content-center align-items-center xs:flex-col sm:flex-row sm:min-w-[80%] p-2 m-[20px] ">
          <div>
            <button type="button" className=" text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2" onClick={() => setMovieListData(`https://moviesdatabase.p.rapidapi.com/titles?list=most_pop_series`)}>Most Popular Shows</button>
          </div>
          <div>
            <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2" onClick={() => setMovieListData(`https://moviesdatabase.p.rapidapi.com/titles?list=top_boxoffice_200`)}>Top Box Office All Time</button>
          </div>
          <div>
            <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2" onClick={() => setMovieListData(`https://moviesdatabase.p.rapidapi.com/titles?list=top_boxoffice_last_weekend_10`) }>Top Box Office Last Weekend</button>
          </div>
          <div>
            <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2" onClick={() => setMovieListData(`https://moviesdatabase.p.rapidapi.com/titles?list=top_rated_series_250`)}>Highest Rated Shows</button>
          </div>
          <div>
            <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2" onClick={() => setMovieListData(`https://moviesdatabase.p.rapidapi.com/titles?list=top_rated_lowest_100`)}>Lowest Rated Movies</button>
          </div>
        </div>
        </div>
        <div className="container">
          <MovieGrid movies={movieList}/>
        </div>
    </div>
  );
}

export default App;
