import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Detail from "./Detail";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // 환경 변수에서 API 키 가져오기
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

function App() {
  //movies 의 상태를 초기화 후 영화 데이터를 저장할 상태를 정의함
  const [movies, setMovies] = useState([]);

  // 컴포넌트 렌더링 
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // 1. API 에서 뎅터를 가져옴
        const response = await fetch(API_URL);
        // 2. 응답 데이터를 json 형식으로 변환하해서 data에 담음
        const data = await response.json();
        // 3. data를 movies 상태에 저장
        setMovies(data.results); // 영화 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies(); // 함수 호출
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/"
        element={
          <div>
      <h1>Popular Movies</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movies.map((movie) => (
          // 영화를 key 값에 따라 렌더링
          // movies 는 API 에서 받아온 영화 데이터 배열
          // movie 는 영화 객체로 map() 함수가 movies 배열을 각 항목을 순회하면서 넘겨주는 값.

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
              <strong>Release Date:</strong> {movie.release_date}
            </p>{" "}
            {/* 출시일 */}
            <Link to={`/movie/${movie.id}`}>
              <button>상세보기</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
        }
        />
        <Route path="/movie/:id" element={<Detail />} />

      </Routes>
    </Router>
    
  );
}

export default App;
