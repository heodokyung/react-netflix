// 임시 API KEY

import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '10923b261ba94d897ac6b81148314a3f';

const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	params: {
		api_key: API_KEY,
		language: 'ko-KR',
	},
});

export interface IMovie {
	adult: boolean;
	backdrop_path: string;
	genre_ids: [number, number, number, number];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface IGetMovieDetail {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: null;
	budget: number;
	genres: [
		{
			id: number;
			name: string;
		},
	];
	homepage: string;
	id: number;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: [
		{
			id: number;
			logo_path: string;
			name: string;
			origin_country: string;
		},
	];
	production_countries: [
		{
			iso_3166_1: string;
			name: string;
		},
	];
	release_date: string;
	revenue: number;
	runtime: number;
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface IGetMoviesResult {
	page: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
}

interface ITvShow {
	backdrop_path: string;
	first_air_date: string;
	genre_ids: number[];
	id: number;
	name: string;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	vote_average: number;
	vote_count: number;
}

export interface IGetTvShowsResult {
	page: number;
	results: ITvShow[];
	total_pages: number;
}

export interface ITvShowsDetail {
	adult: boolean;
	backdrop_path: string;
	episode_run_time: [number];
	first_air_date: string;
	last_air_date: string;
	genres: [
		{
			id: number;
			name: string;
		},
	];
	homepage: string;
	id: number;
	in_production: boolean;
	languages: [string];
	networks: [
		{
			name: string;
			id: number;
			logo_path: string;
			origin_country: string;
		},
	];
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: [string];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;

	vote_average: number;
	vote_count: number;
}

export enum MovieType {
	'now_playing' = 'now_playing',
	'popular' = 'popular',
	'top_rated' = 'top_rated',
	'upcoming' = 'upcoming',
}

export enum TvShowType {
	'on_the_air' = 'on_the_air',
	'airing_today' = 'airing_today',
	'popular' = 'popular',
	'top_rated' = 'top_rated',
}

/************************************
https://developers.themoviedb.org/3/movies/get-movie-details
* - 공통
* latest : 최신
* top_rated : 높은 평점
* popular : 인기있는

- 영화
* upcoming : 곧 예정
* now_playing

- TV
on_the_air : TV 온에어
airing_today :
************************************/

// 영화 정보 가져오기
export const getMovies = async (type: MovieType = MovieType.now_playing) => {
	return await api.get(`/movie/${type}`).then((response) => response.data);
};

// Tv 정보 가져오기
export const getTv = async (type: TvShowType = TvShowType.on_the_air) => {
	return await api.get(`/tv/${type}`).then((response) => response.data);
};

// 영화 정보 상세
export const getMovieDetail = async (movieId: string | undefined) => {
	return await api.get(`/movie/${movieId}`).then((response) => response.data);
};

// Tv 정보 상세
export const getTvShowsDetail = async (tvId: string | undefined) => {
	return await api.get(`/tv/${tvId}`).then((response) => response.data);
};

export const getSearchResult = async ({
	keyword,
	category,
	page,
}: {
	keyword: string | null;
	category: string;
	page: number;
}) => {
	return await api
		.get(`/search/${category}`, { params: { query: keyword } })
		.then((response) => response.data);
};
