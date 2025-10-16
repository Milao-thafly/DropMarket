import React, { useState, createContext, useContext, useMemo, useEffect } from 'react';

// 1. Définition des Types de Base
export interface Organ {
  id: number;
  organ_Name: string;
  price: number;
  imageUrl: string; 
  quantity: number; 
}

// Type utilisé pour l'ajout (sans la quantité/OMIT betch)
type OrganToAdd = Omit<Organ, 'quantity'>;

// 2. Définition des Types du Contexte (MIS À JOUR)
interface PanierContextType {
  cart: Organ[];
  cartTotal: number; // Nouveau: Valeur calculée du total
  addToCart: (organ: OrganToAdd) => void;
  clearCart: () => void;
  removeFromCart: (organId: number) => void; 
  updateQuantity: (organId: number, newQuantity: number) => void;
  // TODO: Ajoutez ici des fonctions pour la synchronisation Back-End (syncCartWithServer)
}

// Clé de stockage local pour persistance (utile avant connexion)
const LOCAL_STORAGE_KEY = 'organShopCart';


// 3. Création du Contexte
// J'utilise 'as PanierContextType' pour éviter de mettre 'null' dans le createContext, 
// car on garantit que le Provider est toujours utilisé (via usePanier hook).
export const PanierContext = createContext<PanierContextType>({} as PanierContextType); 


// 4. Hook personnalisé (Sécurisé)
export const usePanier = () => {
  const context = useContext(PanierContext);
  if (context === undefined) {
    throw new Error('usePanier doit être utilisé à l\'intérieur d\'un PanierProvider');
  }
  return context;
};


// 5. Le Provider (Logique Complète)
export const PanierProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  // Initialisation du panier à partir du Local Storage (pour persistance non-connectée)
  const [cart, setCart] = useState<Organ[]>(() => {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return localData ? JSON.parse(localData) : [];
  });

  // --------------------------------------------------
  // A. Logique des Fonctions de Modification (IMMUTABLES)
  // --------------------------------------------------

  // Ajout ou Incrémentation
  const addToCart = (newOrgan: OrganToAdd) => {
    setCart(prevCart => {
      const existingOrgan = prevCart.find(item => item.id === newOrgan.id);

      if (existingOrgan) {
        // Incrémente la quantité
        return prevCart.map(item =>
          item.id === newOrgan.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Ajout avec quantité 1
        return [...prevCart, { ...newOrgan, quantity: 1 }];
      }
    });
  };

  // Suppression
  const removeFromCart = (organId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== organId));
  };
    
  // Mise à Jour de la Quantité
  const updateQuantity = (organId: number, newQuantity: number) => {
    // Bloque la quantité à 1 au minimum
    if (newQuantity < 1) return;

    setCart(prevCart => prevCart.map(item =>
      item.id === organId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  // Vider le panier
  const clearCart = () => setCart([]);

  // --------------------------------------------------
  // B. Valeur Dérivée (Total)
  // --------------------------------------------------

  // Calcul du total optimisé avec useMemo
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);


  // --------------------------------------------------
  // C. Effet de bord (Local Storage)
  // --------------------------------------------------

  // Synchronise le panier avec le Local Storage à chaque modification
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
    // TODO: C'est ici que l'on déclenchera l'appel API (syncCartWithServer) si l'utilisateur est connecté.
  }, [cart]);


  // --------------------------------------------------
  // D. Exposition de la Valeur
  // --------------------------------------------------

  const contextValue = useMemo(() => ({
    cart, 
    cartTotal,
    addToCart, 
    clearCart, 
    removeFromCart, 
    updateQuantity 
  }), [cart, cartTotal, addToCart, clearCart, removeFromCart, updateQuantity]);

  return (
    <PanierContext.Provider value={contextValue}>
      {children}
    </PanierContext.Provider>
  );
};