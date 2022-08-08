import styled from 'styled-components';

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100vw;
	height: 90vh;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 20;
`;

const LoadingContainer = styled.span`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Title = styled.h1`
	color: white;
	font-size: 18px;
	margin-top: 10px;
`;

const Loader = () => {
	return (
		<Container>
			<LoadingContainer role='img' aria-label='Loading'>
				<img
					src={require('../assets/loading.svg').default}
					alt='loadingBar'
				></img>
				<Title>Loading...</Title>
			</LoadingContainer>
		</Container>
	);
};

export default Loader;
