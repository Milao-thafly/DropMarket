import { apiFetch } from "../src/components/Fetcher/BackendApiFetcher";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../src/components/css/user.css";
import { useAuth } from "../src/context/Authcontext";

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
  postal_code: number | null; 
  phone_number: string;   
}



interface UserUpdate {
  first_name?: string;
  last_name?: string;
  email?: string;
  blood_type?: string;
  birth_date?: string;
  country?: string;
  city?: string;
  adresse?: string;
postal_code?: number | null;
phone_number?: string;
  password?: string;
}

export default function UserPage() {
  const { login, user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    blood_type: "",
    birth_date: "",
    country: "",
    city: "",
    adresse: "",
    postal_code: "" as string | number,
    phone_number: "",
  });

  const [message, setMessage] = useState("");

 useEffect(() => {
  if (user) {
    setFormData({
      email: user.email || "",
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      blood_type: user.blood_type || "",
      birth_date: user.birth_date || "",
      country: user.country || "",
      city: user.city || "",
      adresse: user.adresse || "",
      postal_code: user.postal_code ?? null,
      phone_number: user.phone_number || "", 
      password: "",
    });
  }
}, [user]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isRegistering ? "/register" : "/login";

    try {
      const payload = isRegistering
        ? formData
        : { email: formData.email, password: formData.password };

      const response = await apiFetch<{ token: string; user: User; message?: string }>(
        endpoint,
        "POST",
        payload
      );

      if (!isRegistering && response.token) {
        login(response.user, response.token);
        navigate("/");
      }

      if (isRegistering) {
        setMessage("Compte créé avec succès !");
        setFormData({
          email: "",
          password: "",
          first_name: "",
          last_name: "",
          blood_type: "",
          birth_date: "",
          country: "",
          city: "",
          adresse: "",
          postal_code: "",
          phone_number: "",
        });
      }
    } catch (err: any) {
      setMessage(err.message || "Une erreur est survenue.");
    }
  };

 const handleUpdate = async () => {
  if (!user) return;

  try {
    const dataToSend: UserUpdate = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "" && value !== null) {
        if (key === "postal_code") {
          const num = Number(value);
          dataToSend.postal_code = isNaN(num) ? null : num;
        } else if (key === "password") {
          dataToSend.password = value;
        } else {
          (dataToSend as any)[key] = value;
        }
      }
    });

    if (!dataToSend.password) delete dataToSend.password;

    const response = await apiFetch<{ user: User; message: string }>(
      `/users/${user.customer_id}`,
      "PATCH",
      dataToSend
    );

    const safeUser: User = {
      ...response.user,
      postal_code: response.user.postal_code ?? 0,
      phone_number: response.user.phone_number ?? "",
    };

    setMessage(response.message);
    updateUser(safeUser);
  } catch (err: any) {
    setMessage(err.message || "Erreur lors de la mise à jour.");
  }
};

  return (
    <div className="user-container">
      {!user && <h1>{isRegistering ? "Créer un compte" : "Connexion"}</h1>}
      {user && <h1>Mon profil</h1>}

      <form
        onSubmit={user ? (e) => e.preventDefault() : handleSubmit}
        className="user-form"
      >
        {!user && !isRegistering && (
          <>
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
          </>
        )}
        {!user && isRegistering && (
          <>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} required />
            <input type="text" name="first_name" placeholder="Prénom" value={formData.first_name} onChange={handleChange} required />
            <input type="text" name="last_name" placeholder="Nom" value={formData.last_name} onChange={handleChange} required />
            <input type="text" name="blood_type" placeholder="Type sanguin" value={formData.blood_type} onChange={handleChange} required />
            <input type="date" name="birth_date" placeholder="Date de naissance" value={formData.birth_date} onChange={handleChange} required />
            <input type="text" name="country" placeholder="Pays" value={formData.country} onChange={handleChange} required />
            <input type="text" name="city" placeholder="Ville" value={formData.city} onChange={handleChange} required />
            <input type="text" name="adresse" placeholder="Adresse" value={formData.adresse} onChange={handleChange} required />
            <input type="number" name="postal_code" placeholder="Code postal" value={formData.postal_code} onChange={handleChange} required />
            <input type="text" name="phone_number" placeholder="Numéro de téléphone" value={formData.phone_number} onChange={handleChange} required />
          </>
        )}
        {user && (
          <>
            <input type="text" name="first_name" placeholder="Prénom" value={formData.first_name} onChange={handleChange} />
            <input type="text" name="last_name" placeholder="Nom" value={formData.last_name} onChange={handleChange} />
            <input type="text" name="blood_type" placeholder="Type sanguin" value={formData.blood_type} onChange={handleChange} />
            <input type="date" name="birth_date" placeholder="Date de naissance" value={formData.birth_date} onChange={handleChange} />
            <input type="text" name="country" placeholder="Pays" value={formData.country} onChange={handleChange} />
            <input type="text" name="city" placeholder="Ville" value={formData.city} onChange={handleChange} />
            <input type="text" name="adresse" placeholder="Adresse" value={formData.adresse} onChange={handleChange} />
            <input type="number" name="postal_code" placeholder="Code postal" value={formData.postal_code} onChange={handleChange} />
            <input type="text" name="phone_number" placeholder="Numéro de téléphone" value={formData.phone_number} onChange={handleChange} />
            <input type="password" name="password" placeholder="Nouveau mot de passe (laisser vide si pas de changement)" value={formData.password} onChange={handleChange} />
          </>
        )}

        {!user && (
          <button type="submit">{isRegistering ? "S'inscrire" : "Se connecter"}</button>
        )}
      </form>

      {user && (
        <button onClick={handleUpdate} className="btn" style={{ marginTop: "1rem" }}>
          Mettre à jour mon profil
        </button>
      )}

      <p className="user-message">{message}</p>

      {!user && (
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="toggle-button"
        >
          {isRegistering ? "Déjà un compte ? Se connecter" : "Pas de compte ? S'inscrire"}
        </button>
      )}
    </div>
  );
}
