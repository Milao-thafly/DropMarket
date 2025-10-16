import { ContactUs } from "./Atoms/ContactUs";
import { FooterTitle } from "./Atoms/FooterTitle";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white py-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-2">
        <ContactUs />
        <FooterTitle />
      </div>
    </footer>
  );
}
