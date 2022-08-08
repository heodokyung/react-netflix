import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IGetMovieDetail, ITvShow } from '../../api';

import useInfiniteScroll from '../useInfiniteScroll';
import { commonApi } from '../../api';
import Poster from '../Poster';
import { Wrapper } from '../../App';
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

const SearchText = styled.p`
	text-align: center;
	padding: 80px 0 300px;
	font-size: 36px;
	font-weight: bold;
`;

export function MoviesSearchResults({ keyword }: { keyword: string | null }) {
	const page = useInfiniteScroll();
	const [search, setSearch] = useState<IGetMovieDetail[]>([]);

	const getSearchList = async () => {
		const {
			data: { results },
		} = await commonApi.search(keyword, 'movie', page);
		setSearch(results);
		console.log(await commonApi.search(keyword, 'movie', page));
	};

	const noResults = search.length < 1;

	useEffect(() => {
		getSearchList();
	}, [keyword]);

	const getInfiniteApi = async () => {
		if (page !== 1) {
			try {
				const {
					data: { results: newSearch },
				} = await commonApi.search(keyword, 'movie', page);
				const totalSearch = [...search, ...newSearch];

				setSearch(totalSearch);
			} catch (error) {
				console.log(error);
			}
		}
	};
	useEffect(() => {
		getInfiniteApi();
	}, [page]);

	return (
		<Wrapper>
			{noResults ? (
				<SearchText>검색결과가 없습니다</SearchText>
			) : (
				<Section title='인기 영화'>
					{search.map((movie) => (
						<Poster
							key={movie.id}
							id={movie.id}
							imageUrl={movie.poster_path}
							title={movie.title}
							rating={movie.vote_average}
							year={movie.release_date ? movie.release_date : ''}
							type={'search'}
							overview={movie.overview}
							category={''}
						></Poster>
					))}
				</Section>
			)}
		</Wrapper>
	);
}

export function TvsSearchResults({ keyword }: { keyword: string | null }) {
	const page = useInfiniteScroll();
	const [search, setSearch] = useState<ITvShow[]>([]);

	const getSearchList = async () => {
		const {
			data: { results },
		} = await commonApi.search(keyword, 'tv', page);
		setSearch(results);
		console.log(await commonApi.search(keyword, 'tv', page));
	};

	const noResults = search.length < 1;

	useEffect(() => {
		getSearchList();
	}, [keyword]);

	const getInfiniteApi = async () => {
		if (page !== 1) {
			try {
				const {
					data: { results: newSearch },
				} = await commonApi.search(keyword, 'tv', page);
				const totalSearch = [...search, ...newSearch];

				setSearch(totalSearch);
			} catch (error) {
				console.log(error);
			}
		}
	};
	useEffect(() => {
		getInfiniteApi();
	}, [page]);

	return (
		<Wrapper>
			{noResults ? (
				<SearchText>검색결과가 없습니다</SearchText>
			) : (
				<Section title='검색 TVSHOW'>
					{search.map((tv) => (
						<Poster
							key={tv.id}
							id={tv.id}
							imageUrl={tv.poster_path}
							title={tv.name}
							rating={tv.vote_average}
							year={tv.first_air_date ? tv.first_air_date : ''}
							type={'search'}
							overview={tv.overview}
							category={''}
						/>
					))}
				</Section>
			)}
		</Wrapper>
	);
}
