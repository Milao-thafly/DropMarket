import { useState } from "react";
import { useAuth } from "../src/context/Authcontext";
import { apiFetch } from "../src/components/Fetcher/BackendApiFetcher";

export default function EditProfilePage() {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    blood_type: user?.blood_type || "",
    birth_date: user?.birth_date || "",
    country: user?.country || "",
    city: user?.city || "",
    adresse: user?.adresse || "",
    postal_code: user?.postal_code ?? "",
    phone_number: user?.phone_number || "",
    password: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    setMessage("");

    try {
      const dataToSend: any = {};
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== "" && value !== null) {
          if (key === "postal_code") {
            const num = Number(value);
            dataToSend.postal_code = isNaN(num) ? null : num;
          } else if (key === "password") {
            dataToSend.password = value;
          } else {
            dataToSend[key] = value;
          }
        }
      });
      if (!dataToSend.password) delete dataToSend.password;
      const response = await apiFetch<{ user: typeof user; message: string }>(
        `/users/${user.customer_id}`,
        "PATCH",
        dataToSend
      );

      updateUser(response.user);
      setMessage(response.message || "Profil mis à jour avec succès !");
    } catch (err: any) {
      console.error("Erreur update:", err);
      setMessage(err.message || "Erreur lors de la mise à jour du profil.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-red-400">
        Aucun utilisateur connecté.
      </div>
    );
  }

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-card">
        <h2>Modifier mon profil</h2>
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="form-grid">
            <label>
              Prénom
              <input name="first_name" value={formData.first_name} onChange={handleChange} />
            </label>
            <label>
              Nom
              <input name="last_name" value={formData.last_name} onChange={handleChange} />
            </label>
          </div>

          <label>
            Email
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>

          <label>
            Téléphone
            <input name="phone_number" value={formData.phone_number} onChange={handleChange} />
          </label>

          <label>
            Adresse
            <input name="adresse" value={formData.adresse} onChange={handleChange} />
          </label>

          <div className="form-grid">
            <label>
              Ville
              <input name="city" value={formData.city} onChange={handleChange} />
            </label>
            <label>
              Pays
              <input name="country" value={formData.country} onChange={handleChange} />
            </label>
          </div>

          <label>
            Code postal
            <input
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
            />
          </label>

          <div className="form-grid">
            <label>
              Groupe sanguin
              <input name="blood_type" value={formData.blood_type} onChange={handleChange} />
            </label>
            <label>
              Date de naissance
              <input
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
              />
            </label>
          </div>

          <label>
            Nouveau mot de passe (optionnel)
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          {message && <p className="message">{message}</p>}

          <button type="submit" disabled={isSaving}>
            {isSaving ? "Enregistrement..." : "Sauvegarder"}
          </button>
        </form>
      </div>
    </div>
  );
}
