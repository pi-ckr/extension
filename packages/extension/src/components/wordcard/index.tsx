import styles from './styles.module.scss';
import { useState } from 'react';
import { Typography } from '@pickr/shared/components/ui';
import { ColorPalette } from '@pickr/shared/lib/constant/ColorPalette.ts';

interface Props {
	eng: string;
	kor: string;
	className?: string;
}

export default function WordCard({ eng, kor, className }: Props) {
	const [ isCopied, setIsCopied ] = useState(false);

	return (
		<div className={ [ styles.container, className ].join(' ') } onClick={ () => {
			navigator.clipboard.writeText(eng + ': ' + kor).then(() => {
				setIsCopied(true);
				setTimeout(() => {
					setIsCopied(false);
				}, 1000);
			});
		} }>
			<Typography.Headline color={ ColorPalette.ContentPrimary } emphasized={ true }>{ eng }</Typography.Headline>
			<Typography.Body color={ ColorPalette.ContentInvert }>{ kor }</Typography.Body>
			{
				isCopied && (
					<div className={ styles.copied }>
						<Typography.Body color={ ColorPalette.ContentPrimary }>복사되었습니다.</Typography.Body>
					</div>
				)
			}
		</div>
	);
}