import React, { ReactNode } from 'react';
import styles from './styles.module.scss';

type Padding = [ number ] | [ number, number ] | [ number, number, number, number ];

interface Props {
	children: ReactNode;
	className?: string;
	onClick?: () => void;
	padding: Padding;
	gap?: number;
	flexDirection?: 'row' | 'column';
}

export default function Button({
	                               children,
	                               className,
	                               onClick,
	                               padding,
	                               gap,
                               }: Props) {
	const calculatePadding = (padding: Padding) => {
		if (padding.length === 1) {
			return `${ padding[0] }px`;
		}

		if (padding.length === 2) {
			return `${ padding[0] }px ${ padding[1] }px`;
		}

		if (padding.length === 4) {
			return `${ padding[0] }px ${ padding[1] }px ${ padding[2] }px ${ padding[3] }px`;
		}
	};

	return (
		<div className={ [ className, styles.container ].join(' ') } onClick={ onClick } style={ {
			padding: calculatePadding(padding),
			gap: `${ gap }px`,
		} }>
			{ children }
		</div>
	);
}