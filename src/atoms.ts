import { atom } from 'recoil';

export const searchVisible = atom({
	key: 'searchVisible',
	default: false,
});

// 기본 넷플릭스 이미지
export const NETFLIX_LOGO_URL = atom({
	key: 'defaultSlideImg',
	default:
		'https://assets.brand.microsites.netflix.io/assets/2800a67c-4252-11ec-a9ce-066b49664af6_cm_800w.jpg?v=4',
});
