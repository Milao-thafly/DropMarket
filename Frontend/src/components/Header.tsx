import { TitleAtom } from "./Atoms/Titre";
import { LienNav } from "./Atoms/LienNav";
import { CartIconAtom } from "./Atoms/PanierLogo";

export default function Header() {
  return (
    <div>
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Gauche : Titre */}
          <div className="flex-shrink-0">
            <TitleAtom href="/">SAVE-PEOPLE</TitleAtom>
          </div>

        {/* Milieu : Liens */}
          <nav className="flex space-x-2 items-center">
            <LienNav href="/organs" ariaLabel="Lien vers organs" onClick={undefined}>organs</LienNav>
            <LienNav href="/forum" ariaLabel="Lien vers le forum" onClick={undefined}>forum</LienNav>
            <LienNav href="/signup" ariaLabel="Lien vers inscription" onClick={undefined}>inscription</LienNav>
            <LienNav href="/login" ariaLabel="Lien vers connexion" onClick={undefined}>connexion</LienNav>
          </nav>

          {/* Droite : panier */}
          <div className="flex items-center">
            <CartIconAtom ariaLabel="Voir le panier" />
          </div>
        </div>
      </div>
    </header>
    </div>
  );
}
