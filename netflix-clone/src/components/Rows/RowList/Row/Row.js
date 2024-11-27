import React, { useEffect, useState } from 'react'
import "./row.css"
import axios from "../../../../utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";



 const Row = ({title,fetchUrl,isLargeRow}) => {
     const [movies,setMovie]=useState([]);
     const [trailerurl,setTrailerurl]=useState ("");
     const base_url = 'https://image.tmdb.org/t/p/original';
    
     useEffect(() => {
      (async () => {
        try {
          const request = await axios.get(fetchUrl);
          setMovie(request.data.results);
        } catch (error) {
          console.log("error", error);
        }
      })();
    }, [fetchUrl]);

  const handleclick =(movie)=>{
    if (trailerurl) {
      setTrailerurl('')
    } else {
      movieTrailer(movie?.title || movie?.name || movie.original_name)
      .then((url)=> {
      console.log(url)
      const urlparams =new URLSearchParams(new URL(url).search)
      console.log(urlparams.get('v'))
      setTrailerurl(urlparams.get('v'));
      })
    }
  }
    const opts = {
      height: "390",
      width: "100%",
      playerVars: {
        autoplay: 1,
      },
  }
  return (
    <div className='row'> 
      <h1>{title}</h1>
      <div className='row_posters'>
        {movies?.map((movie, index) => (
          <img
            onClick={() => handleclick(movie)}
            key={index}
            src={`${base_url}${isLargeRow ? movie.backdrop_path || movie.poster_path : movie.poster_path}`}
            alt={movie.name || movie.title}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
          />
        ))}
      </div>
      <div style={{ padding: '40px' }}>
        {trailerurl && <YouTube videoId={trailerurl} opts={opts} />}
      </div>
    </div>
  );
}

  // return (
  //   <div className='row'> 
  //     <h1>{title}</h1>
  //     <div className='row_posters'>
  //       {movies?.map((movie, index) => (
  //         <img
  //           onClick={() => handleClick(movie)}
  //           key={index}
  //           src={`${base_url}${isLargeRow ? movie.backdrop_path || movie.poster_path : movie.poster_path}`}
  //           alt={movie.name || movie.title}
  //           className={`row_poster ${isLargeRow && "row_posterLarge"}`}
  //         />
  //       ))}
  //     </div>
  //     <div style={{ padding: '40px' }}>
  //       {trailerurl && <YouTube videoId={trailerurl} opts={opts} />}
  //     </div>
  //   </div>
  // );
  
export default Row
