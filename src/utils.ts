export function makeImagePath(id: string, format?: string) {
	// 이미지 로드 속도 이슈를 위해 이미지 로드 크기 제한(original -> X), format:w500
	return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`;
	// return `https://image.tmdb.org/t/p/w500/${id}`;
}
