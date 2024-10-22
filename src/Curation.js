import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function Curation() {
  const { category } = useParams(); // URL에서 카테고리 정보 가져옴
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      let apiUrl = "";

        // 카테고리별 API URL 설정
        switch (category) {
            case "now_playing":
            apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=${page}`;
            setTitle("현재 상영작");
            break;
            case "popular":
            apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`;
            setTitle("인기작");
            break;
            case "top_rated":
            apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=${page}`;
            setTitle("최고 평가작");
            break;
            case "upcoming":
            apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=${page}`;
            setTitle("개봉 예정작");
            break;
            default:
            break;
        }


      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setMovies((prevMovies) => [...prevMovies,...data.results]); // 영화 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [category, page]);

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
  };


  return (
    <div>
      <h1>{title}</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ margin: "20px", width: "200px" }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // 이미지 포스터
              alt={movie.title}
              style={{ width: "100%" }}
            />
            <h3>{movie.title}</h3> {/* 영화 제목 */}
            <p>평점: {movie.vote_average} / 10</p> {/* 영화 평점 */}
          </div>
        ))}
      </div>
      {/* 로딩 상태 */}
      {loading && <p>로딩 중...</p>}

      {/* 더보기 버튼 */}
      {!loading && (
        <button onClick={loadMoreMovies} style={{ marginTop: "20px" }}>
          더보기
        </button>
      )}

      {/* 홈으로 돌아가기 버튼 */}
      <div style={{ marginTop: "20px" }}>
        <Link to="/">
          <button>홈으로 돌아가기</button>
        </Link>
      </div>  


    </div>
  );
}

export default Curation;
