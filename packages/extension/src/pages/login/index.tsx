import styles from './styles.module.scss';
import ArrowForwardIcon from '@pickr/shared/assets/arrow_forward.svg?react';
import Logo from '@pickr/shared/assets/logo.svg?react';
import { ColorPalette } from '@pickr/shared/lib/constant/ColorPalette.ts';
import { Button, SvgIcon, Typography } from '@pickr/shared/components/ui';

export default function Login() {
	const handleLogin = async () => {
		await chrome.windows.create({ url: `${ import.meta.env.VITE_BASE_URL }/login`, type: 'popup' });
	};

	return (
		<div className={ styles.container }>
			<div className={ styles.titleContainer }>
				<SvgIcon icon={ <Logo /> } color={ ColorPalette.Logo } width={ 100 } />
				<div className={ styles.typographyContainer }>
					<Typography.Label color={ ColorPalette.ContentPrimary }>내 맘대로 <span style={ {
						color: 'var(--color-accent-primary)',
					} }>픽</span>해서 공부하는 영단어</Typography.Label>
					<Typography.Label color={ ColorPalette.ContentPrimary }>피커에 오신걸 환영해요!</Typography.Label>
				</div>
			</div>
			<div className={ styles.loginContainer }>
				<Button className={ styles.loginButton } onClick={ handleLogin } padding={ [ 8, 15 ] } gap={ 10 }>
					<Typography.Label emphasized color={ ColorPalette.ContentPrimary }>Pickr 계정으로 계속하기</Typography.Label>
					<SvgIcon icon={ <ArrowForwardIcon /> } color={ ColorPalette.ContentPrimary } width={ 20 } height={ 20 } />
				</Button>
				<Typography.Body color={ ColorPalette.ContentSecondary }>피커는 로그인 후 이용하실 수 있어요.</Typography.Body>
			</div>
		</div>
	);
}
