// 임시 API KEY

import axios from 'axios';
import { config } from './apikey';
const API_KEY = config.apikey;
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
export interface IGetMoviesResult {
	page: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
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
	videos: {
		results: [];
	};
	vote_average: number;
	vote_count: number;
}

export interface ITvShow {
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
export interface IGetCommonDetail {
	adult: boolean;
	backdrop_path: string;
	homepage: string;
	id: number;
	genres: [
		{
			id: number;
			name: string;
		},
	];
	original_language: string;
	overview: string;
	vote_average: number;
	vote_count: number;
	popularity: number;
	poster_path: string;

	// MOVIE 일때만
	original_title?: string;
	release_date?: string;
	title?: string;
	runtime?: number;
	// TV일때만
	original_name?: string;
	first_air_date?: string;
	last_air_date?: string;
}

export enum MovieType {
	'now_playing' = 'now_playing',
	'popular' = 'popular',
	'top_rated' = 'top_rated',
	'upcoming' = 'upcoming',
}

// 영화 목록
export const getMovies = async (type: string) => {
	return await api.get(`movie/${type}`).then((response) => response.data);
};

// 영화 정보 상세
export const getMovieDetail = async (id: string | undefined) => {
	return await api.get(`movie/${id}`).then((response) => response.data);
};

// 영화,TV 공통 상세 사용
export const getDetailCommon = async (
	category: string | undefined,
	id: string | undefined,
) => {
	return await api.get(`${category}/${id}`).then((response) => response.data);
};

export const commonApi = {
	detail: (category: string, id: number | undefined) =>
		api.get(`${category}/${id}`, { params: { append_to_response: 'videos' } }),
	keywords: (category: string, id: number | undefined) =>
		api.get(`${category}/${id}/keywords`),
	credits: (category: string, id: number | undefined) =>
		api.get(`${category}/${id}/credits`),
	search: (keyword: string | null, category: string, page: number) =>
		api.get(`search/${category}`, { params: { query: keyword, page } }),
	images: (category: string, id: number | undefined) =>
		api.get(`${category}/${id}/images`, {
			params: { include_image_language: 'kr,null' },
		}),
	recommendations: (category: string, id: number | undefined) =>
		api.get(`${category}/${id}/recommendations`),
};

export const movieApi = {
	popularInfinite: (page: number) =>
		api.get(`movie/popular`, { params: { page } }),
	nowPlayingInfinite: (page: number) =>
		api.get(`movie/now_playing`, { params: { page } }),
	upcomingInfinite: (page: number) =>
		api.get(`movie/upcoming`, { params: { page } }),
	topRatedInfinite: (page: number) =>
		api.get(`movie/top_rated`, { params: { page } }),
};

export const tvShowApi = {
	popularInfinite: (page: number) =>
		api.get(`tv/popular`, { params: { page } }),
	airingTodayInfinite: (page: number) =>
		api.get(`tv/airing_today`, { params: { page } }),
	onTheAirInfinite: (page: number) =>
		api.get(`tv/on_the_air`, { params: { page } }),
	topRatedInfinite: (page: number) =>
		api.get(`tv/top_rated`, { params: { page } }),
};
