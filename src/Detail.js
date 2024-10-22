import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import countries from "i18n-iso-countries";
import ReactCountryFlag from "react-country-flag";
import Select from "react-select";
// 사용할 언어 설정 (예: 한국어)
countries.registerLocale(require("i18n-iso-countries/langs/ko.json"));

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;


function Detail() {
    const { id } = useParams();  // URL에서 영화 ID를 가져옴
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);  // 비슷한 영화 정보
    const [releaseDates, setReleaseDates] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");  // 선택한 국가 코드
    const [selectedRelease, setSelectedRelease] = useState(null);  // 선택한 국가의 개봉일 및 등급 정보
    const [trailers, setTrailers] = useState([]);
  
    useEffect(() => {
      const fetchMovieDetails = async () => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`);
          const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=ko-KR`);
          const similarResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=ko-KR`);
          const releaseDatesResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${API_KEY}`);
          const videosResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`);

          const data = await response.json();
          const creditsData = await creditsResponse.json();
          const similarData = await similarResponse.json();
          const releaseDatesData = await releaseDatesResponse.json();
          const videosData = await videosResponse.json();

          setMovie(data);
          setCast(creditsData.cast);
          setSimilarMovies(similarData.results);
          setReleaseDates(releaseDatesData.results);
          setTrailers(videosData.results);

        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      };
  
      fetchMovieDetails();
    }, [id]);  // ID가 변경될 때마다 영화 데이터를 다시 가져옴
  
        // 국가 선택 이벤트 핸들러
        const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);  // 선택한 국가 정보 업데이트

        // 선택한 국가의 개봉일과 등급 정보를 찾음
        const countryRelease = releaseDates.find(release => release.iso_3166_1 === selectedOption.value);
        if (countryRelease) {
        setSelectedRelease(countryRelease.release_dates[0]);  // 해당 국가의 개봉일 및 등급 정보 설정
        }
    };

    // 국가 선택을 위한 옵션 생성
    const countryOptions = releaseDates.map((release) => ({
        value: release.iso_3166_1,
        label: (
        <div style={{ display: "flex", alignItems: "center" }}>
            <ReactCountryFlag countryCode={release.iso_3166_1} svg style={{ marginRight: "10px" }} />
            {countries.getName(release.iso_3166_1, "ko")} {/* 국가 이름 */}
        </div>
        )
    }));

    if (!movie) return <div>Loading...</div>;  // 영화 데이터가 로드되지 않으면 로딩 메시지 표시
  
    return (
      <div>
        <h1>{movie.title}</h1> {/* 영화 제목 */}
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <p>{movie.overview}</p> {/* 영화 내용 요약 */}
        <p><strong>Rating:</strong> {movie.vote_average} / 10</p> {/* 영화 평점 */}


      <h2>개봉일 및 등급 선택</h2> 
        {/* 커스텀 국가 선택 드롭다운 */}
        <Select
            options={countryOptions}
            value={selectedCountry}
            onChange={handleCountryChange}
            placeholder="국가를 선택하세요"
        />

        {/* 선택된 국가의 개봉일 및 등급 표시 */}
        {selectedRelease && (
            <div style={{ marginTop: "20px" }}>
            <p>
                <strong>개봉일:</strong> {new Date(selectedRelease.release_date).toLocaleDateString()}
            </p>
            <p>
                <strong>등급:</strong> {selectedRelease.certification || "N/A"}
            </p>
            </div>
        )}

        {/* 출연진 정보 */}
        <h2>Cast</h2>
        <ul>
            {cast.slice(0, 5).map((actor) => (  // 상위 5명의 출연진만 표시
            <li key={actor.cast_id}>
                <p>{actor.name} as {actor.character}</p>
            </li>
            ))}
        </ul>

        
        <h2>Trailers</h2>
            <div>
                {trailers.filter(trailer => trailer.site === "YouTube").slice(0, 3).map((trailer) => (  // 상위 3개의 예고편만 표시
                <div key={trailer.id}>
                    <p>{trailer.name}</p>
                    <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={trailer.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    ></iframe>
                </div>
                ))}
            </div>
 
        
        {/* 비슷한 영화 정보 */}
        <h2>비슷한 영화 추천</h2>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {similarMovies.slice(0, 5).map((movie) => (  // 상위 5개의 비슷한 영화만 표시
            <div key={movie.id} style={{ margin: "20px", width: "200px" }}>
                <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100%" }}
                />
                <p>{movie.title}</p>
            </div>
            ))}
      </div>


      </div>
    );
  }
  
  export default Detail;