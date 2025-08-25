import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const PortfolioFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-gradient mb-4">Portfolio</h3>
              <p className="text-muted-foreground mb-4">
                Développeur passionné spécialisé en React, TypeScript et développement web moderne. 
                Créateur d'expériences digitales innovantes.
              </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="hover:text-primary hover:shadow-glow" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-secondary hover:shadow-secondary" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-accent hover:shadow-accent" asChild>
                <a href="mailto:contact@portfolio.com">
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
                <a href="#hero" className="text-muted-foreground hover:text-primary transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">
                  Compétences
                </a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projets
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
              <p>contact@portfolio.com</p>
              <p>Disponible pour de nouveaux projets</p>
              <p>Collaboration à distance</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Portfolio. Tous droits réservés.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1 mt-4 md:mt-0">
            Développé avec <Heart className="h-4 w-4 text-secondary" fill="currentColor" /> et React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PortfolioFooter;