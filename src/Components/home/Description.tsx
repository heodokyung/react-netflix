import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	width: 100%;
`;

const DescContainer = styled.div`
	width: 100%;
`;

const DescContent = styled.div`
	padding: 80px 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	border-top: 8px solid rgb(25, 25, 25);
	@media (max-width: 768px) {
		padding: 30px 15px;
	}
`;

const DescSubContent = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 1280px;
	@media (max-width: 768px) {
		width: 100%;
		flex-direction: column;
	}
`;

const DescTitle = styled.div`
	color: white;
	flex: 0.8;
	padding: 0 75px;
	@media (max-width: 768px) {
		padding: 0;
		margin-bottom: 20px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		width: 100%;
	}
`;

const DescH1 = styled.h1`
	font-size: 46px;
	margin-bottom: 20px;
	line-height: 1.3;
	font-weight: bold;
	word-break: keep-all;
	@media (max-width: 768px) {
		font-size: 25px;
	}
`;

const DescP = styled.p`
	font-size: 27px;
	line-height: 1.6;
	@media (max-width: 768px) {
		font-size: 18px;
		line-height: 1.5;
	}
`;

const DescImageContainer = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	position: relative;
`;

const DescImage = styled.img`
	width: 520px;
	@media (max-width: 768px) {
		width: 100%;
		margin-bottom: 20px;
	}
`;

const DescVideoTV = styled.video`
	position: absolute;
	top: 49%;
	left: 49%;
	transform: translate(-50%, -50%);
	width: 382px;
	z-index: -1;
	@media (max-width: 768px) {
		top: 45%;
		width: 285px;
	}
`;

const DescVideoDevice = styled.video`
	position: absolute;
	top: 33%;
	left: 49.5%;
	transform: translate(-50%, -50%);
	width: 320px;
	z-index: -1;
	@media (max-width: 768px) {
		width: 250px;
	}
`;

const Description = () => {
	return (
		<Container>
			<DescContainer>
				<DescContent>
					<DescSubContent>
						<DescTitle>
							<DescH1>TV로 즐기세요.</DescH1>
							<DescP>
								스마트 TV, PlayStation, Xbox, Chromecast, Apple TV, 블루레이
								플레이어 등 다양한 디바이스에서 시청하세요.
							</DescP>
						</DescTitle>
						<DescImageContainer>
							<DescImage src={require('../../assets/icon_tv.png')} />
							<DescVideoTV
								src={require('../../assets/video_tv.m4v')}
								autoPlay
								muted
								loop
							></DescVideoTV>
						</DescImageContainer>
					</DescSubContent>
				</DescContent>
				<DescContent>
					<DescSubContent>
						<DescImageContainer>
							<DescImage src={require('../../assets/icon_mobile.jpg')} />
						</DescImageContainer>
						<DescTitle>
							<DescH1>
								즐겨 보는 콘텐츠를 저장해 오프라인으로 시청하세요.
							</DescH1>
							<DescP>간편하게 저장하고 빈틈없이 즐겨보세요.</DescP>
						</DescTitle>
					</DescSubContent>
				</DescContent>
				<DescContent>
					<DescSubContent>
						<DescTitle>
							<DescH1>다양한 디바이스에서 시청하세요.</DescH1>
							<DescP>
								각종 영화와 TV 프로그램을 스마트폰, 태블릿, 노트북, TV에서
								무제한으로 스트리밍하세요. 추가 요금이 전혀 없습니다.
							</DescP>
						</DescTitle>
						<DescImageContainer>
							<DescImage src={require('../../assets/icon_device.png')} />
							<DescVideoDevice
								src={require('../../assets/video_device.mp4')}
								autoPlay
								muted
								loop
							/>
						</DescImageContainer>
					</DescSubContent>
				</DescContent>
				<DescContent>
					<DescSubContent>
						<DescImageContainer>
							<DescImage src={require('../../assets/icon_kid.png')}></DescImage>
						</DescImageContainer>
						<DescTitle>
							<DescH1>어린이 전용 프로필을 만들어 보세요.</DescH1>
							<DescP>
								자기만의 공간에서 좋아하는 캐릭터와 즐기는 신나는 모험. 자녀에게
								이 특별한 경험을 선물하세요. 넷플릭스 회원이라면 무료입니다.
							</DescP>
						</DescTitle>
					</DescSubContent>
				</DescContent>
			</DescContainer>
		</Container>
	);
};

export default Description;
