import { useEffect, useState } from 'react';
import { getMovies, IGetMoviesResult, MovieType } from '../api';
import { useQuery } from 'react-query';
import { makeImagePath } from './../utils';
import { useRecoilValue } from 'recoil';
import { NETFLIX_LOGO_URL } from '../atoms';
import { Loader, Wrapper, Visual, VisualOverview, VisualTitle } from './../App';
import { SliderMovie } from '../Components/Slider';

const Home = () => {
	// 초기 화면 보여주기 (숫자 랜덤 생성)
	const [random, setRandom] = useState(0);
	const getRandom = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min) + min);
	};

	const NETFLIX_LOGO = useRecoilValue(NETFLIX_LOGO_URL);
	// 초기 화면 셋팅 Random 숫자
	useEffect(() => {
		setRandom(getRandom(0, 20));
	}, []);

	const { data, isLoading } = useQuery<IGetMoviesResult>(
		['movie', 'now_playing'],
		() => getMovies(MovieType.now_playing),
	);

	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Visual
						bgphoto={makeImagePath(
							data?.results[random].backdrop_path || NETFLIX_LOGO,
							'w500',
						)}
					>
						<VisualTitle>{data?.results[random].title}</VisualTitle>
						<VisualOverview>
							{data &&
								(data.results[random].overview.length > 162
									? `${data?.results[random].overview.slice(0, 162).trim()}...`
									: data?.results[random].overview)}
						</VisualOverview>
					</Visual>

					<SliderMovie type={MovieType.now_playing} query={'movie'} />
					<SliderMovie type={MovieType.top_rated} query={'movie'} />
					<SliderMovie type={MovieType.popular} query={'movie'} />
					<SliderMovie type={MovieType.upcoming} query={'movie'} />
				</>
			)}
		</Wrapper>
	);
};

export default Home;
