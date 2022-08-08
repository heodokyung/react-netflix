import React from 'react';
import styled from 'styled-components';

const GototopButton = styled.button`
	position: fixed;
	bottom: 60px;
	right: 60px;
	z-index: 20;
	width: 50px;
	height: 50px;
	background: linear-gradient(to right, #536976, #292e49);
	border-radius: 50%;
	cursor: pointer;
	outline: none;
	border: none;
	box-shadow: rgb(0 0 0 / 50%) 0px 0px 3px 2px;
	@media (max-width: 768px) {
		width: 45px;
		height: 45px;
		bottom: 20px;
		right: 20px;
	}
`;
const BtnTopScroll = () => {
	return (
		<GototopButton onClick={() => window.scrollTo(0, 0)}>
			<i style={{ color: 'white', fontSize: '25px' }}>↑</i>
		</GototopButton>
	);
};

export default BtnTopScroll;
