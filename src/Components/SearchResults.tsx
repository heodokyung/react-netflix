import { useViewportScroll, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useMatch } from 'react-router-dom';
import { constSelector, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
	IGetMoviesResult,
	getSearchResult,
	IGetMovieDetail,
	getMovieDetail,
	ITvShowsDetail,
	getTvShowsDetail,
	IGetTvShowsResult,
} from '../api';
import { NETFLIX_LOGO_URL } from '../atoms';
import { makeImagePath } from '../utils';
import {
	Box,
	boxVariants,
	Info,
	infoVariants,
	OverlayMask,
	PopupDetail,
	PopupDetailCover,
	PopupDetailOverview,
	PopupDetailTitle,
	PopupSubInfo,
	PopupThumbInfo,
} from './Slider';

const TemplateBox = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-template-rows: repeat(auto, 1fr);
	column-gap: 10px;
	row-gap: 50px;
	margin-bottom: 100px;
`;

const TextExcept = styled.div`
	width: 100%;
	text-align: center;
	font-size: 36px;
	font-weight: 600;
`;

export function MoviesSearchResults({ keyword }: { keyword: string | null }) {
	console.log('keyword=====>', keyword);
	const NETFLIX_LOGO = useRecoilValue(NETFLIX_LOGO_URL);
	const navigate = useNavigate();
	const bigMovieMatch = useMatch(`/search/:movieId`);

	const { data: dataFirst, isLoading: isLoadingFirst } =
		useQuery<IGetMoviesResult>(['search: ' + keyword + 'movie', 1], () =>
			getSearchResult({
				keyword: keyword,
				category: 'movie',
				page: 1,
			}),
		);
	const { data: dataSecond, isLoading: isLoadingSecond } =
		useQuery<IGetMoviesResult>(['search: ' + keyword + 'movie', 2], () =>
			getSearchResult({
				keyword: keyword,
				category: 'movie',
				page: 2,
			}),
		);

	const noData = dataFirst?.total_pages!! < 1;

	const onBoxClicked = ({ movieId }: { movieId: number }) => {
		navigate(`/search/${movieId}?category=movie&keyword=${keyword}`);
	};

	const onOverlayClick = () =>
		navigate(`/search/?category=movie&keyword=${keyword}`);

	const clickedDetailInfo =
		(bigMovieMatch?.params.movieId &&
			dataFirst?.results.find(
				(movie) => String(movie.id) === bigMovieMatch.params.movieId,
			)) ||
		dataSecond?.results.find(
			(movie) => String(movie.id) === bigMovieMatch?.params.movieId,
		);

	const { data: clickedDetailInfoDetail, isLoading: isLoadingDetail } =
		useQuery<IGetMovieDetail>([bigMovieMatch?.params.movieId, 'detail'], () =>
			getMovieDetail(bigMovieMatch?.params.movieId),
		);

	return noData ? (
		<TextExcept>No search results</TextExcept>
	) : isLoadingFirst && isLoadingSecond ? (
		<TextExcept>Loading . . .</TextExcept>
	) : (
		<>
			<TemplateBox key={'movie'}>
				{dataFirst?.results.map((movie) => (
					<Box
						layoutId={movie.id.toString()}
						key={movie.id}
						variants={boxVariants}
						onClick={() => onBoxClicked({ movieId: movie.id })}
						initial='normal'
						whileHover='hover'
						transition={{
							type: 'tween',
						}} //transition을 props로 넣어줘야 끝날 때도 tween이 적용됨
						bgphoto={
							movie.backdrop_path || movie.poster_path !== null
								? makeImagePath(
										movie.backdrop_path || movie.poster_path,
										'w500',
								  )
								: NETFLIX_LOGO
						}
					>
						<Info variants={infoVariants}>
							<p>{movie.title}</p>
						</Info>
					</Box>
				))}
				{dataSecond?.results.map((movie) => (
					<Box
						layoutId={movie.id.toString()}
						key={movie.id}
						variants={boxVariants}
						onClick={() => onBoxClicked({ movieId: movie.id })}
						initial='normal'
						whileHover='hover'
						transition={{
							type: 'tween',
						}} //transition을 props로 넣어줘야 끝날 때도 tween이 적용됨
						bgphoto={
							movie.backdrop_path || movie.poster_path !== null
								? makeImagePath(
										movie.backdrop_path || movie.poster_path,
										'w500',
								  )
								: NETFLIX_LOGO
						}
					>
						<Info variants={infoVariants}>
							<p>{movie.title}</p>
						</Info>
					</Box>
				))}
			</TemplateBox>
			<AnimatePresence>
				{bigMovieMatch ? (
					<>
						<OverlayMask
							onClick={onOverlayClick}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						></OverlayMask>
						<PopupDetail layoutId={bigMovieMatch.params.movieId!!.toString()}>
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
											{clickedDetailInfoDetail?.genres.map((data) => (
												<span>{data.name}</span>
											))}
										</div>
										<div>
											<span>Language: </span>
											{clickedDetailInfoDetail?.original_language.toUpperCase()}
										</div>
									</PopupSubInfo>
								</>
							)}
						</PopupDetail>
					</>
				) : null}
			</AnimatePresence>
		</>
	);
}

export function TvsSearchResults({ keyword }: { keyword: string | null }) {
	const NETFLIX_LOGO = useRecoilValue(NETFLIX_LOGO_URL);
	const navigate = useNavigate();
	const popupDetailMatch = useMatch(`/search/:tvId`);

	const { data: dataFirst, isLoading: isLoadingFirst } =
		useQuery<IGetTvShowsResult>(['search: ' + keyword + 'tv', 1], () =>
			getSearchResult({
				keyword: keyword,
				category: 'tv',
				page: 1,
			}),
		);
	const { data: dataSecond, isLoading: isLoadingSecond } =
		useQuery<IGetTvShowsResult>(['search: ' + keyword + 'tv', 2], () =>
			getSearchResult({
				keyword: keyword,
				category: 'tv',
				page: 2,
			}),
		);

	const noData = dataFirst?.total_pages!! < 1;

	const onBoxClicked = ({ tvId }: { tvId: number }) => {
		navigate(`/search/${tvId}?category=tv&keyword=${keyword}`);
	};
	const onOverlayClick = () =>
		navigate(`/search/?category=tv&keyword=${keyword}`);

	const clickedDetailInfo =
		(popupDetailMatch?.params.tvId &&
			dataFirst?.results.find(
				(tv) => String(tv.id) === popupDetailMatch.params.tvId,
			)) ||
		dataSecond?.results.find(
			(tv) => String(tv.id) === popupDetailMatch?.params.tvId,
		);

	const { data: clickedTvDetail, isLoading: isLoadingDetail } =
		useQuery<ITvShowsDetail>([popupDetailMatch?.params.tvId, 'detail'], () =>
			getTvShowsDetail(popupDetailMatch?.params.tvId),
		);

	console.log('aaaaaaaaaaaaaaaa=>', clickedTvDetail);

	return noData ? (
		<TextExcept>No search results</TextExcept>
	) : isLoadingFirst && isLoadingSecond ? (
		<TextExcept>Loading . . .</TextExcept>
	) : (
		<>
			<TemplateBox key={'tv'}>
				{dataFirst?.results.map((tv) => (
					<Box
						layoutId={tv.id.toString()}
						key={tv.id}
						variants={boxVariants}
						onClick={() => onBoxClicked({ tvId: tv.id })}
						initial='normal'
						whileHover='hover'
						transition={{
							type: 'tween',
						}} //transition을 props로 넣어줘야 끝날 때도 tween이 적용됨
						bgphoto={
							tv.backdrop_path || tv.poster_path !== null
								? makeImagePath(tv.backdrop_path || tv.poster_path, 'w500')
								: NETFLIX_LOGO
						}
					>
						<Info variants={infoVariants}>
							<p>{tv.name}</p>
						</Info>
					</Box>
				))}
				{dataSecond?.results.map((tv) => (
					<Box
						layoutId={tv.id.toString()}
						key={tv.id}
						variants={boxVariants}
						onClick={() => onBoxClicked({ tvId: tv.id })}
						initial='normal'
						whileHover='hover'
						transition={{
							type: 'tween',
						}} //transition을 props로 넣어줘야 끝날 때도 tween이 적용됨
						bgphoto={
							tv.backdrop_path || tv.poster_path !== null
								? makeImagePath(tv.backdrop_path || tv.poster_path, 'w500')
								: NETFLIX_LOGO
						}
					>
						<Info variants={infoVariants}>
							<p>{tv.name}</p>
						</Info>
					</Box>
				))}
			</TemplateBox>
			<AnimatePresence>
				{popupDetailMatch ? (
					<>
						<OverlayMask
							onClick={onOverlayClick}
							exit={{ opacity: 0 }}
							animate={{ opacity: 1 }}
						/>
						<PopupDetail layoutId={popupDetailMatch.params.tvId!!.toString()}>
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
													(new Date(clickedTvDetail?.last_air_date as string) >
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
		</>
	);
}
