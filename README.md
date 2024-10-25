# Movie Community 🎬

## 📌 프로젝트 소개

### 기획 의도

- **영화에 대한 커뮤니티를 형성하고 정보 공유와 취향 기반 추천 기능 제공**
  - **문제 정의**
    1) 영화에 대한 관심이 높아지면서 사용자들이 영화 추천 및 정보를 교환할 수 있는 커뮤니티에 대한 수요가 증가하고 있습니다.
    2) 영화 정보는 방대한데 반해, 각 영화에 대한 개인화된 평가 및 추천 기능을 제공하는 커뮤니티 플랫폼이 부족합니다.
  - **해결 방안**
    1) 사용자들이 영화를 평가하고 리뷰를 작성하며 영화 관련 정보를 공유할 수 있는 커뮤니티를 구성하고자 합니다.
    2) 파이어베이스와 리액트를 기반으로 영화 데이터를 받아와 사용자들이 원하는 정보를 제공하며, 사용자 데이터에 기반한 추천 시스템을 통해 개인화된 영화 추천 기능을 제공합니다.
    3) 이를 통해 사용자 간의 상호작용을 유도하고 영화 커뮤니티의 활성화를 도모합니다.

### 기대 효과

- **기술적 측면**
  1) React와 Firebase를 통한 SPA 구조의 영화 정보 공유 커뮤니티 제공
      - 파이어베이스의 Realtime Database와 Firestore를 통해 빠른 데이터 접근과 실시간 데이터 동기화가 가능합니다.
      - 이를 통해 새로운 영화 정보와 사용자 리뷰를 실시간으로 업데이트하고, 영화에 대한 사용자의 즉각적인 피드백을 반영할 수 있습니다.
  2) 영화 추천 기능을 통해 사용자 경험 향상
      - 각 사용자들의 평가와 시청 기록을 바탕으로 개인화된 추천 모델을 구축하여 영화 감상 경험을 극대화할 수 있습니다.
  
- **경제적 측면**
  1) 영화 관련 마케팅 및 콘텐츠 광고로의 확장 가능성
      - 커뮤니티가 성장하면, 영화 홍보 및 예고편 광고 등 영화 마케팅을 위한 플랫폼으로 활용할 수 있으며, 영화 산업에 경제적 기여를 할 수 있습니다.
  
- **사회적 측면**
  1) 영화에 대한 공감대 형성과 커뮤니티 형성
      - 영화에 대한 정보를 공유하고 토론함으로써 사용자 간의 공감대를 형성하고, 다양한 영화 관람 취향을 공유할 수 있는 장을 제공합니다.

### 주요 사용 기술

- #### 개발 환경
  - **Client**
    - ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Firebase](https://img.shields.io/badge/firebase-%23FFCA28.svg?style=for-the-badge&logo=firebase&logoColor=black)
    - 사용자 인터페이스와 실시간 데이터 동기화를 위해 리액트와 파이어베이스를 사용하였습니다.

  - **Server**
    - ![Firebase Functions](https://img.shields.io/badge/firebase%20functions-%23FFCA28.svg?style=for-the-badge&logo=firebase&logoColor=black)
    - 서버리스 아키텍처 기반으로 Firebase Functions를 사용하여 서버 부담을 최소화하고, 필요한 기능을 즉시 실행할 수 있는 서버 환경을 구축하였습니다.

- #### 개발 언어
    - ![JavaScript](https://img.shields.io/badge/javascript-F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
    - JavaScript와 CSS를 사용하여 사용자 인터페이스와 기능을 구현하였습니다.

### 주요 기능

- **영화 정보 조회**
  - TMDB API와 연동하여 최신 영화 정보를 불러오고, 사용자가 원하는 영화를 검색할 수 있습니다.

- **커뮤니티 피드백 제공**
  - 각 영화에 대해 사용자 리뷰 작성 및 별점 평가 기능을 제공합니다.
  - 사용자 간의 상호작용을 촉진하기 위해 영화 리뷰에 댓글을 달 수 있는 기능을 제공합니다.

- **추천 기능**
  - 사용자의 평가 및 관심 장르에 기반한 영화 추천 시스템을 제공합니다.
  - 파이어베이스의 데이터베이스와 연동하여 사용자 별 추천 리스트를 제공합니다.

### 독창성 / 차별성

- **영화 평가 기반 추천**
  - 영화에 대한 개인의 선호도를 반영한 추천 기능을 제공하여, 사용자 경험을 개선합니다.

- **실시간 커뮤니티 활동**
  - 실시간으로 영화 평가 및 리뷰를 공유할 수 있는 환경을 제공하여, 사용자 간의 활발한 상호작용을 촉진합니다.

---

### 프로젝트 실행 방법

1. **클론하기**
   ```bash
   git clone https://github.com/your-repo/movie-community.git
   cd movie-community
   
2. **env파일 추가하기**
  - .env 파일을 생성하고 Firebase 설정 및 TMDB API 키를 추가합니다.
 
3. **프로젝트 빌드 및 실행**
    ```bash
    npm install
    npm start

4. **v파이어베이스 설정**
  - Firebase Console에서 프로젝트를 생성하고 필요한 Firestore와 Storage 서비스를 설정합니다.

