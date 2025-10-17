import { TitleAtom } from "./Atoms/Titre";
import { LienNav } from "./Atoms/LienNav";
import { CartIconAtom } from "./Atoms/PanierLogo";
import { useAuth } from "../context/Authcontext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full border-b bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Gauche : Titre */}
          <div className="flex-shrink-0">
            <TitleAtom href="/">SAVE-PEOPLE</TitleAtom>
          </div>

          {/* Milieu : Liens */}
          <nav className="flex space-x-4 items-center">
            <LienNav href="/organs" ariaLabel="Lien vers organs">
              organs
            </LienNav>
            <LienNav href="/forum" ariaLabel="Lien vers le forum">
              forum
            </LienNav>

            {/* Si user NON connecté */}
            {!user && (
              <LienNav href="/user" ariaLabel="Lien vers inscription">
                se connecter ?
              </LienNav>
            )}

            {/* Si user connecté */}
            {user && (
              <button
                onClick={logout}
                className="text-red-500 font-semibold hover:underline"
              >
                Se déconnecter ({user.first_name})
              </button>
            )}
          </nav>

          {/* Droite : panier */}
          <div className="flex items-center">
            <CartIconAtom ariaLabel="Voir le panier" />
          </div>
        </div>
      </div>
    </header>
  );
}
