import { UserRepository } from "../repository/UserRepository";
import { Controller } from "../libs/Controller.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

export class UserController extends Controller {
  private repo = new UserRepository();

  async getAll() {
    try {
      const users = await this.repo.getAll();
      this.response.json(users);
    } catch (err) {
      console.error("Erreur getAll:", err);
      this.response.status(500).json({ message: "Erreur serveur" });
    }
  }

  async register() {
    try {
      const { email, password, ...rest } = this.request.body;

      if (!email || !password) {
        return this.response.status(400).json({ message: "Email et mot de passe requis" });
      }

      const existingUser = await this.repo.getByEmail(email);
      if (existingUser) {
        return this.response.status(400).json({ message: "Email déjà utilisé" });
      }

      const hashedPassword = await argon2.hash(password);

      const newUser = await this.repo.create({
        ...rest,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign(
        { id: newUser.customer_id, email: newUser.email },
        JWT_SECRET,
        { expiresIn: "2h" }
      );

      this.response.status(201).json({
        message: "Utilisateur enregistré avec succès",
        token,
        user: {
          email: newUser.email,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
        },
      });
    } catch (err) {
      console.error("Erreur register:", err);
      this.response.status(500).json({ message: "Erreur lors de l'inscription" });
    }
  }

  async login() {
    try {
      const { email, password } = this.request.body;

      if (!email || !password) {
        return this.response.status(400).json({ message: "Email et mot de passe requis" });
      }

      const user = await this.repo.getByEmail(email);
      if (!user) {
        return this.response.status(401).json({ message: "Utilisateur introuvable" });
      }

      if (typeof user.password !== "string" || !user.password.startsWith("$argon2")) {
        console.warn("Mot de passe non hashé détecté pour:", email);
        return this.response.status(500).json({
          message:
            "Le mot de passe de cet utilisateur est invalide (non hashé). Veuillez recréer votre compte.",
        });
      }

      const isValid = await argon2.verify(user.password, password);
      if (!isValid) {
        return this.response.status(401).json({ message: "Mot de passe incorrect" });
      }

      const token = jwt.sign(
        { id: user.customer_id, email: user.email },
        JWT_SECRET,
        { expiresIn: "2h" }
      );

      this.response.json({
        message: "Connexion réussie",
        token,
        user: {
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        },
      });
    } catch (err) {
      console.error("Erreur login:", err);
      this.response.status(500).json({ message: "Erreur serveur" });
    }
  }
}
