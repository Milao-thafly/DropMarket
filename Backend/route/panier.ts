import { Router } from 'express';
import { request, response, next } from 'react'

import { 
     getPanier, 
    ajouterArticle, 
     mettreAJourQuantite, 
     supprimerArticle 
 } from '../controllers/PanierController';

// // Crée une instance du routeur Express
const router = Router();


 const mockAuth = (request, response, next) => {
     // Dans la pratique, cet ID viendrait de req.user ou d'une session.
//     // Pour cet exemple, nous utilisons un paramètre de route ou un ID par défaut.
     request.params.userId = request.params.userId || 'user_demo_123'; 
     next();
 };

// // Route GET: Récupérer le panier d'un utilisateur
// GET /api/panier/:userId
router.get('/:userId', mockAuth, getPanier);

// // Route POST: Ajouter un article au panier
// // POST /api/panier/:userId
router.post('/:userId', mockAuth, ajouterArticle);

// // Route PUT: Mettre à jour la quantité d'un article
// // PUT /api/panier/:userId/articles/:itemId
router.put('/:userId/articles/:itemId', mockAuth, mettreAJourQuantite);

// // Route DELETE: Supprimer un article du panier
// // DELETE /api/panier/:userId/articles/:itemId
router.delete('/:userId/articles/:itemId', mockAuth, supprimerArticle);

// // Exporter le routeur pour qu'il soit utilisé dans votre fichier principal (par exemple, server.ts)
export default router;
