import React from 'react';
import styles from './styles.module.scss';
import { BaseProps, TypographyVariant } from './types.ts';

type BaseTypographyProps = BaseProps & {
	variant: TypographyVariant;
};

export function BaseTypography({ children, color, variant, className, onClick }: BaseTypographyProps) {
	return children ? (
		<div className={ [ className, styles[variant] ].join(' ') } style={ {
			color: `var(${ color })`,
		} } onClick={ onClick }>
			{ children }
		</div>
	) : (
		<></>
	);
}