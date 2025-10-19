import { TitleAtom } from "./Atoms/Titre";
import { LienNav } from "./Atoms/LienNav";
import { CartIconAtom } from "./Atoms/PanierLogo";
import { useAuth } from "../context/Authcontext";
import "../components/css/header.css";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <TitleAtom href="/" className="header-title">SAVE-PEOPLE</TitleAtom>
        </div>

        <nav className="header-nav">
          <LienNav href="/browseProduct" ariaLabel="Lien vers organs">organs</LienNav>
          <LienNav href="/forum" ariaLabel="Lien vers le forum">forum</LienNav>

          {!user && <LienNav href="/user" ariaLabel="Lien vers inscription">Se connecter</LienNav>}

          {user && (
            <button onClick={logout} className="header-logout">
              Se déconnecter
            </button>
          )}
        </nav>

        <div className="header-right">
          <CartIconAtom ariaLabel="Voir le panier" />
        </div>
      </div>
    </header>
  );
}
