import { Router } from 'express';
import {
    getPanier,
    ajouterProduct,
    mettreAJourQuantite,
    supprimerProduct,
    viderPanier
} from '../controllers/PanierController';

const router = Router();

// Plus besoin de mockAuth ni de userId dans l'URL !
router.get('/', getPanier);
router.post('/', ajouterProduct);
router.put('/products/:productId', mettreAJourQuantite);
router.delete('/products/:productId', supprimerProduct);
router.delete('/', viderPanier);

export default router;