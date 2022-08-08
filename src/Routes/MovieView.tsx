import { useEffect, useState } from 'react';
import { Wrapper } from '../App';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { movieApi, IGetMovieDetail } from './../api';
import useInfiniteScroll from './../Components/useInfiniteScroll';
import Loader from './../Components/Loader';
import styled from 'styled-components';
import { Link, useMatch, useLocation } from 'react-router-dom';
import Poster from './../Components/Poster';
import BtnTopScroll from '../Components/BtnTopScroll';
import DetailsView from './../Components/DetailsView';

const Section = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: row;
	max-width: 2400px;
	flex-wrap: wrap;
	@media (max-width: 768px) {
		justify-content: space-between;
	}
`;

const TitleContainer = styled.div`
	margin-top: 90px;
	@media (max-width: 768px) {
		margin-top: 40px;
	}
`;

const TitleContent = styled.div`
	text-align: center;
`;

const Title = styled.h1`
	font-size: 40px;
	color: white;
	margin-bottom: 25px;
	font-weight: bold;
	@media (max-width: 768px) {
		font-size: 30px;
	}
`;

const SubTitle = styled.p`
	font-size: 18px;
	color: gray;
	line-height: 1.5;
	@media (max-width: 768px) {
		font-size: 15px;
	}
`;

const ButtonContainer = styled.div`
	margin: 50px 0 30px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 15px 0;
	box-sizing: border-box;
	@media (max-width: 768px) {
		margin-top: 20px;
	}
`;

const ButtonContent = styled.div`
	display: flex;
	@media (max-width: 768px) {
		justify-content: space-between;
	}
`;

const ButtonLink = styled(Link)<{ current: boolean }>`
	color: white;
	border-bottom: 3px solid
		${(props) => (props.current ? '#E30914' : 'transparent')};
	color: ${(props) => (props.current ? '#E30914' : 'white')};
	margin: 0 15px;
	padding: 10px 10px;
	box-sizing: border-box;
	font-size: 17px;
	font-weight: bold;
	@media (max-width: 768px) {
		margin: 0 5px;
		font-size: 13px;
		font-weight: normal;
	}
