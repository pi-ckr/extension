import { useEffect, useState } from 'react';

function useTheme() {
	const [ currentTheme, setCurrentTheme ] = useState<'dark' | 'light'>(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

	useEffect(() => {
		const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

		function setTheme(e: MediaQueryListEvent) {
			const theme = e.matches ? 'dark' : 'light';
			document.body.dataset.theme = theme;
			setCurrentTheme(theme);
		}

		// 초기 테마 설정 (MediaQueryList를 사용)
		const initialTheme = mediaQueryList.matches ? 'dark' : 'light';
		document.body.dataset.theme = initialTheme;
		setCurrentTheme(initialTheme);

		// 테마 변경 이벤트 리스너 추가 (MediaQueryListEvent를 사용)
		mediaQueryList.addEventListener('change', setTheme);

		// Cleanup 리스너 제거
		return () => {
			mediaQueryList.removeEventListener('change', setTheme);
		};
	}, []);

	return currentTheme;
}

export default useTheme;
