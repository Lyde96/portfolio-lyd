import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-gradient mb-4">LVND</h3>
              <p className="text-muted-foreground mb-4">
                Streetwear de qualité supérieure, conçu pour l'expression de soi 
                et l'individualité. Style urbain authentique.
              </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="hover:text-primary hover:shadow-glow" asChild>
                <a href="https://instagram.com/lvnd_brand" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-secondary hover:shadow-secondary" asChild>
                <a href="https://tiktok.com/@lvnd_brand" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-accent hover:shadow-accent" asChild>
                <a href="mailto:contact@lvnd.com">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#collection" className="text-muted-foreground hover:text-primary transition-colors">
                  Collection
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>contact@lvnd.com</p>
              <p>Service client disponible 24/7</p>
              <p>Livraison mondiale</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} LVND. Tous droits réservés.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1 mt-4 md:mt-0">
            Streetwear authentique <Heart className="h-4 w-4 text-secondary" fill="currentColor" /> depuis 2024
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;