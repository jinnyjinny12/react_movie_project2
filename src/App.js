import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Detail from "./Detail";
import Movie from "./component/Movie";  // Movie 컴포넌트 가져오기
import Curation from "./component/Curation";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function App() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const nowPlayingResponse = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR`
      );
      const popularResponse = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR`
      );
      const upcomingResponse = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko-KR`
      );
      const topRatedResponse = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=ko-KR`
      );
      const nowPlayingData = await nowPlayingResponse.json();
      const popularData = await popularResponse.json();
      const upcomingData = await upcomingResponse.json();
      const topRatedData = await topRatedResponse.json();


      // 중복제거
      const movieIds = new Set();
      const filterUniqueMovies = (movies) =>
        movies.filter((movie)=>{
          if(!movieIds.has(movie.id)) {
            movieIds.add(movie.id);
            return true;
          }
          return false;
        });

     // 중복을 제거한 결과를 상태에 저장
     setNowPlaying(filterUniqueMovies(nowPlayingData.results || []));
     setPopular(filterUniqueMovies(popularData.results || []));
     setUpcoming(filterUniqueMovies(upcomingData.results || []));
     setTopRated(filterUniqueMovies(topRatedData.results || []));
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);


  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            loading ? (
              <div>로딩 중...</div>
            ) : (
            <div>
            {/* 각 카테고리별로 타이틀과 더보기 버튼 추가 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>현재 상영작</h2>
              <Link to="/curation/now_playing">
                <button>더보기</button>
              </Link>
            </div>
            <Movie movies={nowPlaying} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>인기작</h2>
              <Link to="/curation/popular">
                <button>더보기</button>
              </Link>
            </div>
            <Movie movies={popular} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>최고 평가작</h2>
              <Link to="/curation/top_rated">
                <button>더보기</button>
              </Link>
            </div>
            <Movie movies={topRated} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>개봉 예정작</h2>
              <Link to="/curation/upcoming">
                <button>더보기</button>
              </Link>
            </div>
            <Movie movies={upcoming} />
          </div>
        )
          }
        />
        <Route path="/movie/:id" element={<Detail />} />
        <Route path="/curation/:category" element={<Curation />} />  {/* Curation 페이지 경로 설정 */}
      </Routes>
    </Router>
  );
}

export default App;
