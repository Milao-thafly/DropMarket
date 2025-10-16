// ImageOrgan.tsx
import React from 'react';

// Define the shape (type) of the component's props
interface ImageOrganProps {
  imageUrl?: string;
  altText?: string;
}

const ImageOrgan: React.FC<ImageOrganProps> = ({ imageUrl, altText = 'Organ Image' }) => {
  const containerStyle: React.CSSProperties = {
    width: '150px',
    height: '150px',
    border: '2px solid #000',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Arial, sans-serif'
  };

  const imageStyle: React.CSSProperties = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
    borderRadius: '8px'
  };

  return (
    <div style={containerStyle}>
      {imageUrl ? (
        // Note: In TSX, we use the standard HTML <img> tag
        <img src={imageUrl} alt={altText} style={imageStyle} />
      ) : (
        <p>Pics organ</p>
      )}
    </div>
  );
};

export default ImageOrgan;