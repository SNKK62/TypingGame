import RawSwitch from '@mui/material/Switch';

interface SwitchProps {
  // checkedIcon?: React.ReactNode;
  checked: boolean;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  disabled?: boolean;
  edge?: 'end' | 'start' | false;
  // icon?: string;
  id?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: 'medium' | 'small';
}

export const Switch: React.FC<SwitchProps> = ({
  // checkedIcon,
  checked,
  color = 'secondary',
  disabled = false,
  edge = false,
  // icon,
  id = '',
  size = 'medium',
  onChange,
}) => {
  return (
    <RawSwitch
      checked={checked}
      // checkedIcon={checkedIcon}
      color={color}
      disabled={disabled}
      edge={edge}
      // icon={icon}
      id={id}
      onChange={(e) => {
        onChange(e);
      }}
      size={size}
    />
  );
};
