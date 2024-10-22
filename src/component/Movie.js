import React from "react";
import { Link } from "react-router-dom";

const Movie = ({ movies }) => {
    return(
        <section>
    
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {movies.slice(0, 7).map((movie) => (
                    <div key={movie.id} style={{margin: "20px", width: "200px"}}>
                    <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // 이미지 포스터
                    alt={movie.title}
                    style={{ width: "100%" }}
                    />
                    <h3>{movie.title}</h3>
                    <p>평점: {movie.vote_average} / 10</p>
                    <Link to={`/movie/${movie.id}`}>
                        <button>상세보기</button>
                    </Link>

                    </div>
                ))}
            </div>


        </section>
    )
}

export default Movie;