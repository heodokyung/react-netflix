import { useEffect, useState } from 'react';
import { ITvShow, tvShowApi } from '../api';
import { Wrapper } from '../App';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Loader from './../Components/Loader';
import styled from 'styled-components';
import { useMatch, Link, useLocation } from 'react-router-dom';
import useInfiniteScroll from './../Components/useInfiniteScroll';
import Poster from './../Components/Poster';
import BtnTopScroll from '../Components/BtnTopScroll';
import DetailsView from '../Components/DetailsView';

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

const TvShowView = () => {
	const page = useInfiniteScroll();
	const [loading, setLoading] = useState(true);

	const tvShowPopularMatch = useMatch('/tv/popular');
	const tvShowAiringTodayMatch = useMatch('/tv/airingToday');
	const tvShowTopRatedMatch = useMatch('/tv/topRated');
	const tvShowOnTheAirMatch = useMatch('/tv/onTheAir');

	const [airingTodayInfinite, setAiringTodayInfinite] = useState<ITvShow[]>([]);
	const [onTheAirInfinite, setOnTheAirInfinite] = useState<ITvShow[]>([]);
	const [popularInfinite, setPopularInfinite] = useState<ITvShow[]>([]);
	const [topRatedInfinite, setTopRatedInfinite] = useState<ITvShow[]>([]);

	// 초기 셋팅 리스트;
	const getTvShowList = async () => {
		const {
			data: { results: airingTodayResult },
		} = await tvShowApi.airingTodayInfinite(page);
		setAiringTodayInfinite(airingTodayResult);

		const {
			data: { results: onTheAirResult },
		} = await tvShowApi.onTheAirInfinite(page);
		setOnTheAirInfinite(onTheAirResult);

		const {
			data: { results: popularResult },
		} = await tvShowApi.popularInfinite(page);
		setPopularInfinite(popularResult);

		const {
			data: { results: topRatedResult },
		} = await tvShowApi.topRatedInfinite(page);
		setTopRatedInfinite(topRatedResult);
		setLoading(false);
	};

	useEffect(() => {
		getTvShowList();
	}, []);

	// 추가 목록 리스트;
	const getInfiniteApi = async () => {
		if (page !== 1) {
			if (tvShowAiringTodayMatch) {
				try {
					const {
						data: { results: newAiringTodayTvShow },
					} = await tvShowApi.airingTodayInfinite(page);
					const totalTvShow = [...airingTodayInfinite, ...newAiringTodayTvShow];

					setAiringTodayInfinite(totalTvShow);
				} catch (error) {
					console.log(error);
				}
			}
			if (tvShowOnTheAirMatch) {
				try {
					const {
						data: { results: newOnTheAirTvShow },
					} = await tvShowApi.onTheAirInfinite(page);
					const totalTvShow = [...onTheAirInfinite, ...newOnTheAirTvShow];
					setOnTheAirInfinite(totalTvShow);
				} catch (error) {
					console.log(error);
				}
			}
			if (tvShowPopularMatch) {
				const {
					data: { results: newPopularTvShow },
				} = await tvShowApi.popularInfinite(page);

				const totalTvShow = [...popularInfinite, ...newPopularTvShow];
				setPopularInfinite(totalTvShow);
			}

			if (tvShowTopRatedMatch) {
				try {
					const {
						data: { results: newTopRatedTvShow },
					} = await tvShowApi.topRatedInfinite(page);
					const totalTvShow = [...topRatedInfinite, ...newTopRatedTvShow];
					setTopRatedInfinite(totalTvShow);
				} catch (error) {
					console.log(error);
				}
			}
		}
	};

	useEffect(() => {
		getInfiniteApi();
	}, [page]);

	const popupDetailMatch = useMatch(`/tv/:category/:id`);
	const history = useLocation();
	const splitUrl = history.pathname.split('/');
	const detailCategory = splitUrl[splitUrl.length - 2];
	const detailId = splitUrl[splitUrl.length - 1];
	const [title, setTitle] = useState('');
	const [subTitle, setSubTitle] = useState('');

	useEffect(() => {
		if (tvShowPopularMatch) {
			setTitle('인기 프로그램');
			setSubTitle(
				'현재 인기 있는 TV 프로그램 목록을 가져옵니다.<br />TV 프로그램 목록은 매일 자동 업데이트됩니다.',
			);
		}

		if (tvShowAiringTodayMatch) {
			setTitle('현재 방영중인 프로그램');
			setSubTitle(
				'현재 방영중인 TV 프로그램 목록을 가져옵니다.<br />오늘 날짜를 기준으로 목록을 가져옵니다.',
			);
		}

		if (tvShowOnTheAirMatch) {
			setTitle('방영 예정인 프로그램');
			setSubTitle(
				'방영 예정인 TV 프로그램 목록을 가져옵니다.<br />1주일내에 방영될 에피소드가 있는 프로그램을 찾습니다.',
			);
		}

		if (tvShowTopRatedMatch) {
			setTitle('평점높은 TV 프로그램');
			setSubTitle(
				'모든 TV 프로그램 중에서 평점이 높은 프로그램을 가져옵니다.<br />평점이 높은 프로그램을 기준으로 정렬합니다.',
			);
		}
	});
	return (
		<Wrapper>
			<HelmetProvider>
				<Helmet>
					<title>TV SHOW - 넷플릭스</title>
				</Helmet>
			</HelmetProvider>
			{loading ? (
				<Loader />
			) : (
				<>
					{popupDetailMatch && (
						<DetailsView type={'tv'} category={detailCategory} id={detailId} />
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
								to='/tv/popular'
								current={tvShowPopularMatch ? true : false}
							>
								인기 프로그램
							</ButtonLink>

							<ButtonLink
								to='/tv/airingToday'
								current={tvShowAiringTodayMatch ? true : false}
							>
								현재 방영중
							</ButtonLink>
							<ButtonLink
								to='/tv/onTheAir'
								current={tvShowOnTheAirMatch ? true : false}
							>
								방영 예정
							</ButtonLink>
							<ButtonLink
								to='/tv/topRated'
								current={tvShowTopRatedMatch ? true : false}
							>
								평점높은 프로그램
							</ButtonLink>
						</ButtonContent>
					</ButtonContainer>

					{popularInfinite && tvShowPopularMatch && (
						<Section title={title}>
							{popularInfinite.map((tv) => (
								<Poster
									key={tv.id}
									id={tv.id}
									imageUrl={tv.poster_path}
									title={tv.name}
									rating={tv.vote_average}
									year={tv.first_air_date ? tv.first_air_date : ''}
									type={'tv'}
									overview={tv.overview}
									category={'popular'}
								/>
							))}
						</Section>
					)}

					{airingTodayInfinite && tvShowAiringTodayMatch && (
						<Section title={title}>
							{airingTodayInfinite.map((tv) => (
								<Poster
									key={tv.id}
									id={tv.id}
									imageUrl={tv.poster_path}
									title={tv.name}
									rating={tv.vote_average}
									year={tv.first_air_date ? tv.first_air_date : ''}
									type={'tv'}
									overview={tv.overview}
									category={'airingToday'}
								/>
							))}
						</Section>
					)}

					{onTheAirInfinite && tvShowOnTheAirMatch && (
						<Section title={title}>
							{onTheAirInfinite.map((tv) => (
								<Poster
									key={tv.id}
									id={tv.id}
									imageUrl={tv.poster_path}
									title={tv.name}
									rating={tv.vote_average}
									year={tv.first_air_date ? tv.first_air_date : ''}
									type={'tv'}
									overview={tv.overview}
									category={'onTheAir'}
								/>
							))}
						</Section>
					)}

					{topRatedInfinite && tvShowTopRatedMatch && (
						<Section title={title}>
							{topRatedInfinite.map((tv) => (
								<Poster
									key={tv.id}
									id={tv.id}
									imageUrl={tv.poster_path}
									title={tv.name}
									rating={tv.vote_average}
									year={tv.first_air_date ? tv.first_air_date : ''}
									type={'tv'}
									overview={tv.overview}
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

export default TvShowView;
