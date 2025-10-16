
import { Request, Response } from 'express';

// Types mini sinon rouge...
interface Product {
    id: string;
    nom: string;
    prix: number;
    quantite: number;
}

interface Panier {
    products: Product[];
    total: number;
}

// Étendre la session une fois express session sauve les dev_Noobs
declare module 'express-session' {
    interface SessionData {
        panier: Panier;
    }
}

// Fonction Calcultot() a part...
const calculerTotal = (products: Product[]): number => 
    products.reduce((sum, p) => sum + (p.prix * p.quantite), 0);

export const getPanier = (req: Request, res: Response) => {
    const panier = req.session.panier || { products: [], total: 0 };
    res.json(panier);
};

export const ajouterProduct = (req: Request, res: Response) => {
    if (!req.session.panier) {
        req.session.panier = { products: [], total: 0 };
    }

    const { id, nom, prix, quantite } = req.body;
    const productExistant = req.session.panier.products.find(p => p.id === id);

    if (productExistant) {
        productExistant.quantite += quantite;
    } else {
        req.session.panier.products.push({ id, nom, prix, quantite });
    }

    req.session.panier.total = calculerTotal(req.session.panier.products);

    res.json({
        message: 'Article ajouté',
        panier: req.session.panier
    });
};

export const mettreAJourQuantite = (req: Request, res: Response) => {
    const { productId } = req.params;
    const { quantite } = req.body;

    if (!req.session.panier) {
        return res.status(404).json({ message: 'Panier vide' });
    }

    const product = req.session.panier.products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: 'Article non trouvé' });
    }

    product.quantite = quantite;
    req.session.panier.total = calculerTotal(req.session.panier.products);

    res.json({
        message: 'Quantité mise à jour',
        panier: req.session.panier
    });
};

export const supprimerProduct = (req: Request, res: Response) => {
    const { productId } = req.params;

    if (!req.session.panier) {
        return res.status(404).json({ message: 'Panier vide' });
    }

    req.session.panier.products = req.session.panier.products.filter(
        p => p.id !== productId
    );

    req.session.panier.total = calculerTotal(req.session.panier.products);

    res.json({
        message: 'Article supprimé',
        panier: req.session.panier
    });
};

export const viderPanier = (req: Request, res: Response) => {
    req.session.panier = { products: [], total: 0 };
    res.json({ message: 'Panier vidé' });
};
