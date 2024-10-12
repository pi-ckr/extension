import { BaseProps, TypographyVariant } from './types.ts';
import { BaseTypography } from './base.tsx';

type BaseEmphasizedProps = BaseProps & {
	emphasized?: boolean
};

function Heading(props: BaseProps) {
	return (
		<BaseTypography { ...props } variant={ TypographyVariant.Heading }>
			{ props.children }
		</BaseTypography>
	);
}

function Display(props: BaseProps) {
	return (
		<BaseTypography { ...props } variant={ TypographyVariant.Display }>
			{ props.children }
		</BaseTypography>
	);
}

function LargeTitle(props: BaseProps) {
	return (
		<BaseTypography { ...props } variant={ TypographyVariant.LargeTitle }>
			{ props.children }
		</BaseTypography>
	);
}

function Title({ emphasized = false, ...props }: BaseEmphasizedProps) {
	return (
		<BaseTypography { ...props }
		                variant={ emphasized ? TypographyVariant.TitleEmphasized : TypographyVariant.Title }>
			{ props.children }
		</BaseTypography>
	);
}

function Headline({ emphasized = false, ...props }: BaseEmphasizedProps) {
	return (
		<BaseTypography { ...props }
		                variant={ emphasized ? TypographyVariant.HeadlineEmphasized : TypographyVariant.Headline }>
			{ props.children }
		</BaseTypography>
	);
}

function Label({ emphasized = false, ...props }: BaseEmphasizedProps) {
	return (
		<BaseTypography { ...props }
		                variant={ emphasized ? TypographyVariant.LabelEmphasized : TypographyVariant.Label }>
			{ props.children }
		</BaseTypography>
	);
}

function Body({ emphasized = false, ...props }: BaseEmphasizedProps) {
	return (
		<BaseTypography { ...props }
		                variant={ emphasized ? TypographyVariant.BodyEmphasized : TypographyVariant.Body }>
			{ props.children }
		</BaseTypography>
	);
}

function Caption({ emphasized = false, ...props }: BaseEmphasizedProps) {
	return (
		<BaseTypography { ...props }
		                variant={ emphasized ? TypographyVariant.CaptionEmphasized : TypographyVariant.Caption }>
			{ props.children }
		</BaseTypography>
	);
}

const Typography = {
	Heading,
	Display,
	LargeTitle,
	Title,
	Headline,
	Label,
	Body,
	Caption,
};

export default Typography;
