import styles from './styles.module.scss';
import Logo from '@pickr/shared/assets/logo.svg';
import { SvgIcon, Typography } from '@pickr/shared/components/ui';
import { useEffect, useState } from 'react';
import { useChromeStorageLocal } from 'use-chrome-storage';
import Login from '../login';
import { WordCard } from '../../components';
import { ColorPalette } from '@pickr/shared/lib/constant/ColorPalette.ts';

function Main() {
	const [ userInfo ] = useChromeStorageLocal<string | undefined | null>('userInfo', undefined);

	const [ word, setWord ] = useState(0);

	useEffect(() => {
		let startTime: number;
		const duration = 1000;
		const targetValue = 36;

		const animate = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const progress = Math.min((timestamp - startTime) / duration, 1);
			setWord(Math.floor(progress * targetValue));

			if (progress < 1) {
				requestAnimationFrame(animate);
			}
		};

		const animationFrame = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(animationFrame);
	}, []);

	// const [ test, setTest ] = useChromeStorageLocal('test', '');

	return (
		<>
			{
				userInfo ? (
					<div className={ styles.container }>
						<button onClick={ async () => {
							await chrome.storage.local.clear();
						} }>클리어!
						</button>
						<div className={ styles.mainContainer }>
							<header>
								<SvgIcon icon={ <Logo /> } color={ ColorPalette.Logo } width={ 72 } />
								<div className={ styles.profile }>
									<div className={ styles.profileImage } />
									<Typography.Label color={ ColorPalette.AccentPrimary } emphasized={ true }>
										{ userInfo }
									</Typography.Label>
								</div>
							</header>
							<div className={ styles.goalContainer }>
								<div className={ styles.headlineContainer }>
									<Typography.Heading color={ ColorPalette.ContentPrimary }>오늘의 목표</Typography.Heading>
									<div className={ styles.tagContainer }>
										<Typography.Label color={ ColorPalette.AccentPrimary } className={ styles.headlineTag }>
											30일 넘김
										</Typography.Label>
										<Typography.Label
											color={ ColorPalette.ContentSecondary }
											className={ styles.headlineTag }>
											일찍 일어나는 새
										</Typography.Label>
									</div>
								</div>
							</div>
							<div className={ styles.progressContainer }>
								<div className={ styles.progressHeadlineContainer }>
									<Typography.Label color={ ColorPalette.AccentPrimary } emphasized={ true }>
										선택됨
									</Typography.Label>
									<Typography.Label color={ ColorPalette.ContentSecondary }>{ word } / 40 단어</Typography.Label>
								</div>
								<div className={ styles.progress }>
									<div className={ styles.progressBar } />
								</div>
							</div>
						</div>
						<div className={ styles.listContainer }>
							<div className={ styles.listHeadlineContainer }>
								<Typography.Title color={ ColorPalette.ContentPrimary } emphasized={ true }>
									픽한 리스트
								</Typography.Title>
								<Typography.Title color={ ColorPalette.AccentPrimary }>12</Typography.Title>
								<div
									style={ {
										flexGrow: 1,
										height: '2px',
										backgroundColor: `#DFCFD61F`,
									} }
								></div>
							</div>
							<div className={ styles.wordList }>
								{ Array.from({ length: 12 }).map((_, index) => (
									<WordCard key={ index } eng={ 'work' } kor={ '일하다' } className={ styles.word } />
								)) }
							</div>
						</div>
					</div>
				) : (
					<Login />
				)
			}
		</>
	);
}

export default Main;
