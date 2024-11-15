'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Login() {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ error, setError ] = useState('');

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setError('');

		try {
			const formData = new URLSearchParams();
			formData.append('username', username);
			formData.append('password', password);

			const response = await fetch('https://pickr.apne2a.algorix.cloud/api/users/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: formData.toString(),
			});

			if (!response.ok) {
				throw new Error('로그인에 실패했습니다.');
			}

			const data = await response.json();

			const loginEvent = new CustomEvent('pickr-login', {
				detail: {
					username,
					accessToken: data.access_token,
				},
			});

			document.dispatchEvent(loginEvent);
			console.log('로그인 성공:', data);

		} catch (err) {
			setError(err?.toString() || '로그인에 실패했습니다.');
			console.error('로그인 에러:', err);
		}
	};

	return (
		<div className={ styles.page }>
			<div className={ styles.container }>
				<h1 className={ styles.title }>로그인을 진행해주세요</h1>
				<form className={ styles.form } onSubmit={ handleSubmit }>
					<div className={ styles.inputGroup }>
						<input
							type="text"
							placeholder="사용자 이름"
							className={ styles.input }
							value={ username }
							onChange={ (e) => setUsername(e.target.value) }
							required
						/>
						<div className={ styles.inputUnderline }></div>
					</div>
					<div className={ styles.inputGroup }>
						<input
							type="password"
							placeholder="비밀번호를 입력해주세요"
							className={ styles.input }
							value={ password }
							onChange={ (e) => setPassword(e.target.value) }
							required
						/>
						<div className={ styles.inputUnderline }></div>
					</div>
					{ error && <div className={ styles.error }>{ error }</div> }
					<button type="submit" className={ styles.button }>
						계속하기
					</button>
				</form>
			</div>
		</div>
	);
}
