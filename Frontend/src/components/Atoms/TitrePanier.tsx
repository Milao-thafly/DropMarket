import React from 'react';

// Define props
interface TitrePanierProps {
  titre?: string;
}

const TitrePanier: React.FC<TitrePanierProps> = ({ titre = 'Panier' }) => {
  const style: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '20px 0',
    fontFamily: 'Arial, sans-serif'
  };

  return (
    <div style={style}>
      {titre}
    </div>
  );
};

export default TitrePanier;