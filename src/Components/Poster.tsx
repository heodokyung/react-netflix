import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
	font-size: 13px;
	transition: 0.2s linear;
`;

const Image = styled.div<{ imageUrl: string }>`
	background: url(${(props) => props.imageUrl}) no-repeat center center;
	background-size: cover;
	height: 340px;
	transition: 0.2s linear;
	border-radius: 7px;
	@media (max-width: 768px) {
		height: 280px;
	}
`;

const Overview = styled.span`
	position: absolute;
	top: 30px;
	left: 0px;
	opacity: 0;
	transition: 0.2s linear;
	color: white;
	line-height: 1.8;
	font-size: 14px;
	padding: 20px;
`;

const Popularity = styled.span`
	position: absolute;
	bottom: 18px;
	left: 50%;
	transform: translate(-50%);
	opacity: 0;
	transition: 0.2s linear;
	color: white;
	line-height: 1.8;
	font-size: 14px;
	padding: 6px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	border: 1px solid white;
	width: 48%;
	border-radius: 3px;
	transition: 0.3s;
	&:hover {
		color: dodgerblue;
		border: 1px solid dodgerblue;
	}
`;

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Title = styled.span`
	color: white;
	font-size: 15px;
	margin-top: 12px;
	font-weight: bold;
`;

const YearRatingContainer = styled.div`
	margin-top: 11px;
`;

const Year = styled.span`
	color: gray;
	font-size: 14px;
	margin-right: 10px;
`;

const ContentRating = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	color: gray;
	margin-top: 5px;
`;

const ContentRatingChild = styled.div`
	font-size: 14px;
	color: gray;
	margin-left: 3px;
	margin-top: 2px;
`;

const PosterContainer = styled.div`
	margin-bottom: 5px;
	position: relative;
	overflow: hidden;
	border-radius: 7px;
	transition: 0.2s linear;
	&:hover {
		${Image} {
			opacity: 0.3;
		}
		${Overview} {
			opacity: 1;
		}
		${Popularity} {
			opacity: 1;
		}
	}
`;

const Wrapper = styled.article`
	width: 220px;
	border-radius: 7px;
	margin-right: 20px;
	margin-bottom: 45px;
`;
const ScLink = styled(Link)`
	width: 220px;
	border-radius: 7px;
	margin-right: 20px;
	margin-bottom: 45px;
	&:hover {
		${Container} {
			transform: scale(1.05);
		}
		${PosterContainer} {
			box-shadow: 0 2px 8px black, 0 2px 4px black;
		}
	}
	@media (max-width: 768px) {
		margin: 0;
		width: 170px;
		margin-bottom: 40px;
	}
`;

interface IPropsPoster {
	id: number;
	imageUrl: string;
	title: string;
	rating: number;
	year: string;
	type: string;
	overview: string;
	category: string;
}

const Poster = ({
	id,
	imageUrl,
	title,
	rating,
	year,
	type,
	overview,
	category,
}: IPropsPoster) => {
	return (
		<>
			{type !== 'search' && (
				<ScLink to={`/${type}/${category}/${id}`}>
					<Container>
						<PosterContainer>
							<Image
								imageUrl={
									imageUrl
										? `https://image.tmdb.org/t/p/w300${imageUrl}`
										: require('../assets/noPoster.png')
								}
							/>
							<Overview>
								{overview ? `${overview.substring(0, 130)}..` : title}
							</Overview>
							<Popularity>상세정보</Popularity>
						</PosterContainer>
						<ContentContainer>
							<Title>
								{title && title.length > 15
									? `${title.substring(0, 15)}..`
									: title}
							</Title>
							<YearRatingContainer>
								<Year>개봉일 {year}</Year>
								<ContentRating>
									⭐<ContentRatingChild>{rating}</ContentRatingChild>
								</ContentRating>
							</YearRatingContainer>
						</ContentContainer>
					</Container>
				</ScLink>
			)}

			{/* 검색 결과일 때 */}
			{type === 'search' && (
				<Wrapper>
					<Container>
						<Image
							imageUrl={
								imageUrl
									? `https://image.tmdb.org/t/p/w300${imageUrl}`
									: require('../assets/noPoster.png')
							}
						></Image>

						<Overview>
							{overview ? `${overview.substring(0, 130)}..` : title}
						</Overview>

						<ContentContainer>
							<Title>
								{title && title.length > 15
									? `${title.substring(0, 15)}..`
									: title}
							</Title>
							<YearRatingContainer>
								<Year>개봉일 {year}</Year>
								<ContentRating>
									⭐<ContentRatingChild>{rating}</ContentRatingChild>
								</ContentRating>
							</YearRatingContainer>
						</ContentContainer>
					</Container>
				</Wrapper>
			)}
		</>
	);
};

export default Poster;
