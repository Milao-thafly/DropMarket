import { apiFetch } from "../src/components/Fetcher/BackendApiFetcher";
import { useAuth } from "../src/context/Authcontext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  customer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  blood_type: string;
  birth_date: string;
  country: string;
  city: string;
  adresse: string;
  postal_code: number;
  phone_number: string;
}

export default function UserPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    blood_type: "",
    birth_date: "",
    country: "",
    city: "",
    adresse: "",
    postal_code: "",
    phone_number: "",
  });
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const fetchUsers = async () => {
    try {
      const data = await apiFetch<User[]>("/users", "GET");
      setUsers(data);
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint = isRegistering ? "/register" : "/login";

    try {
      const response = await apiFetch<{ token: string; user: User; message?: string }>(
        endpoint,
        "POST",
        formData
      );

      if (!isRegistering && response.token) {
        login(response.user, response.token);
        navigate("/homepage");
      }

  
      if (isRegistering) {
        setMessage("Compte créé avec succès !");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          blood_type: "",
          birth_date: "",
          country: "",
          city: "",
          adresse: "",
          postal_code: "",
          phone_number: "",
        });
        fetchUsers();
      }
    } catch (err: any) {
      setMessage(err.message || "Une erreur est survenue.");
    }
  };

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <h1>{isRegistering ? "Créer un compte" : "Connexion"}</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
        {isRegistering && (
          <>
            <input
              type="text"
              name="first_name"
              placeholder="Prénom"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Nom"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {isRegistering && (
          <>
            <input
              type="text"
              name="blood_type"
              placeholder="Type sanguin"
              value={formData.blood_type}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="birth_date"
              placeholder="Date de naissance"
              value={formData.birth_date}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Pays"
              value={formData.country}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="Ville"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="adresse"
              placeholder="Adresse"
              value={formData.adresse}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="postal_code"
              placeholder="Code postal"
              value={formData.postal_code}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone_number"
              placeholder="Numéro de téléphone"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </>
        )}

        <button type="submit" style={{ marginTop: "1rem" }}>
          {isRegistering ? "S'inscrire" : "Se connecter"}
        </button>
      </form>

      <p style={{ marginTop: "1rem", color: "aqua" }}>{message}</p>

      <button
        onClick={() => setIsRegistering(!isRegistering)}
        style={{ marginTop: "1rem" }}
      >
        {isRegistering
          ? "Déjà un compte ? Se connecter"
          : "Pas de compte ? S'inscrire"}
      </button>

      <div style={{ marginTop: "2rem" }}>
        <h2>Liste des utilisateurs</h2>
        <ul>
          {users.map((u) => (
            <li key={u.customer_id}>
              {u.first_name} {u.last_name} - {u.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
