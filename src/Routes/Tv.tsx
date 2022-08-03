import { useEffect, useState } from 'react';
import { getTvShow, IGetMoviesResult, TvShowType } from '../api';
import { useQuery } from 'react-query';
import { makeImagePath } from './../utils';
import { useRecoilValue } from 'recoil';
import { NETFLIX_LOGO_URL } from '../atoms';
import { Loader, Wrapper, Visual, VisualOverview, VisualTitle } from './../App';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { SliderTvShow } from '../Components/Slider';

const Tv = () => {
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
		['tv', 'airing_today'],
		() => getTvShow(TvShowType.airing_today),
	);

	return (
		<Wrapper>
			<HelmetProvider>
				<Helmet>
					<title>TV SHOW - 넷플릭스</title>
				</Helmet>
			</HelmetProvider>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Visual
						bgphoto={makeImagePath(
							data?.results[random].backdrop_path || NETFLIX_LOGO,
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

					<SliderTvShow type={TvShowType.airing_today} query={'tv'} />
					<SliderTvShow type={TvShowType.popular} query={'tv'} />
					<SliderTvShow type={TvShowType.on_the_air} query={'tv'} />
					<SliderTvShow type={TvShowType.top_rated} query={'tv'} />
				</>
			)}
		</Wrapper>
	);
};

export default Tv;
