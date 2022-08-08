import { useEffect, useState } from 'react';

const useInfiniteScroll = () => {
	const [page, setPage] = useState(1);

	const handleScroll = () => {
		const scrollTop = document.documentElement.scrollTop;
		const innerHeight = window.innerHeight;
		const scrollHeight = document.documentElement.scrollHeight;

		if (scrollTop + innerHeight >= scrollHeight) {
			setPage((page) => page + 1);
		}
		return;
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return page;
};

export default useInfiniteScroll;
