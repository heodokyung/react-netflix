import React, { useEffect } from 'react';
import { getDetailCommon, IGetCommonDetail } from './../api';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Wrapper } from './../App';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { NETFLIX_LOGO_URL } from '../atoms';
import { useRecoilValue } from 'recoil';
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
	width: 70vw;
	height: 80vh;
	left: 0;
	right: 0;
	top: 50%;
	margin: -40vh auto 0;
	border-radius: 8px;
	overflow: hidden;
	background-color: ${(props) => props.theme.black.lighter};
	z-index: 100;
`;

// 팝업 상세 이미지
export const PopupDetailCover = styled.div<{ bgphoto: string }>`
	position: relative;
	width: 100%;
	height: 40vh;
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
		font-size: 20px;
		line-height: 28px;
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
	font-size: 18px;
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
	div {
		span {
			position: relative;
			padding-left: 10px;
			margin-right: 10px;
		}
		span:before {
			display: block;
			width: 4px;
			height: 4px;
			position: absolute;
			top: 50%;
			left: 0;
			border-radius: 50%;
			margin-top: -2px;
			content: '';
			background-color: ${(props) => props.theme.white.darker};
		}
		span:first-child {
			color: #808e9b;
			margin-right: 12px;
			font-weight: 600;
			padding-left: 0;
		}
		span:first-child:before {
			display: none;
		}
	}
	div + div {
		margin-top: 16px;
	}
`;

interface IDetailsProps {
	type: string;
	category: string;
	id: string;
}
const DetailsView = ({ type, category, id }: IDetailsProps) => {
	//const [airingTodayInfinite, setAiringTodayInfinite] = useState<ITvShow[]>([]);

	const { data, isLoading } = useQuery<IGetCommonDetail>(
		[type + id, 'detail'],
		() => getDetailCommon(type, id),
	);

	const navigate = useNavigate();
	// const popupDetailMatch = useMatch(`/${query}/${type}/:id`);
	const onOverlayClick = () => {
		navigate(`/${type}/${category}`);
	};
	const NETFLIX_LOGO = useRecoilValue(NETFLIX_LOGO_URL);

	return (
		<Wrapper>
			<HelmetProvider>
				<Helmet>
					<title>홈 - 넷플릭스</title>
				</Helmet>
			</HelmetProvider>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<AnimatePresence>
						<OverlayMask
							onClick={onOverlayClick}
							exit={{ opacity: 0 }}
							animate={{ opacity: 1 }}
						/>
						<PopupDetail layoutId={type + id}>
							<PopupDetailCover
								bgphoto={
									data?.backdrop_path !== null
										? `https://image.tmdb.org/t/p/w500/${data?.backdrop_path}`
										: NETFLIX_LOGO
								}
							>
								{type === 'movie' && (
									<>
										<PopupDetailTitle>{data?.title}</PopupDetailTitle>
										<PopupThumbInfo>
											<p>개봉일: {data?.release_date}</p>
											<p>⭐️ {data?.vote_average}</p>
										</PopupThumbInfo>
									</>
								)}

								{type === 'tv' && (
									<>
										<PopupDetailTitle>{data?.original_name}</PopupDetailTitle>
										<PopupThumbInfo>
											<p>
												시작일: {data?.first_air_date} ~ 종료일:
												{data?.last_air_date}
											</p>
											<p>⭐️ {data?.vote_average}</p>
										</PopupThumbInfo>
									</>
								)}
							</PopupDetailCover>
							<PopupDetailOverview>
								<p>{data?.overview}</p>
							</PopupDetailOverview>

							<PopupSubInfo>
								<div>
									<span>Genres:</span>
									{data?.genres.map((data) => (
										<span>{data.name}</span>
									))}
								</div>
								<div>
									<span>Language:</span>
									{data?.original_language.toUpperCase()}
								</div>
							</PopupSubInfo>
						</PopupDetail>
					</AnimatePresence>
				</>
			)}
		</Wrapper>
	);
};

export default DetailsView;
