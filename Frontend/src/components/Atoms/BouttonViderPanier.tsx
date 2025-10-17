import React from 'react';

// Props
interface BoutonViderPanierProps {
  // Fonction On click
  onClick: () => void; 
  label?: string; 
  disabled?: boolean;
}

// styles
const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#D9534F', // Rouge pour l'action "danger LOL"
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease',
  fontFamily: 'Arial, sans-serif'
};

const disabledStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
};


const BoutonViderPanier: React.FC<BoutonViderPanierProps> = ({ 
  label = 'Vider le Panier', 
  onClick, 
  disabled = false 
}) => {
  // style en fonction de l'état
  const currentStyle = disabled ? disabledStyle : buttonStyle;

  return (
    <button 
      style={currentStyle}
      onClick={onClick}
      disabled={disabled}
      title={disabled ? "Le panier est vide." : label} // Warning
    >
      {label}
    </button>
  );
};

export default BoutonViderPanier;