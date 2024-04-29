import { Typography } from '@mui/material';
interface TextProps {
  position?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
  children: React.ReactNode;
  htmlType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  fontSize?: number;
}

export const Text: React.FC<TextProps> = ({
  children,
  position = 'inherit',
  htmlType = 'p',
  fontSize,
}) => {
  const variant = htmlType === 'p' ? 'body1' : htmlType;
  const style = { width: '100%' };
  return (
    <Typography align={position} variant={variant} sx={style} fontSize={fontSize}>
      {children}
    </Typography>
  );
};
