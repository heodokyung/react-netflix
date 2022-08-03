# React - Netflix (React 넷플릭스)
<div align="center"><img src="https://user-images.githubusercontent.com/50813871/182531598-d2c4bc3b-0823-4ba5-9e4b-d173bac271db.png" alt="netflix Logo" width="270px" height="auto"></div>


## 사이트 설명
OTT의 대표 사이트인 Netflix의 사이트를 React로 구현하였습니다.
영화 목록과 TvShow 목록을 사용자가 선태하여 확인할 수 있고 검색창을 통해 원하는 영화, TvShow도 상세히 검색할 수 있습니다.

## 적용기술
- React-query: React-query를 적용하여 영화 리스트, 상세 정보를 조회합니다.
- TypeScript: 보다 정적인 코드(에러 방지)를 위해 Typescript를 적용하였습니다.
- react-hook-form: 검색 Field의 값을 핸들링 합니다.
- styled-reset: 공통 Reset CSS 코드를 위해 적용했습니다.
- styled-components: 사이트의 스타일은 CSS-IN-JS로 적용하였습니다.
- axios: axios로 API 정보를 가져와서 return 합니다.
- react-dom: 페이지 이동을 위해 사용하였습니다.


### 추후 개선사항 Check list
- [ ] react-helmet: 상세 사이트의 이동시 Title값을 상세 정보에 맞게 변경합니다.
- [ ] Slide 컴포넌트: 공통화(Movie, TvShow, 검색)
- [ ] react-query: Infinite Queries 적용 (검색)
- [ ] API KEY: .env를 통한 암호화
- [ ] 코드 리팩토링

## 사이트 바로가기
<a href="https://heodokyung.github.io/react-netflix/" target="_blank">[토이프로젝트]암호화폐 코인시세 및 정보 사이트 만들기</a>


### npm i
### npm start
#### npm audit fix --force
