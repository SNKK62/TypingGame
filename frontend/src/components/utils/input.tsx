import RawTextField from '@mui/material/TextField';
import { useState } from 'react';

interface TextFieldProps {
  hidden?: boolean;
  autoComplete?: string;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  defaultvalue?: string;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  height?: string;
  id?: string;
  label?: string;
  maxRows?: number;
  multiline?: boolean;
  placehodler?: string;
  readOnly?: boolean;
  shrink?: boolean;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  width?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  hidden = false,
  autoComplete = 'off',
  color = 'secondary',
  defaultvalue,
  disabled = false,
  error = false,
  fullWidth = false,
  height,
  id = '',
  label = '',
  placehodler = '',
  multiline = false,
  maxRows = 10,
  readOnly = false,
  shrink = true,
  type = 'text',
  onChange,
  value,
  width,
}) => {
  const [isShrunk, setIsShrunk] = useState(shrink);
  const [isFocused, setIsFocused] = useState(false);
  const [isBlank, setIsBlank] = useState(!defaultvalue);
  const onFocus = () => {
    setIsShrunk(true);
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
    if (!shrink && isBlank) {
      setIsShrunk(false);
    }
  };
  const onMouseOver = () => {
    setIsShrunk(true);
  };
  const onMouseLeave = () => {
    if (!isFocused && isBlank) {
      setIsShrunk(false);
    }
  };
  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsBlank(!e.target.value.length);
    onChange(e);
  };
  const sxprops = {
    margin: '8px',
    width: width,
  };
  return (
    <RawTextField
      hidden={hidden}
      autoComplete={autoComplete}
      color={color}
      defaultValue={defaultvalue}
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
      label={label}
      sx={sxprops}
      placeholder={placehodler}
      multiline={multiline}
      maxRows={maxRows}
      type={type}
      InputLabelProps={{
        shrink: isShrunk,
      }}
      id={id}
      InputProps={{ sx: { height: height } }}
      inputProps={{ readOnly: readOnly }}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onChange={(e) => {
        _onChange(e as React.ChangeEvent<HTMLInputElement>);
      }}
      value={value}
    ></RawTextField>
  );
};

interface ImageInputProps {
  children?: React.ReactNode;
  id: string;
  onImageChange: (image: Blob) => void;
  maxSize?: number;
}

export const ImageInput: React.FC<ImageInputProps> = ({
  children,
  id,
  onImageChange,
  maxSize = Infinity,
}) => {
  const onChangeFileInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files?.length === 0) {
      return;
    } else if (event.target.files?.[0] === undefined) {
      return;
    } else if (!event.target.files?.[0].type.match('image.*')) {
      return;
    } else if (event.target.files?.[0].size > maxSize) {
      alert('画像のサイズが大きすぎます!');
      return;
    }
    onImageChange(event.target?.files?.[0]);
  };
  return (
    <>
      <input type='file' accept='image/*' id={id} onChange={onChangeFileInput} hidden={true} />
      {children}
    </>
  );
};
