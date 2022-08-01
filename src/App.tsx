import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Routes/Home';
import Search from './Routes/Search';
import Tv from './Routes/Tv';
import Header from './Components/Header';
import styled from 'styled-components';

// 영화, TV 공통 사용 Style
export const Wrapper = styled.div`
	background: black;
`;

// useQuery로 데이터 받아올 때 Loading 처리
export const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

// 메인 배경 Visual
export const Visual = styled.div<{ bgphoto: string }>`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px;
	background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
		url(${(props) => props.bgphoto});
	background-position: center center;
	background-size: cover;
`;

// 배경 Visual Title
export const VisualTitle = styled.h1`
	font-size: 62px;
	font-weight: bold;
	@media screen and (max-width: 1000px) {
		font-size: 48px;
	}
	@media screen and (max-width: 500px) {
		font-size: 32px;
	}
	margin-bottom: 20px;
`;

// 배경 Visual 상세
export const VisualOverview = styled.p`
	font-size: 24px;
	line-height: 32px;
	width: 50%;
	@media screen and (max-width: 1000px) {
		width: 100%;
		font-size: 22px;
		line-height: 26px;
	}
	@media screen and (max-width: 500px) {
		width: 100%;
		font-size: 18px;
		line-height: 24px;
	}
`;

function App() {
	return (
		<BrowserRouter>
			{/* <BrowserRouter basename={process.env.PUBLIC_URL}>			 */}
			<Header />
			<Routes>
				{/*
					** react-router-dom v6 **
					v6에서는 array to path를 지원하지 않음
					Nested Route를 사용 -> 슬라이드 목록을 클릭했을 경우 레이어모달로 확대기능을 구현하기 위함
					*/}

				<Route path='/' element={<Home />} />
				<Route path='/movie/:category/:movieId' element={<Home />} />
				<Route path='/tv' element={<Tv />} />
				<Route path='/tv/:category/:tvId' element={<Tv />} />
				<Route path='/search' element={<Search />} />
				<Route path='/:movieId' element={<Search />} />
				<Route path='/:tvId' element={<Search />} />
				<Route path='/search/:movieId' element={<Search />} />
				<Route path='/search/:tvId' element={<Search />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
