import RawSwitch from '@mui/material/Switch';
import { useState } from 'react';

interface SwitchProps {
  // checkedIcon?: React.ReactNode;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  defaultChecked?: boolean;
  disabled?: boolean;
  edge?: 'end' | 'start' | false;
  // icon?: string;
  id: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: 'medium' | 'small';
  forcedOff?: boolean;
  forcedOn?: boolean;
  forcedDisabled?: boolean;
  forcedAbled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  // checkedIcon,
  color = 'secondary',
  defaultChecked = false,
  disabled = false,
  edge = false,
  // icon,
  id,
  size = 'medium',
  forcedOff = false,
  forcedOn = false,
  forcedDisabled = false,
  forcedAbled = false,
  onChange = () => {},
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  const [disablity, setDisablity] = useState(disabled);
  const onSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  if (forcedOn && !checked) {
    setChecked(true);
  }
  if (forcedOff && checked) {
    setChecked(false);
  }
  if (forcedDisabled && !disablity) {
    setDisablity(true);
  }
  if (forcedAbled && disablity) {
    setDisablity(false);
  }
  return (
    <RawSwitch
      checked={checked}
      // checkedIcon={checkedIcon}
      color={color}
      disabled={disablity}
      edge={edge}
      // icon={icon}
      id={id}
      onChange={(e) => {
        onSwitch(e);
        onChange(e);
      }}
      size={size}
    />
  );
};