`;

const MovieView = () => {
	const page = useInfiniteScroll();
	const [loading, setLoading] = useState(true);
	const moviePopularMatch = useMatch('/movie/popular');
	const movieUpcomingMatch = useMatch('/movie/upcoming');
	const movieTopRatedMatch = useMatch('/movie/topRated');
	const movieNowPlayingMatch = useMatch('/movie/nowPlaying');

	const [nowPlayingInfinite, setNowPlayingInfinite] = useState<
		IGetMovieDetail[]
	>([]);
	const [upcomingInfinite, setUpcomingInfinite] = useState<IGetMovieDetail[]>(
		[],
	);
	const [popularInfinite, setPopularInfinite] = useState<IGetMovieDetail[]>([]);
	const [topRatedInfinite, setTopRatedInfinite] = useState<IGetMovieDetail[]>(
		[],
	);

	// 초기 셋팅 리스트;
	const getMovieList = async () => {
		const {
			data: { results: nowPlayingResult },
		} = await movieApi.nowPlayingInfinite(page);
		setNowPlayingInfinite(nowPlayingResult);

		const {
			data: { results: upcomingResult },
		} = await movieApi.upcomingInfinite(page);
		setUpcomingInfinite(upcomingResult);

		const {
			data: { results: popularResult },
		} = await movieApi.popularInfinite(page);
		setPopularInfinite(popularResult);

		const {
			data: { results: topRatedResult },
		} = await movieApi.topRatedInfinite(page);
		setTopRatedInfinite(topRatedResult);
		setLoading(false);
	};

	useEffect(() => {
		getMovieList();
	}, []);

	// 추가 목록 리스트;
	const getInfiniteApi = async () => {
		if (page !== 1) {
			if (movieNowPlayingMatch) {
				try {
					const {
						data: { results: newNowPlayingMovies },
					} = await movieApi.nowPlayingInfinite(page);
					const totalMovies = [...nowPlayingInfinite, ...newNowPlayingMovies];

					setNowPlayingInfinite(totalMovies);
				} catch (error) {
					console.log(error);
				}
			}
			if (movieUpcomingMatch) {
				try {
					const {
						data: { results: newUpcomingMovies },
					} = await movieApi.upcomingInfinite(page);
					const totalMovies = [...upcomingInfinite, ...newUpcomingMovies];
					setUpcomingInfinite(totalMovies);
				} catch (error) {
					console.log(error);
				}
			}
			if (moviePopularMatch) {
				const {
					data: { results: newPopularMovies },
				} = await movieApi.popularInfinite(page);

				const totalMovies = [...popularInfinite, ...newPopularMovies];
				setPopularInfinite(totalMovies);
			}

			if (movieTopRatedMatch) {
				try {
					const {
						data: { results: newTopRatedMovies },
					} = await movieApi.topRatedInfinite(page);
					const totalMovies = [...topRatedInfinite, ...newTopRatedMovies];
					setTopRatedInfinite(totalMovies);
				} catch (error) {
					console.log(error);
				}
			}
		}
	};

	useEffect(() => {
		getInfiniteApi();
	}, [page]);

	const popupDetailMatch = useMatch(`/movie/:category/:id`);
	const history = useLocation();
	const splitUrl = history.pathname.split('/');
	const detailCategory = splitUrl[splitUrl.length - 2];
	const detailId = splitUrl[splitUrl.length - 1];

	const [title, setTitle] = useState('');
	const [subTitle, setSubTitle] = useState('');

	useEffect(() => {
		if (moviePopularMatch) {
			setTitle('인기 영화');
			setSubTitle(
				'현재 인기 있는 영화 목록을 가져옵니다.<br />영화 목록은 매일 자동 업데이트됩니다.',
			);
		}

		if (movieNowPlayingMatch) {
			setTitle('현재 상영중인 영화');
			setSubTitle(
				'현재 상영중인 영화 목록을 가져옵니다.<br />지정된 날짜 내에서 상영중인 모든 영화를 찾습니다.',
			);
		}

		if (movieUpcomingMatch) {
			setTitle('상영 예정인 영화');
			setSubTitle(
				'현재 상영중인 영화 목록을 가져옵니다.<br />지정된 날짜 내에서 상영중인 모든 영화를 찾습니다.',
			);
		}

		if (movieTopRatedMatch) {
			setTitle('평점높은 영화');
			setSubTitle(
				'모든 영화 중에서 평점이 높은 영화 목록을 가져옵니다.<br />평점이 높은 영화를 기준으로 정렬합니다.',
			);
		}
	});

	return (
		<Wrapper>
			<HelmetProvider>
				<Helmet>
					<title>영화({title}) - 넷플릭스</title>
				</Helmet>
			</HelmetProvider>
			{loading ? (
				<Loader />
			) : (
				<>
					{popupDetailMatch && (
						<DetailsView
							type={'movie'}
							category={detailCategory}
							id={detailId}
						/>
					)}

					<TitleContainer>
						<TitleContent>
							<Title>{title}</Title>
							<SubTitle dangerouslySetInnerHTML={{ __html: subTitle }} />
						</TitleContent>
					</TitleContainer>

					<ButtonContainer>
						<ButtonContent>
							<ButtonLink
								to='/movie/popular'
								current={moviePopularMatch ? true : false}
							>
								인기 영화
							</ButtonLink>
							<ButtonLink
								to='/movie/nowPlaying'
								current={movieNowPlayingMatch ? true : false}
							>
								현재 상영중인 영화
							</ButtonLink>
							<ButtonLink
								to='/movie/upcoming'
								current={movieUpcomingMatch ? true : false}
							>
								상영 예정인 영화
							</ButtonLink>
							<ButtonLink
								to='/movie/topRated'
								current={movieTopRatedMatch ? true : false}
							>
								평점높은 영화
							</ButtonLink>
						</ButtonContent>
					</ButtonContainer>

					{popularInfinite && moviePopularMatch && (
						<Section title={title}>
							{popularInfinite.map((movie) => (
								<Poster
									key={movie.id}
									id={movie.id}
									imageUrl={movie.poster_path}
									title={movie.title}
									rating={movie.vote_average}
									year={movie.release_date ? movie.release_date : ''}
									type={'movie'}
									overview={movie.overview}
									category={'popular'}
								/>
							))}
						</Section>
					)}

					{nowPlayingInfinite && movieNowPlayingMatch && (
						<Section title={title}>
							{nowPlayingInfinite.map((movie) => (
								<Poster
									key={movie.id}
									id={movie.id}
									imageUrl={movie.poster_path}
									title={movie.title}
									rating={movie.vote_average}
									year={movie.release_date ? movie.release_date : ''}
									type={'movie'}
									overview={movie.overview}
									category={'nowPlaying'}
								/>
							))}
						</Section>
					)}

					{upcomingInfinite && movieUpcomingMatch && (
						<Section title={title}>
							{upcomingInfinite.map((movie) => (
								<Poster
									key={movie.id}
									id={movie.id}
									imageUrl={movie.poster_path}
									title={movie.title}
									rating={movie.vote_average}
									year={movie.release_date ? movie.release_date : ''}
									type={'movie'}
									overview={movie.overview}
									category={'upcoming'}
								/>
							))}
						</Section>
					)}

					{topRatedInfinite && movieTopRatedMatch && (
						<Section title={title}>
							{topRatedInfinite.map((movie) => (
								<Poster
									key={movie.id}
									id={movie.id}
									imageUrl={movie.poster_path}
									title={movie.title}
									rating={movie.vote_average}
									year={movie.release_date ? movie.release_date : ''}
									type={'movie'}
									overview={movie.overview}
									category={'topRated'}
								/>
							))}
						</Section>
					)}

					<BtnTopScroll />
				</>
			)}
		</Wrapper>
	);
};

export default MovieView;
