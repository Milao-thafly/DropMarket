import { ContactUs } from "./Atoms/ContactUs";
import { FooterTitle } from "./Atoms/FooterTitle";
import "../components/css/footer.css"

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <ContactUs />
        <FooterTitle className="footer-title" />
      </div>
    </footer>
  );
}
