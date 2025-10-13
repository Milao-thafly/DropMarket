// import { Request, Response } from 'express';

// // Structure de données simple pour un article dans le panier (à adapter à votre DB)
// interface CartItem {
//     id: string;
//     productId: string;
//     name: string;
//     price: number;
//     quantity: number;
// }

// // Simule une base de données de paniers stockée en mémoire (POUR TEST UNIQUEMENT)
// const mockCarts: { [userId: string]: CartItem[] } = {};

// /**
//  * Récupère le panier d'un utilisateur spécifique.
//  * Dans une application réelle, vous utiliseriez l'ID utilisateur authentifié (req.user.id).
//  */
// export const getPanier = (req: Request, res: Response) => {
//     // ID utilisateur simulé pour l'exemple (à remplacer par l'ID réel)
//     const userId = req.params.userId || 'guest_user_123';
    
//     const panier = mockCarts[userId] || [];

//     // Tri simple pour l'affichage
//     panier.sort((a, b) => a.name.localeCompare(b.name));
    
//     console.log(`Panier récupéré pour l'utilisateur ${userId}`);
    
//     return res.status(200).json({
//         userId: userId,
//         items: panier,
//         totalItems: panier.reduce((acc, item) => acc + item.quantity, 0)
//     });
// };

// /**
//  * Ajoute un nouvel article au panier ou incrémente sa quantité.
//  */
// export const ajouterArticle = (req: Request, res: Response) => {
//     const { productId, name, price, quantity = 1 } = req.body;
//     const userId = req.params.userId || 'guest_user_123';

//     if (!productId || !name || !price) {
//         return res.status(400).json({ message: "Les informations de l'article sont manquantes." });
//     }

//     if (!mockCarts[userId]) {
//         mockCarts[userId] = [];
//     }

//     const existingItemIndex = mockCarts[userId].findIndex(item => item.productId === productId);

//     if (existingItemIndex > -1) {
//         // L'article existe : incrémenter la quantité
//         mockCarts[userId][existingItemIndex].quantity += quantity;
//         console.log(`Quantité mise à jour pour le produit ${productId}`);
//     } else {
//         // Nouvel article : l'ajouter
//         const newItem: CartItem = {
//             id: Date.now().toString(), // ID unique simulé
//             productId,
//             name,
//             price,
//             quantity
//         };
//         mockCarts[userId].push(newItem);
//         console.log(`Nouvel article ajouté: ${name}`);
//     }

//     return res.status(201).json({ message: 'Article ajouté au panier avec succès.', item: req.body });
// };

// /**
//  * Met à jour la quantité d'un article spécifique dans le panier.
//  */
// export const mettreAJourQuantite = (req: Request, res: Response) => {
//     const { itemId } = req.params; // L'ID de l'article dans le panier
//     const { quantity } = req.body;
//     const userId = req.params.userId || 'guest_user_123';

//     if (typeof quantity !== 'number' || quantity < 1) {
//         return res.status(400).json({ message: "La quantité doit être un nombre valide supérieur à 0." });
//     }

//     if (!mockCarts[userId]) {
//         return res.status(404).json({ message: "Panier non trouvé." });
//     }

//     const itemToUpdate = mockCarts[userId].find(item => item.id === itemId);

//     if (itemToUpdate) {
//         itemToUpdate.quantity = quantity;
//         console.log(`Quantité de l'article ${itemId} mise à jour à ${quantity}.`);
//         return res.status(200).json({ message: 'Quantité mise à jour.', item: itemToUpdate });
//     } else {
//         return res.status(404).json({ message: "Article non trouvé dans le panier." });
//     }
// };

// /**
//  * Supprime un article du panier.
//  */
// export const supprimerArticle = (req: Request, res: Response) => {
//     const { itemId } = req.params; // L'ID de l'article dans le panier
//     const userId = req.params.userId || 'guest_user_123';

//     if (!mockCarts[userId]) {
//         return res.status(404).json({ message: "Panier non trouvé." });
//     }

//     const initialLength = mockCarts[userId].length;
    
//     // Filtrer pour supprimer l'article correspondant
//     mockCarts[userId] = mockCarts[userId].filter(item => item.id !== itemId);

//     if (mockCarts[userId].length < initialLength) {
//         console.log(`Article ${itemId} supprimé du panier.`);
//         return res.status(200).json({ message: 'Article supprimé du panier.' });
//     } else {
//         return res.status(404).json({ message: "Article non trouvé ou déjà supprimé." });
//     }
// };
