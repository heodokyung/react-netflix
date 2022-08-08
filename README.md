
<div align="center"><img src="https://user-images.githubusercontent.com/50813871/182531598-d2c4bc3b-0823-4ba5-9e4b-d173bac271db.png" alt="netflix Logo" width="270px" height="auto"></div>

# React - Netflix (React 넷플릭스)
## 사이트 설명
OTT의 대표 사이트인 Netflix의 사이트를 React로 구현하였습니다. Axios를 이용해 The Movie DB로부터 영화 상세정보를 가져옵니다.
영화 목록과 TvShow 목록을 사용자가 선택하여 인기 작품, 현재 상영중, 평점높은 콘텐츠를 확인할 수 있습니다.
슬라이드 목록을 클릭하면 포스터와 제목, 개봉일, 평점, 설명을 확인할 수 있습니다.
검색창을 통해 원하는 영화, TvShow도 상세히 검색할 수 있습니다.

![1](https://user-images.githubusercontent.com/50813871/183362112-b397f506-e10a-411c-a697-6b7ee1641be6.gif)
![fdfd](https://user-images.githubusercontent.com/50813871/183362466-cc08da3a-ce6a-4118-bb86-2812844b4489.gif)



## 적용기술
- React-query: React-query를 적용하여 영화 리스트, 상세 정보를 조회합니다.
- TypeScript: 보다 정적인 코드(에러 방지)를 위해 Typescript를 적용하였습니다.
- react-hook-form: 검색 Field의 값을 핸들링 합니다.
- styled-reset: 공통 Reset CSS 코드를 위해 적용했습니다.
- styled-components: 사이트의 스타일은 CSS-IN-JS로 적용하였습니다.
- axios: axios로 API 정보를 가져와서 return 합니다.
- react-dom: 페이지 이동을 위해 사용하였습니다.
- infinityScroll을 적용하여 스크롤을 하면 추가 데이터를 불러옵니다.


### 추후 개선사항 Check list
- [x] react-helmet: 상세 사이트의 이동시 Title값을 상세 정보에 맞게 변경합니다.
- [x] react-query: 개선
- [x] 코드 리팩토링
- [ ] API KEY: .env를 통한 암호화
- [ ] 목록 상세 : Swiper 적용하기

## 사이트 바로가기
<a href="https://heodokyung.github.io/react-netflix/" target="_blank">[토이프로젝트]React Netflix</a>


### npm i
### npm start
#### npm audit fix --force
