import useTheme from '../hooks/useTheme';
import '../styles/global.scss';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
	useTheme();

	return (
		<>
			{ children }
		</>
	);
}
