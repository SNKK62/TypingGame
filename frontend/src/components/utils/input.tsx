import RawTextField from '@mui/material/TextField';
import Image1 from 'next/image';
import { useState } from 'react';

interface TextFieldProps {
  hidden?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
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
  // autoFocus = false,
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
    // height: height,
    width: width,
  };
  return (
    <RawTextField
      hidden={hidden}
      autoComplete={autoComplete}
      // autoFocus={autoFocus}
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
      // readOnly={readOnly}
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
  alt?: string;
  maxwidth?: number;
  id: string;
}

export const ImageInput: React.FC<ImageInputProps> = ({
  alt = '画像プレビュー',
  maxwidth = 300,
  id,
}) => {
  //event handler start
  const [imagePreview, setImagePreview] = useState<
    string | ArrayBuffer | null | undefined
  >(undefined);
  const [heightPixel, setHeightPixel] = useState(0);
  const [widthPixel, setWidthPixel] = useState(0);
  const onChangeFileInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setImagePreview(undefined);
    if (event.target.files?.length === 0) {
      return;
    }
    if (event.target.files?.[0] === undefined) {
      return;
    }
    if (!event.target.files?.[0].type.match('image.*')) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result);
      const image = new Image();
      image.src = e.target?.result as string;
      image.onload = () => {
        const originalWidth = image.width as number;
        const originalHeight = image.height as number;
        //画像のサイズに関する制限などはここに書けばよさそう
        if (originalWidth > originalHeight) {
          setWidthPixel(maxwidth);
          setHeightPixel((maxwidth * originalHeight) / originalWidth);
        } else {
          setHeightPixel(maxwidth);
          setWidthPixel((maxwidth * originalWidth) / originalHeight);
        }
      };
    };

    reader.readAsDataURL(event.target?.files[0]);
  };
  //event handler end
  return (
    <>
      <input
        type='file'
        accept='image/*'
        id={id}
        onChange={onChangeFileInput}
        hidden={true}
      />
      <output>
        <Image1
          src={imagePreview as string}
          alt={alt}
          width={widthPixel}
          height={heightPixel}
        />
      </output>
    </>
  );
};
