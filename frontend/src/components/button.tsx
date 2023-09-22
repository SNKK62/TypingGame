import RawButton from '@mui/material/Button';

interface ButtonProps {
  variant?: 'text' | 'contained' | 'outlined';
  disabled?: boolean;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  startIcon?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  href?: string;
  width?: string;
  height?: string;
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  disabled = false,
  color = 'secondary',
  startIcon,
  size = 'medium',
  href = '',
  width,
  height,
  onClick,
  children,
}) => {
  const sxProperty: object = {
    width: width,
    height: height,
  };
  return (
    <RawButton
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      color={color}
      startIcon={startIcon}
      size={size}
      href={href}
      sx={sxProperty}
    >
      {children}
    </RawButton>
  );
};
