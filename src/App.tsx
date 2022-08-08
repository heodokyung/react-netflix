import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Routes/Home';
import styled from 'styled-components';
import TvShowView from './Routes/TvShowView';
import HeaderView from './Components/HeaderView';
import MovieView from './Routes/MovieView';
import Search from './Routes/Search';
import FooterView from './Components/FooterView';

// 영화, TV 공통 사용 Style
export const Wrapper = styled.div`
	background: black;
	padding-top: 73px;
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
	height: 70vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px;
	background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
		url(${(props) => props.bgphoto});
	background-position: top center;
	background-size: cover;
`;

// 배경 Visual Title
export const VisualTitle = styled.h1`
	font-size: 62px;
	font-weight: bold;
	@media screen and (max-width: 1024px) {
		font-size: 48px;
	}
	margin-bottom: 20px;
`;

// 배경 Visual 상세
export const VisualOverview = styled.p`
	font-size: 24px;
	line-height: 32px;
	width: 50%;
	@media screen and (max-width: 1024px) {
		width: 100%;
		font-size: 22px;
		line-height: 26px;
	}
`;

function App() {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<HeaderView />
			<Routes>
				<Route path='/' element={<Home />} />

				<Route path='/movie/:category' element={<MovieView />}>
					<Route path='/movie/:category/:movieId' element={<MovieView />} />
				</Route>

				<Route path='/tv/:category/' element={<TvShowView />}>
					<Route path='/tv/:category/:tvId' element={<TvShowView />} />
				</Route>

				<Route path='/search' element={<Search />}>
					<Route path='/search/:movieId' element={<Search />} />
					<Route path='/search/:tvId' element={<Search />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
