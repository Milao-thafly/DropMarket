// TitreOrgan.tsx
import React from 'react';

// Define props
interface TitreOrganProps {
  organ_Name?: string;
}

// Define styles OUTSIDE the component for performance
const organTitleStyle: React.CSSProperties = {
  padding: '10px 20px',
  border: '2px solid #000',
  borderRadius: '5px',
  minWidth: '200px',
  textAlign: 'left',
  fontSize: '16px',
  fontFamily: 'Arial, sans-serif'
};

const TitreOrgan: React.FC<TitreOrganProps> = ({ organ_Name = 'organ_Name' }) => {
  return (
    <div style={organTitleStyle}>
      {organ_Name}
    </div>
  );
};

export default TitreOrgan;