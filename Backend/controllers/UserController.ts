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
          customer_id: newUser.customer_id, 
          email: newUser.email,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          blood_type: newUser.blood_type,
          birth_date: newUser.birth_date,
          country: newUser.country,
          city: newUser.city,
          adresse: newUser.adresse,
          postal_code: newUser.postal_code,
          phone_number: newUser.phone_number,
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
          message: "Le mot de passe est invalide (non hashé). Veuillez recréer votre compte.",
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
          customer_id: user.customer_id, 
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          blood_type: user.blood_type,
          birth_date: user.birth_date,
          country: user.country,
          city: user.city,
          adresse: user.adresse,
          postal_code: user.postal_code,
          phone_number: user.phone_number,
        },
      });
    } catch (err) {
      console.error("Erreur login:", err);
      this.response.status(500).json({ message: "Erreur serveur" });
    }
  }

  async update() {
    try {
      const userId = Number(this.request.params.id);
      if (isNaN(userId)) {
        return this.response.status(400).json({ message: "ID utilisateur invalide" });
      }

      const { email, password, postal_code, ...rest } = this.request.body;

      const updatedData: any = { ...rest };

      if (email) updatedData.email = email;
      if (password) updatedData.password = await argon2.hash(password);

      if (postal_code !== undefined && postal_code !== null) {
        const pcNumber = Number(postal_code);
        updatedData.postal_code = isNaN(pcNumber) ? null : pcNumber;
      }

      const updatedUser = await this.repo.update({
        ...updatedData,
        customer_id: userId,
      });

      this.response.json({
        message: "Profil mis à jour avec succès",
        user: updatedUser,
      });
    } catch (err) {
      console.error("Erreur update:", err);
      this.response.status(500).json({ message: "Erreur serveur lors de la mise à jour" });
    }
  }
}
