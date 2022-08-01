import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { motion, AnimatePresence, useViewportScroll } from 'framer-motion';
import { makeImagePath } from '../utils';
import useWindowDimensions from './useWidowDimensions';
import { useNavigate, useMatch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { NETFLIX_LOGO_URL } from '../atoms';
import {
	getMovieDetail,
	getMovies,
	IGetMovieDetail,
	IGetMoviesResult,
	MovieType,
	IGetTvShowsResult,
	ITvShowsDetail,
	TvShowType,
	getTvShowsDetail,
	getTv,
} from '../api';

export const SliderContentWrap = styled.article`
	position: relative;
	top: -100px;
	& + & {
		margin-top: 100px;
	}
	@media screen and (max-width: 1000px) {
		& + & {
			margin-top: 50px;
		}
	}
`;

// 슬라이더 카테고리 제목
export const CategoryTitle = styled.h2`
	font-size: 24px;
	font-weight: 800;
	margin-bottom: 20px;
	margin-left: 10px;
	color: ${(props) => props.theme.white.lighter};
`;

// 슬라이더
export const SliderWrap = styled.div`
	height: 200px;
	position: relative;
	@media screen and (max-width: 1000px) {
		height: 150px;
	}
	@media screen and (max-width: 500px) {
		height: 80px;
	}
`;

// 슬라이드가 되는 Row행(6개 노출)
export const Row = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	margin-bottom: 10px;
	gap: 5px;
	position: absolute;
	height: 100%;
	width: 100%;
`;

// 슬라이드 되는 하나의 박스 Element
export const Box = styled(motion.div)<{ bgphoto: string }>`
	background-color: white;
	background-image: url(${(props) => props.bgphoto});
	background-size: cover;
	background-position: center center;
	height: 100%;
	font-size: 64px;
	cursor: pointer;
	&:first-child {
		transform-origin: center left;
	}
	&:last-child {
		transform-origin: center right;
	}
`;

// 슬라이드 박스 Element -> 상세(hover시 노출)
export const Info = styled(motion.div)`
	padding: 10px;
	background-color: rgba(0, 0, 0, 0.7);
	font-weight: bold;
	opacity: 0;
	position: absolute;
	width: 100%;
	bottom: 0;
	p {
		text-align: center;
		font-size: 18px;
		font-weight: bold;
	}
	@media screen and (max-width: 1000px) {
		p {
			font-size: 14px;
			line-height: 18px;
		}
	}
`;

// 좌, 우 클릭 버튼
export const BtnSlide = styled.button<{ isRight: boolean }>`
	position: absolute;
	top: 0;
	bottom: 0;
	right: ${(props) => (props.isRight ? 0 : null)};
	left: ${(props) => (props.isRight ? null : 0)};
	background-color: rgba(0, 0, 0, 0.5);
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	border: none;
	z-index: 2;
	color: ${(props) => props.theme.white.darker};
	svg {
		width: 40px;
		height: 40px;
	}
`;

// 박스 영역 클릭시 노출되는 암막
export const OverlayMask = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
	z-index: 90;
`;

// 박스 영역 클릭시 노출되는 팝업
export const PopupDetail = styled(motion.div)`
	position: fixed;
	width: 42vw;
	height: 70vh;
	left: 0;
	right: 0;
	top: 50%;
	margin: -35vh auto 0;
	border-radius: 8px;
	overflow: hidden;
	background-color: ${(props) => props.theme.black.lighter};
	z-index: 100;
`;

// 팝업 상세 이미지
export const PopupDetailCover = styled.div<{ bgphoto: string }>`
	position: relative;
	width: 100%;
	height: 335px;
	background: url(${(props) => props.bgphoto}) no-repeat center center;
	background-size: cover;
`;

// 팝업 제목 타이틀
export const PopupDetailTitle = styled.p`
	color: ${(props) => props.theme.white.lighter};
	padding: 16px 20px 0;
	font-size: 46px;
	font-weight: bold;
	position: absolute;
	top: 0px;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2; /* 라인수 */
	-webkit-box-orient: vertical;
	word-wrap: break-word;
	line-height: 130%;
`;

// 팝업 상세 내용
export const PopupDetailOverview = styled.div`
	padding: 20px;
	p {
		color: ${(props) => props.theme.white.lighter};
		font-size: 16px;
		line-height: 22px;
		font-weight: 400;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 7; /* 라인수 */
		-webkit-box-orient: vertical;
		word-wrap: break-word;
	}
`;

// 팝업 추가 정보 내용
export const PopupThumbInfo = styled.article`
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: ${(props) => props.theme.white.lighter};
	font-weight: bold;
	font-size: 16px;
	padding: 0 20px;
	position: absolute;
	width: 100%;
	bottom: 20px;
`;

export const PopupSubInfo = styled.div`
	margin: 0px 20px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	position: absolute;
	bottom: 20px;
	font-size: 20px;
	font-weight: 600;
	div {
		span:first-child {
			color: #808e9b;
		}
	}
`;

// 슬라이드 간격 이슈, Resize이슈로 슬라이드에 속성을 직접 사용
export const rowVariants = {
	hidden: ({
		resizeWindowWidth,
		clickReverse,
	}: {
		resizeWindowWidth: number;
		clickReverse: boolean;
	}) => ({
		x: clickReverse ? -resizeWindowWidth - 5 : resizeWindowWidth + 5,
	}),
	visible: {
		x: 0,
	},
	exit: ({
		resizeWindowWidth,
		clickReverse,
	}: {
		resizeWindowWidth: number;
		clickReverse: boolean;
	}) => ({
		x: clickReverse ? resizeWindowWidth + 5 : -resizeWindowWidth - 5,
	}),
};

// 슬라이드 박스 Element 애니메이션 효과 정의
export const boxVariants = {
	normal: {
		scale: 1,
	},
	hover: {
		scale: 1.3,
		y: -50,
		transition: {
			delay: 0.5,
			duaration: 0.3,
			type: 'tween', // framer-motion에서는 기본값이 Spring을 사용(통통 튀는 효과) -> 부드러운 Easing 효과를 주기 위해 tween
		},
	},
};

export const infoVariants = {
	hover: {
		opacity: 1,
		transition: {
			delay: 0.5,
			duaration: 0.1,
			type: 'tween',
		},
	},
};

export const SliderMovie = ({
	type,
	query,
}: {
	type: MovieType;
	query: string;
}) => {
	const NETFLIX_LOGO = useRecoilValue(NETFLIX_LOGO_URL);

	// 영화 슬라이드 노출 View 갯수
	const offset = 6;

	// 윈도우 사이즈 측정 -> Resize Hook
	const resizeWindowWidth = useWindowDimensions();

	// React-route-dom의 v5 -> v6버전으로 변경되면서 변한점
	// 1) v5에서 useHistory를 사용 -> v6에서는 useNavigate를 사용
	// 2) v5에서 useRouteMatch를 사용 -> v6에서는 useMatch를 사용
	const navigate = useNavigate();
	const popupDetailMatch = useMatch(`/${query}/${type}/:id`);

	// 전달받은 Props => Type 값으로 useQuery 데이터 조회(영화, TV)

	const { data } = useQuery<IGetMoviesResult>([`${query}`, type], () =>
		getMovies(type),
	);

	//  슬라이드 Index
	const [index, setIndex] = useState(0);

	// 애니메이션 중복효과를 막는 함수 -> 중복클릭 방지
	const [leaving, setLeaving] = useState(false);
	// 이전, 다음 체크하는 함수
	const [clickReverse, setClickReverse] = useState(false);

	// Title
	const [slideTitle, setSlideTitle] = useState('');

	useEffect(() => {
		if (type === MovieType.now_playing) {
			setSlideTitle('현재 상영중');
		}

		if (type === MovieType.top_rated) {
			setSlideTitle('최고 평점을 받은 영화');
		}

		if (type === MovieType.popular) {
			setSlideTitle('인기가 많은 영화들');
		}

		if (type === MovieType.upcoming) {
			setSlideTitle('곧 찾아옵니다!!');
		}
	}, []);

	// 이전
	const decreaseIndex = () => {
		if (data) {
			if (leaving) return;
			setClickReverse(true);
			toggleLeaving();
			const totalList = data.results.length - 1;
			const maxIndex = Math.floor(totalList / offset) - 1;
			setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
		}
	};

	// 다음
	const increaseIndex = () => {
		if (data) {
			if (leaving) return;
			setClickReverse(false);
			toggleLeaving();
			const totalList = data.results.length - 1;
			const maxIndex = Math.floor(totalList / offset) - 1;
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};

	// 박스 Element에 hover시 커지는 효과
	const toggleLeaving = () => setLeaving((prev) => !prev);

	// 슬라이드 박스(영화,TV) 상세 클릭 -> 모달 팝업으로 내용 보여줌
	const onBoxClicked = ({ id, category }: { id: number; category: string }) => {
		navigate(`/${query}/${category}/${id}`);
	};

	// 팝업 활성화 후 뒤에 암막 클릭시 -> 팝업 닫히고 주소 초기화
	const onOverlayClick = () => {
		navigate('/');
	};

	// 슬라이드 박스 클릭했을 때
	const clickedDetailInfo =
		popupDetailMatch?.params.id &&
		data?.results.find(
			(item) => String(item.id) === popupDetailMatch.params.id,
		);

	// 영화 정보 상세 가져오기
	const { data: clickedMovieDetail, isLoading: isLoadingMovieDetail } =
		useQuery<IGetMovieDetail>([popupDetailMatch?.params.id, 'detail'], () =>
			getMovieDetail(popupDetailMatch?.params.id),
		);

	return (
		<>
			<SliderContentWrap>
				<CategoryTitle>{slideTitle}</CategoryTitle>
				<SliderWrap>
					<AnimatePresence
						initial={false}
						onExitComplete={toggleLeaving}
						custom={{ resizeWindowWidth, clickReverse }}
					>
						<Row
							variants={rowVariants}
							initial='hidden'
							animate='visible'
							exit='exit'
							transition={{ type: 'tween', duration: 1 }}
							key={type + index}
							custom={{ resizeWindowWidth, clickReverse }}
						>
							{data?.results
								.slice(1)
								.slice(offset * index, offset * index + offset)
								.map((item) => (
									<Box
										layoutId={type + item.id + ''}
										key={type + item.id}
										whileHover='hover'
										initial='normal'
										variants={boxVariants}
										onClick={() =>
											onBoxClicked({ id: item.id, category: type })
										}
										transition={{ type: 'tween' }}
										bgphoto={
											item.backdrop_path !== null
												? makeImagePath(item.backdrop_path, 'w500')
												: NETFLIX_LOGO
										}
									>
										<Info variants={infoVariants}>
											<p>{item.title}</p>
										</Info>
									</Box>
								))}
						</Row>
					</AnimatePresence>
					<BtnSlide type='button' onClick={decreaseIndex} isRight={false}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 256 512'
							fill='currentColor'
						>
							<path d='M137.4 406.6l-128-127.1C3.125 272.4 0 264.2 0 255.1s3.125-16.38 9.375-22.63l128-127.1c9.156-9.156 22.91-11.9 34.88-6.943S192 115.1 192 128v255.1c0 12.94-7.781 24.62-19.75 29.58S146.5 415.8 137.4 406.6z' />
						</svg>
					</BtnSlide>
					<BtnSlide type='button' onClick={increaseIndex} isRight={true}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 256 512'
							fill='currentColor'
						>
							<path d='M118.6 105.4l128 127.1C252.9 239.6 256 247.8 256 255.1s-3.125 16.38-9.375 22.63l-128 127.1c-9.156 9.156-22.91 11.9-34.88 6.943S64 396.9 64 383.1V128c0-12.94 7.781-24.62 19.75-29.58S109.5 96.23 118.6 105.4z' />
						</svg>
					</BtnSlide>
				</SliderWrap>
				<AnimatePresence>
					{popupDetailMatch ? (
						<>
							<OverlayMask
								onClick={onOverlayClick}
								exit={{ opacity: 0 }}
								animate={{ opacity: 1 }}
							/>
							<PopupDetail layoutId={type + popupDetailMatch.params.id}>
								{clickedDetailInfo && (
									<>
										<PopupDetailCover
											bgphoto={
												clickedDetailInfo.backdrop_path ||
												clickedDetailInfo.poster_path !== null
													? makeImagePath(
															clickedDetailInfo.backdrop_path ||
																clickedDetailInfo.poster_path,
															'w500',
													  )
													: NETFLIX_LOGO
											}
										>
											<PopupDetailTitle>
												{clickedDetailInfo.title}
											</PopupDetailTitle>
											<PopupThumbInfo>
												<p>개봉일: {clickedDetailInfo.release_date}</p>
												<p>⭐️ {clickedDetailInfo.vote_average}</p>
											</PopupThumbInfo>
										</PopupDetailCover>
										<PopupDetailOverview>
											<p>{clickedDetailInfo.overview}</p>
										</PopupDetailOverview>

										<PopupSubInfo>
											<div>
												<span>Genres: </span>
												{clickedMovieDetail?.genres.map((data) => (
													<span>{data.name}</span>
												))}
											</div>
											<div>
												<span>Language: </span>
												{clickedMovieDetail?.original_language.toUpperCase()}
											</div>
										</PopupSubInfo>
									</>
								)}
							</PopupDetail>
						</>
					) : null}
				</AnimatePresence>
			</SliderContentWrap>
		</>
	);
};

// Tv 슬라이드
export const SliderTvShow = ({
	type,
	query,
}: {
	type: TvShowType;
	query: string;
}) => {
	const NETFLIX_LOGO = useRecoilValue(NETFLIX_LOGO_URL);
	// 영화 슬라이드 노출 View 갯수
	const offset = 6;

	// 윈도우 사이즈 측정 -> Resize Hook
	const resizeWindowWidth = useWindowDimensions();

	// React-route-dom의 v5 -> v6버전으로 변경되면서 변한점
	// 1) v5에서 useHistory를 사용 -> v6에서는 useNavigate를 사용
	// 2) v5에서 useRouteMatch를 사용 -> v6에서는 useMatch를 사용
	const navigate = useNavigate();
	const popupDetailMatch = useMatch(`/${query}/${type}/:id`);

	// 전달받은 Props => Type 값으로 useQuery 데이터 조회(영화, TV)

	const { data } = useQuery<IGetTvShowsResult>([`${query}`, type], () =>
		getTv(type),
	);

	//  슬라이드 Index
	const [index, setIndex] = useState(0);

	// 애니메이션 중복효과를 막는 함수 -> 중복클릭 방지
	const [leaving, setLeaving] = useState(false);
	// 이전, 다음 체크하는 함수
	const [clickReverse, setClickReverse] = useState(false);

	// Title
	const [slideTitle, setSlideTitle] = useState('');

	useEffect(() => {
		if (type === TvShowType.airing_today) {
			setSlideTitle('오늘 TV Show방송');
		}

		if (type === TvShowType.on_the_air) {
			setSlideTitle('TV Show ON Air');
		}

		if (type === TvShowType.popular) {
			setSlideTitle('인기가 많은 TV Show들');
		}

		if (type === TvShowType.top_rated) {
			setSlideTitle('평점이 높은 TV Show들');
		}
	}, []);

	// 이전
	const decreaseIndex = () => {
		if (data) {
			if (leaving) return;
			setClickReverse(true);
			toggleLeaving();
			const totalList = data.results.length - 1;
			const maxIndex = Math.floor(totalList / offset) - 1;
			setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
		}
	};

	// 다음
	const increaseIndex = () => {
		if (data) {
			if (leaving) return;
			setClickReverse(false);
			toggleLeaving();
			const totalList = data.results.length - 1;
			const maxIndex = Math.floor(totalList / offset) - 1;
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};

	// 박스 Element에 hover시 커지는 효과
	const toggleLeaving = () => setLeaving((prev) => !prev);

	// 슬라이드 박스(영화,TV) 상세 클릭 -> 모달 팝업으로 내용 보여줌
	const onBoxClicked = ({ id, category }: { id: number; category: string }) => {
		navigate(`/${query}/${category}/${id}`);
	};

	// 팝업 활성화 후 뒤에 암막 클릭시 -> 팝업 닫히고 주소 초기화
	const onOverlayClick = () => {
		navigate('/tv');
	};

	// 슬라이드 박스 클릭했을 때
	const clickedDetailInfo =
		popupDetailMatch?.params.id &&
		data?.results.find(
			(item) => String(item.id) === popupDetailMatch.params.id,
		);

	// Tv정보 상세 가져오기
	const { data: clickedTvDetail, isLoading: isLoadingTvDetail } =
		useQuery<ITvShowsDetail>([popupDetailMatch?.params.id, 'detail'], () =>
			getTvShowsDetail(popupDetailMatch?.params.id),
		);

	return (
		<>
			<SliderContentWrap>
				<CategoryTitle>{slideTitle}</CategoryTitle>
				<SliderWrap>
					<AnimatePresence
						initial={false}
						onExitComplete={toggleLeaving}
						custom={{ resizeWindowWidth, clickReverse }}
					>
						<Row
							variants={rowVariants}
							initial='hidden'
							animate='visible'
							exit='exit'
							transition={{ type: 'tween', duration: 1 }}
							key={type + index}
							custom={{ resizeWindowWidth, clickReverse }}
						>
							{data?.results
								.slice(1)
								.slice(offset * index, offset * index + offset)
								.map((item) => (
									<Box
										layoutId={type + item.id + ''}
										key={type + item.id}
										whileHover='hover'
										initial='normal'
										variants={boxVariants}
										onClick={() =>
											onBoxClicked({ id: item.id, category: type })
										}
										transition={{ type: 'tween' }}
										bgphoto={
											item.backdrop_path !== null
												? makeImagePath(item.backdrop_path, 'w500')
												: NETFLIX_LOGO
										}
									>
										<Info variants={infoVariants}>
											<p>{item.name}</p>
										</Info>
									</Box>
								))}
						</Row>
					</AnimatePresence>
					<BtnSlide type='button' onClick={decreaseIndex} isRight={false}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 256 512'
							fill='currentColor'
						>
							<path d='M137.4 406.6l-128-127.1C3.125 272.4 0 264.2 0 255.1s3.125-16.38 9.375-22.63l128-127.1c9.156-9.156 22.91-11.9 34.88-6.943S192 115.1 192 128v255.1c0 12.94-7.781 24.62-19.75 29.58S146.5 415.8 137.4 406.6z' />
						</svg>
					</BtnSlide>
					<BtnSlide type='button' onClick={increaseIndex} isRight={true}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 256 512'
							fill='currentColor'
						>
							<path d='M118.6 105.4l128 127.1C252.9 239.6 256 247.8 256 255.1s-3.125 16.38-9.375 22.63l-128 127.1c-9.156 9.156-22.91 11.9-34.88 6.943S64 396.9 64 383.1V128c0-12.94 7.781-24.62 19.75-29.58S109.5 96.23 118.6 105.4z' />
						</svg>
					</BtnSlide>
				</SliderWrap>
				<AnimatePresence>
					{popupDetailMatch ? (
						<>
							<OverlayMask
								onClick={onOverlayClick}
								exit={{ opacity: 0 }}
								animate={{ opacity: 1 }}
							/>
							<PopupDetail layoutId={type + popupDetailMatch.params.id}>
								{clickedDetailInfo && (
									<>
										<PopupDetailCover
											bgphoto={
												clickedDetailInfo.backdrop_path ||
												clickedDetailInfo.poster_path !== null
													? makeImagePath(
															clickedDetailInfo.backdrop_path ||
																clickedDetailInfo.poster_path,
															'w500',
													  )
													: NETFLIX_LOGO
											}
										>
											<PopupDetailTitle>
												{clickedDetailInfo.name}
											</PopupDetailTitle>
											<PopupThumbInfo>
												<p>
													{(clickedTvDetail?.first_air_date as string) +
														' ~ ' +
														(new Date(
															clickedTvDetail?.last_air_date as string,
														) >
														new Date(
															new Date().getTime() - 1000 * 60 * 60 * 24 * 7,
														)
															? ''
															: clickedTvDetail?.last_air_date)}
												</p>
												<p>⭐️ {clickedDetailInfo.vote_average}</p>
											</PopupThumbInfo>
										</PopupDetailCover>
										<PopupDetailOverview>
											<p>{clickedDetailInfo.overview}</p>
										</PopupDetailOverview>

										<PopupSubInfo>
											<div>
												<span>Genres: </span>
												{clickedTvDetail?.genres.map((data) => (
													<span> {data.name} </span>
												))}
											</div>
											<div>
												<span>Language: </span>
												{clickedTvDetail?.original_language.toUpperCase()}
											</div>
										</PopupSubInfo>
									</>
								)}
							</PopupDetail>
						</>
					) : null}
				</AnimatePresence>
			</SliderContentWrap>
		</>
	);
};
