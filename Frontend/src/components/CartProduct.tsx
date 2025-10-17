import React from 'react';
import ImageOrgan from './Atoms/ImageOrgan';
import TitreOrgan from './Atoms/TitreOrgan';
import { usePanier } from '../Context/PanierContext';
import type { Organ } from '../Context/PanierContext';


// 1. Définition du type pour l'organe (Organ est importé du Context, incluant price et quantity)
// NOTE: Nous réutilisons l'interface Organ du PanierContext
// export interface Organ { id: number; organ_Name: string; price: number; imageUrl: string; quantity: number; }

interface CartProductProps {
  organ: Organ; // L'objet complet du panier
}

// Styles
const productContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px',
  marginBottom: '10px',
  border: '1px solid #eee',
  borderRadius: '4px',
  backgroundColor: 'white',
};

const detailsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flexGrow: 1, // Prend plus d'espace
};

const controlsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
};

const priceStyle: React.CSSProperties = {
    fontWeight: 'bold',
    minWidth: '80px',
    textAlign: 'right',
};

const buttonStyle: React.CSSProperties = {
    padding: '5px 10px',
    backgroundColor: '#dc3545', // Rouge pour supprimer
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
};


const CartProduct: React.FC<CartProductProps> = ({ organ }) => {
  // Récupération des fonctions du contexte (elles doivent être codées dans PanierContext)
  const { removeFromCart, updateQuantity } = usePanier(); // On suppose que vous ajouterez ces fonctions

  const handleRemove = () => {
    // Appel de la fonction de suppression
    if (removeFromCart) {
        removeFromCart(organ.id);
    }
  };
    
  const handleQuantityChange = (delta: number) => {
    const newQuantity = organ.quantity + delta;
    if (newQuantity >= 1 && updateQuantity) {
        // Appel de la fonction de mise à jour (à coder dans PanierContext)
        updateQuantity(organ.id, newQuantity);
    }
  };

  const subtotal = (organ.price * organ.quantity).toFixed(2);

  return (
    <div style={productContainerStyle}>
        
        <div style={detailsStyle}>
            {/* ATOMS ImageOrgan */}
            <ImageOrgan imageUrl={organ.imageUrl} altText={organ.organ_Name} />
            
            {/* ATOMS TitreOrgan */}
            <div>
                <TitreOrgan organ_Name={organ.organ_Name} />
                <small>Prix unitaire: {organ.price.toFixed(2)} €</small>
            </div>
        </div>

        <div style={controlsStyle}>
            {/* Contrôles de Quantité */}
            <button 
                onClick={() => handleQuantityChange(-1)} 
                disabled={organ.quantity <= 1} 
                style={{ ...buttonStyle, backgroundColor: '#6c757d' }}
            >
                -
            </button>
            <span>{organ.quantity}</span>
            <button 
                onClick={() => handleQuantityChange(1)} 
                style={{ ...buttonStyle, backgroundColor: '#007bff' }}
            >
                +
            </button>
            
            {/* Sous-total */}
            <div style={priceStyle}>
                {subtotal} €
            </div>

            {/* Bouton Supprimer */}
            <button 
                onClick={handleRemove} 
                style={buttonStyle}
                title={`Supprimer ${organ.organ_Name} du panier`}
            >
                X
            </button>
        </div>
    </div>
  );
};

export default CartProduct;