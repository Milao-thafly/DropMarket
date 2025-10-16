import React from 'react';
import TitrePanier from '../Atoms/TitrePanier'; 
import BoutonViderPanier from '../Atoms/BouttonViderPanier';
import CartProduct from '../CartProduct';

// Le hook pour accéder à l'état du panier
import { usePanier } from '../../Context/PanierContext'; 

// --- Styles de base (à separer et styler apres!!) ---
const pageStyle: React.CSSProperties = {
  maxWidth: '800px',
  margin: '40px auto',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
};

const emptyCartStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '50px',
  color: '#888',
};

const totalContainerStyle: React.CSSProperties = {
    marginTop: '20px',
    paddingTop: '15px',
    borderTop: '1px solid #eee',
    textAlign: 'right',
    fontSize: '20px',
    fontWeight: 'bold',
};

// --- Composant Principal PanierPage ---

const PanierPage: React.FC = () => {
  // 1. Accès au Contexte
  const { cart, clearCart } = usePanier(); 
  
  // 2. Calcul du Total
  // Fonction temporaire pour calculer le prix total
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  const total = calculateTotal();
  const isCartEmpty = cart.length === 0;

  return (
    <div style={pageStyle}>
      
      <TitrePanier titre="Votre Panier d'Organes (Réactifs!)" />

      {isCartEmpty ? (
        // Affiche un message si le panier est vide
        <div style={emptyCartStyle}>
          Votre Panier est vide. Ajoutez des organes avant qu'ils ne soient périmés !
        </div>
      ) : (
        // Affiche le contenu du panier
        <>
          {/* 3. Liste des articles */}
          <div>
            {cart.map((item) => (
              // ATTENTION: On passe l'item COMPLET (avec price et quantity) au CartProduct
              // Il faudra mettre à jour votre CartProduct.tsx pour afficher price et quantity.
              <CartProduct key={item.id} organ={item} />
            ))}
          </div>

          {/* 4. Total et Actions */}
          <div style={totalContainerStyle}>
              Total Panier: {total} €
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            
            <BoutonViderPanier 
              onClick={clearCart} 
              disabled={isCartEmpty} 
            />

            {/* Bouton Prochaine Étape (Passer à la Commande) */}
            <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Procéder à la Commande
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PanierPage;