import React, { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // 환경 변수에서 API 키 가져오기
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMovies(data.results); // 영화 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies(); // 함수 호출
  }, []);

  return (
    <div>
      <h1>Popular Movies</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ margin: "20px", width: "200px" }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // 이미지 포스터
              alt={movie.title}
              style={{ width: "100%" }}
            />
            <h2>{movie.title}</h2> {/* 영화 제목 */}
            <p>
              <strong>Rating:</strong> {movie.vote_average} / 10
            </p>{" "}
            {/* 영화 평점 */}
            <p>
              <strong>Overview:</strong> {movie.overview}
            </p>{" "}
            {/* 영화 내용 요약 */}
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>{" "}
            {/* 출시일 */}
            <p>
              <strong>Revenue:</strong> $
              {movie.revenue ? movie.revenue.toLocaleString() : "N/A"}
            </p>{" "}
            {/* 박스오피스 수익 */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
