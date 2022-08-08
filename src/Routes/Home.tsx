import { useEffect, useState } from 'react';
import { Wrapper, Visual, VisualOverview, VisualTitle } from '../App';
import Loader from './../Components/Loader';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Description from './../Components/home/Description';
import QnA from './../Components/home/Qna';
import { movieApi, commonApi, IMovie, IGetMovieDetail } from './../api';
import styled from 'styled-components';
import FooterView from './../Components/FooterView';

const Container = styled.div`
	// display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100vh;
`;

const HomeContainer = styled.div`
	width: 100%;
	height: 100%;
`;

const Iframe = styled.iframe`
	width: 100%;
	height: 100%;
	z-index: -1;
	opacity: 0.65;
	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
`;

const Content = styled.div`
	color: white;
	position: absolute;
	top: 39%;
	left: 40px;
	transform: translateY(-50%);
	width: 550px;
	font-family: 'Do Hyeon', sans-serif;
	animation: homeAni 0.7s ease-in;
	@keyframes homeAni {
		from {
			opacity: 0;
			transform: translateY(-40%);
		}
		to {
			opacity: 1;
		}
	}
	@media (max-width: 768px) {
		width: 100%;
		left: 0;
		padding: 0 15px;
		top: 83%;
	}
`;

const Title = styled.h1`
	font-size: 53px;
	text-shadow: rgba(255, 255, 255, 0.6) 0px 5px 10px;
	font-family: 'Do Hyeon', sans-serif;
	@media (max-width: 768px) {
		font-size: 30px;
	}
`;

const SubTitle = styled.h2`
	font-size: 28px;
	margin-top: 25px;
	font-style: italic;
	@media (max-width: 768px) {
		font-size: 18px;
		margin-top: 15px;
	}
`;

const Genres = styled.div`
	font-size: 20px;
	color: rgb(108, 117, 125);
	margin-top: 18px;
	margin-bottom: 8px;
	@media (max-width: 768px) {
		font-size: 16px;
		margin-top: 10px;
	}
`;

const YearRuntimeContainer = styled.div`
	font-size: 20px;
	@media (max-width: 768px) {
		font-size: 15px;
	}
`;

const Year = styled.span`
	font-size: 20px;
	color: rgb(108, 117, 125);
	@media (max-width: 768px) {
		font-size: 15px;
	}
`;

const Runtime = styled.span`
	font-size: 20px;
	color: rgb(108, 117, 125);
	@media (max-width: 768px) {
		font-size: 15px;
	}
`;

const YearRuntimeSpan = styled.span`
	margin: 0 5px;
	color: rgb(108, 117, 125);
`;

const Rating = styled.div`
	font-size: 20px;
	color: white;
	margin-top: 12px;
	margin-bottom: 15px;
	@media (max-width: 768px) {
		font-size: 15px;
	}
`;

const RatingChild = styled.span`
	font-size: 22px;
	color: dodgerblue;
	margin-left: 7px;
	@media (max-width: 768px) {
		font-size: 17px;
	}
`;

const Overview = styled.div`
	font-size: 21px;
	line-height: 1.6;
	@media (max-width: 768px) {
		font-size: 15px;
		line-height: 1.2;
	}
`;

const Home = () => {
	// 초기 화면 보여주기 (숫자 랜덤 생성)

	const getRandom = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min) + min);
	};

	const [loading, setLoading] = useState(true);
	const [movieDetail, setMovieDetail] = useState<IGetMovieDetail>();
	const [videoKey, setVideoKey] = useState();

	const getDataInit = async () => {
		try {
			const {
				data: { results },
			} = await movieApi.nowPlayingInfinite(1);
			let movieArray = [];
			for (let i = 0; i < 1; i++) {
				movieArray.push(results.map((result: IMovie) => result.id));
			}
			const movieId =
				movieArray[0][Math.floor(Math.random() * movieArray[0].length)];
			const { data: detail } = await commonApi.detail('movie', movieId);

			if (detail.videos.results.length === 0) {
				const { data: detail } = await commonApi.detail('movie', 497698);
				setMovieDetail(detail);
				//setDefaultVedio(true);
				return;
			}

			setMovieDetail(detail);
			setVideoKey(detail.videos.results[0].key);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getDataInit();
	}, []);

	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>홈 - 넷플릭스</title>
				</Helmet>
			</HelmetProvider>

			{loading ? (
				<Loader />
			) : (
				<Container>
					<HomeContainer>
						<Iframe
							src={`https://www.youtube.com/embed/${videoKey}?controls=0&autoplay=1&loop=1&mute=1&playlist=${videoKey}`}
							width='640'
							height='360'
							allow='autoplay; fullscreen'
						/>

						<Content>
							<Title>{movieDetail?.title}</Title>

							<Genres>
								{movieDetail?.genres.map((genre, index) =>
									movieDetail?.genres.length - 1 === index
										? genre.name
										: `${genre.name} • `,
								)}
							</Genres>
							<YearRuntimeContainer>
								<Year>{movieDetail?.release_date.substring(0, 4)}</Year>
								<YearRuntimeSpan>•</YearRuntimeSpan>
								<Runtime>{movieDetail?.runtime}분</Runtime>
							</YearRuntimeContainer>
							<Rating>
								평점
								<RatingChild>{movieDetail?.vote_average}</RatingChild>
							</Rating>

							<Overview>{movieDetail?.overview.substring(0, 150)}..</Overview>
						</Content>

						{/* <SliderMovie type={MovieType.now_playing} query={'movie'} />
					<SliderMovie type={MovieType.top_rated} query={'movie'} />
					<SliderMovie type={MovieType.popular} query={'movie'} />
					<SliderMovie type={MovieType.upcoming} query={'movie'} /> */}
					</HomeContainer>

					<article>
						<Description />
						<QnA />
						<FooterView />
					</article>
				</Container>
			)}
		</>
	);
};

export default Home;
