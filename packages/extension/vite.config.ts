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
			'~': path.resolve(__dirname, './src'),
			'@pickr/shared': path.resolve(__dirname, '../shared'),
		},
	},
});
