import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [ react({
		jsxImportSource: 'react',
	}), svgr() ],
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler', // or "modern"
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'), // 경로 별칭 설정 (선택 사항)
		},
	},
});
