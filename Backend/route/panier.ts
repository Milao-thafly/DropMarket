// import { Router } from 'express';
// import { 
//     getPanier, 
//     ajouterArticle, 
//     mettreAJourQuantite, 
//     supprimerArticle 
// } from 'controllers/PanierController';

// // Crée une instance du routeur Express
// const router = Router();

// // Middleware de démo pour simuler l'authentification et l'ajout de l'ID utilisateur aux paramètres
// // Dans une vraie application, vous utiliseriez un JWT pour extraire l'ID.
// const mockAuth = (req, res, next) => {
//     // Dans la pratique, cet ID viendrait de req.user ou d'une session.
//     // Pour cet exemple, nous utilisons un paramètre de route ou un ID par défaut.
//     req.params.userId = req.params.userId || 'user_demo_123'; 
//     next();
// };

// // Route 1: Récupérer le panier d'un utilisateur
// // GET /api/panier/:userId
// router.get('/:userId', mockAuth, getPanier);

// // Route 2: Ajouter un article au panier
// // POST /api/panier/:userId
// router.post('/:userId', mockAuth, ajouterArticle);

// // Route 3: Mettre à jour la quantité d'un article
// // PUT /api/panier/:userId/articles/:itemId
// router.put('/:userId/articles/:itemId', mockAuth, mettreAJourQuantite);

// // Route 4: Supprimer un article du panier
// // DELETE /api/panier/:userId/articles/:itemId
// router.delete('/:userId/articles/:itemId', mockAuth, supprimerArticle);

// // Exporter le routeur pour qu'il soit utilisé dans votre fichier principal (par exemple, server.ts)
// export default router;
