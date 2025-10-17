import React, { useContext } from 'react';
import { PanierContext } from '../../Context/PanierContext'; 
import type { Organ } from '../../Context/PanierContext';

// 1. Définition du Type de l'Organe/Produit (pour être passé au contexte)
interface OrganToAdd {
  organe_id: number;
  organ_Name: string;
  price: number;
  imageUrl: string; // Utile pour l'affichage dans le panier
  // Ajoutez d'autres propriétés nécessaires (ex: quantity, description, etc.)
}

// 2. Définition des Props de l'Atome
interface BoutonAjouterProps {
  organ: OrganToAdd; // L'objet complet que le bouton va ajouter
  label?: string;
}

// 3. Style (simple)
const buttonStyle: React.CSSProperties = {
  padding: '8px 15px',
  backgroundColor: '#5CB85C', // Vert pour l'action "succès/ajouter"
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const BoutonAjouterAuPanier: React.FC<BoutonAjouterProps> = ({ 
  organ, 
  label = 'Ajouter au Panier' 
}) => {
  // Récupération de la fonction d'ajout depuis le contexte
  const { addToCart } = useContext(PanierContext);

  const handleAjouter = () => {
    if (addToCart) {
      // 💡 Appel de la fonction du contexte avec l'organe/produit
      addToCart(organ);
      console.log(`Ajouté au panier: ${organ.organ_Name}`);
    } else {
      console.error("addToCart n'est pas disponible dans le contexte.");
    }
  };

  return (
    <button 
      style={buttonStyle}
      onClick={handleAjouter}
    >
      {label}
    </button>
  );
};

export default BoutonAjouterAuPanier;