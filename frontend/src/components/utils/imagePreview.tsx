import NextImage from 'next/image';
// import { useEffect, useState } from 'react';

interface ImagePreviewProps {
  image: string | undefined;
  alt?: string;
  maxWidth?: number;
  maxHeight?: number;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  image,
  alt = 'preview',
  maxWidth = 400,
}) => {
  return (
    <div
      style={{ maxWidth: `${maxWidth}px`, width: '100%', overflow: 'hidden' }}
    >
      <div style={{ paddingTop: '100%', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        >
          {image && (
            <NextImage
              src={image}
              alt={alt}
              layout='fill'
              objectFit='contain'
            />
          )}
        </div>
      </div>
    </div>
  );
};
