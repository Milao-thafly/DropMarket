import { Controller } from "../libs/Controller.js";
import { UserRepository } from "../repository/UserRepository";


export class UserController extends Controller {
  private repo = new UserRepository();

  async getAll() {
    try {
      const users = await this.repo.getAll();
      this.response.json(users);
    } catch (err) {
      console.error(err);
      this.response.status(500).json({ message: "Erreur serveur" });
    }
  }

  async create() {
    try {
      const user = await this.repo.create(this.request.body);
      this.response.status(201).json(user);
    } catch (err) {
      console.error(err);
      this.response.status(500).json({
        message: "Erreur lors de la création de l'utilisateur",
      });
    }
  }

  async login() {
    const { email, password } = this.request.body;

    try {
      const user = await this.repo.getByEmail(email);
      if (!user || user.password !== password) {
        return this.response
          .status(401)
          .json({ message: "Identifiants incorrects" });
      }

      this.response.json({ message: "Connexion réussie", user });
    } catch (err) {
      console.error(err);
      this.response.status(500).json({ message: "Erreur serveur" });
    }
  }

  async register() {
    try {
  const user = await this.repo.create(this.request.body);
  this.response.status(201).json({ message: "Utilisateur enregistré", user });
} catch (err: any) {
  console.error("Erreur SQL:", err); 
  this.response.status(500).json({ message: "Erreur lors de l'inscription" });
}
  }
}
