import styled from 'styled-components';

const QnAContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 70px 0px;
	border-top: 8px solid rgb(25, 25, 25);
	width: 100%;
	@media (max-width: 768px) {
		padding: 30px 15px;
	}
`;

const QnAContent = styled.div`
	width: 800px;
	@media (max-width: 768px) {
		width: 100%;
	}
`;

const QnATitle = styled.h1`
	color: white;
	font-size: 42px;
	text-align: center;
	@media (max-width: 768px) {
		font-size: 27px;
	}
`;

const QnASection = styled.div`
	margin-top: 65px;
	@media (max-width: 768px) {
		margin-top: 30px;
	}
`;

const QnASubSection = styled.div``;

const QnASubTitle = styled.div`
	color: white;
	background-color: #303030;
	padding: 28px 0px;
	padding-left: 20px;
	padding-right: 20px;
	font-size: 24px;
	position: relative;
	cursor: pointer;
	margin-bottom: 10px;
	@media (max-width: 768px) {
		padding: 20px 15px;
		font-size: 16px;
	}
`;

const QnASubDesc = styled.div`
	color: white;
	background-color: #303030;
	font-size: 21px;
	line-height: 1.6;
	border-top: 1px solid black;
	position: absolute;
	top: 0;
	left: 0;
	height: 0px;
	overflow: hidden;
	box-sizing: border-box;
	z-index: -1;
	padding-top: 30px;
	&.active {
		position: static;
		height: 240px;
		margin-top: 25px;
		transition: 0.3s;
	}
	@media (max-width: 768px) {
		margin-top: 20px;
		padding: 0;
		padding-top: 20px;
		font-size: 15px;
		&.active {
			height: 240px;
		}
	}
`;

const handleQnATitle = (event: any) => {
	event.target.children[0].classList.toggle('active');
};

const QnA = () => {
	return (
		<QnAContainer>
			<QnAContent>
				<QnATitle>자주 묻는 질문</QnATitle>
				<QnASection>
					<QnASubSection>
						<QnASubTitle onClick={handleQnATitle}>
							넷플릭스란 무엇인가요?
							<QnASubDesc>
								넷플릭스는 각종 수상 경력에 빛나는 TV 프로그램, 영화,
								애니메이션, 다큐멘터리 등 다양한 콘텐츠를 인터넷 연결이 가능한
								수천 종의 디바이스에서 시청할 수 있는 스트리밍 서비스입니다.
								<br />
								<br />
								저렴한 월 요금으로 일체의 광고 없이 원하는 시간에 원하는 만큼
								즐길 수 있습니다. 무궁무진한 콘텐츠가 준비되어 있으며 매주
								새로운 TV 프로그램과 영화가 제공됩니다.
							</QnASubDesc>
						</QnASubTitle>
						<QnASubTitle onClick={handleQnATitle}>
							넷플릭스 요금은 얼마인가요?
							<QnASubDesc>
								스마트폰, 태블릿, 스마트 TV, 노트북, 스트리밍 디바이스 등 다양한
								디바이스에서 월정액 요금 하나로 넷플릭스를 시청하세요.
								<br />
								<br />
								멤버십 요금은 월 9,500원부터 14,500원까지 다양합니다.
								<br />
								추가 비용이나 약정이 없습니다.
							</QnASubDesc>
						</QnASubTitle>
						<QnASubTitle onClick={handleQnATitle}>
							어디에서 시청할 수 있나요?
							<QnASubDesc>
								다양한 디바이스에서 언제 어디서나 시청할 수 있습니다.
								<br />
								<br />
								넷플릭스 계정으로 로그인하면 PC에서 netflix.com을 통해 바로
								시청할 수 있으며, 인터넷이 연결되어 있고 넷플릭스 앱을 지원하는
								디바이스(스마트 TV, 스마트폰, 태블릿, 스트리밍 미디어 플레이어,
								게임 콘솔 등)에서도 언제든지 시청할 수 있습니다.
							</QnASubDesc>
						</QnASubTitle>
						<QnASubTitle onClick={handleQnATitle}>
							멤버십을 해지하려면 어떻게 하나요?
							<QnASubDesc>
								넷플릭스는 부담 없이 간편합니다. 성가신 계약도, 약정도
								없으니까요.
								<br />
								멤버십 해지도 온라인에서 클릭 두 번이면 완료할 수 있습니다.
								<br />
								<br />
								해지 수수료도 없으니 원할 때 언제든 계정을 시작하거나
								종료하세요.
							</QnASubDesc>
						</QnASubTitle>
						<QnASubTitle onClick={handleQnATitle}>
							넷플릭스에서 어떤 콘텐츠를 시청할 수 있나요?
							<QnASubDesc>
								넷플릭스는 장편 영화, 다큐멘터리, TV 프로그램, 애니메이션, 각종
								상을 수상한 넷플릭스 오리지널 등 수많은 콘텐츠를 확보하고
								있습니다.
								<br />
								<br />
								마음에 드는 콘텐츠를 원하는 시간에 원하는 만큼 시청하세요.
							</QnASubDesc>
						</QnASubTitle>
					</QnASubSection>
				</QnASection>
			</QnAContent>
		</QnAContainer>
	);
};

export default QnA;
