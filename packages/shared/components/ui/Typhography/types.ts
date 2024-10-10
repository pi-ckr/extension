import { ReactNode } from 'react';
import { ColorPalette } from '../../../lib/constant/ColorPalette.ts';

export const enum TypographyVariant {
	Heading = 'heading',
	Display = 'display',
	LargeTitle = 'largeTitle',
 
	Title = 'title',
	TitleEmphasized = 'titleEmphasized',

	Headline = 'headline',
	HeadlineEmphasized = 'headlineEmphasized',

	Label = 'label',
	LabelEmphasized = 'labelEmphasized',

	Body = 'body',
	BodyEmphasized = 'bodyEmphasized',

	Caption = 'caption',
	CaptionEmphasized = 'captionEmphasized',
}

export type BaseProps = {
	color: ColorPalette;
	onClick?: () => void;
	className?: string;
	children: ReactNode;
};