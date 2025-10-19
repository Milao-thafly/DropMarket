import React from 'react';
import TitrePanier from '../Atoms/TitrePanier'; 
import BoutonViderPanier from '../Atoms/BouttonViderPanier';
import CartProduct from '../CartProduct';
import { usePanier } from '../../Context/PanierContext';

// --- Styles de base ---
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

  // 2. Créer un safeCart pour éviter undefined
        const safeCart = cart ?? [];

  // 3. Calcul du total
  const total = safeCart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  // 4. Vérification si le panier est vide
  const isCartEmpty = safeCart.length === 0;

  return (
    <div style={pageStyle}>
      <TitrePanier titre="Votre Panier d'Organes (Réactifs!)" />

      {isCartEmpty ? (
        <div style={emptyCartStyle}>
          Votre Panier est vide. Ajoutez des organes avant qu'ils ne soient périmés !
        </div>
      ) : (
        <>
          {/* Liste des articles */}
          <div>
            {safeCart.map(item => (
              <CartProduct key={item.id} organ={item} />
            ))}
          </div>

          {/* Total */}
          <div style={totalContainerStyle}>
            Total Panier: {total} €
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <BoutonViderPanier onClick={clearCart} disabled={isCartEmpty} />
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Procéder à la Commande
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PanierPage;
