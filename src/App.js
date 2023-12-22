import { useState, useEffect } from "react";

const MovieCard = (props) => {
  return (
    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-5 col-6 col-xs-12  mb-2 mx-auto">
      <div style={{height: 330, minWidth: 240, maxWidth: 260 }} className="card border">
        <div style={{backgroundImage: `url("${props.poster_img}")`, backgroundSize: 'cover', borderRadius: 5}} className="card-body">

        </div>
      </div>
      <h6 className="card-title mt-2">{props.title}</h6>
      <ul className="list-inline mt-2" style={{fontSize: 15}}>
        <li className="list-inline-item">{props.year_released}<i className="bi bi-dot"></i>{props.type}</li>
      </ul>
    </div>
  )
}

const MovieGrid = (props) => {
  return ( 
    <div className="container">
      <div className="row gap-xxl-5 gap-xl-2 mt-4 mb-4">
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
    <div className="text-center m-5">
        <h1 onClick={refreshPage} id="title"><i class="bi bi-caret-right-square-fill" style={{color: "#143aa2", maxWidth: 390}} onClick={refreshPage}></i>Media search</h1>
    </div>
  )
}

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [submittedTitle, setSubmittedTitle] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [leftHome, setLeftHome] = useState(false);

  
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
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f2f69ae8d5mshfdd830ab97f9bafp1fe8e5jsn86e642c32065',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    };

    fetch(`https://moviesdatabase.p.rapidapi.com/titles/search/title/${submittedTitle}`, options)
	    .then(response => response.json())
	    .then(response => setMovieList(Object.entries(response.results)))
	    .catch(err => console.error(err));

  }, [submittedTitle]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f2f69ae8d5mshfdd830ab97f9bafp1fe8e5jsn86e642c32065',
		    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    };

    fetch(`https://moviesdatabase.p.rapidapi.com/titles/x/upcoming`, options)
	    .then(response => response.json())
	    .then(response => setMovieList(Object.entries(response.results)))
	    .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
        <TitleComponent />
        <div className="container">
          <form>
            <div style={{ maxWidth: 1000 }} className="input-group input-group-lg center-block">
              <input type="search" className="form-control" onChange={handleInput} value={inputValue} placeholder="Type a movie/tv show name..."/>
              <button id="search-button" type="button" className="btn btn-primary" onClick={handleSubmission}><i class="bi bi-search"></i></button>
            </div>
          </form>
        </div>
        <MovieGrid movies={movieList}/>
    </div>
  );
}

export default App;
