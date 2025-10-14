
import { Request, Response } from 'express';

// interface CartProduct {
//      id: string;
//      productId: string;
//      name: string;
//      price: number;
//      quantity: number;
//  }


// Récupérer le panier
export const getPanier = (request, response) => {
    const panier = request.session.panier || { products: [], total: 0 };
    response.json(panier);
};

// Ajouter un article
export const ajouterProduct = (request, response) => {
    if (!request.session.panier) {
        request.session.panier = { products: [], total: 0 };
    }

    const { id, nom, prix, quantite } = request.body;
    
    // Vérifier si l'article existe déjà
    const productExistant = request.session.panier.articles.find(p => p.id === id);
    
    if (productExistant) {
        productExistant.quantite += quantite;
    } else {
        request.session.panier.products.push({ id, nom, prix, quantite });
    }
    
    // Recalculer le total
    request.session.panier.total = request.session.panier.articles.reduce(
        (sum, product) => sum + (product.prix * product.quantite), 0
    );
    
    response.json({ 
        message: 'Article ajouté', 
        panier: request.session.panier 
    });
};

// Mettre à jour la quantité
export const mettreAJourQuantite = (request, response) => {
    const { productId } = request.params;
    const { quantite } = request.body;
    
    if (!request.session.panier) {
        return response.status(404).json({ message: 'Panier vide' });
    }
    
    const product = request.session.panier.products.find(p => p.id === productId);
    
    if (!product) {
        return response.status(404).json({ message: 'Article non trouvé' });
    }
    
    product.quantite = quantite;
    
    // Recalculer le total
    request.session.panier.total = request.session.panier.products.reduce(
        (sum, p) => sum + (p.prix * p.quantite), 0
    );
    
    response.json({ 
        message: 'Quantité mise à jour', 
        panier: request.session.panier 
    });
};

// Supprimer un article
export const supprimerProduct = (request, response) => {
    const { productId } = request.params;
    
    if (!request.session.panier) {
        return response.status(404).json({ message: 'Panier vide' });
    }
    
    request.session.panier.products = request.session.panier.products.filter(
        p => p.id !== productId
    );
    
    // Recalculer le total
    request.session.panier.total = request.session.panier.products.reduce(
        (sum, p) => sum + (p.prix * p.quantite), 0
    );
    
    response.json({ 
        message: 'Article supprimé', 
        panier: request.session.panier 
    });
};

// Vider le panier
export const viderPanier = (request, response) => {
    request.session.panier = { products: [], total: 0 };
    response.json({ message: 'Panier vidé' });
};
