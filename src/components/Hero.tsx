import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download, MapPin } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-primary/10" />
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Hero illustration */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-full opacity-30">
        <img 
          src={heroIllustration} 
          alt="Tech illustration" 
          className="w-full h-full object-cover object-left"
        />
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full mix-blend-screen filter blur-xl animate-float" />
      <div className="absolute top-40 right-20 w-64 h-64 bg-secondary/20 rounded-full mix-blend-screen filter blur-xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 left-40 w-80 h-80 bg-accent/20 rounded-full mix-blend-screen filter blur-xl animate-float" style={{ animationDelay: '4s' }} />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in-up max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-gradient">Lydéric Yabada</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground/90 mb-4">
              Développeur Full Stack
            </h2>
            <div className="flex items-center justify-center gap-2 text-lg text-muted-foreground mb-6">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Bruxelles, Belgique</span>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Passionné par la création d'applications web modernes et performantes. 
            Spécialisé en React, TypeScript et technologies cloud avec une approche 
            centrée sur l'expérience utilisateur.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button size="lg" className="btn-gradient animate-glow shadow-glow">
              <Mail className="mr-2 h-5 w-5" />
              Me contacter
            </Button>
            <Button variant="outline" size="lg" className="card-hover border-primary/50 hover:border-primary">
              <Download className="mr-2 h-5 w-5" />
              Télécharger CV
            </Button>
          </div>
          
          <div className="flex gap-6 justify-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:text-primary transition-colors hover:bg-primary/10 hover:shadow-glow"
              asChild
            >
              <a href="https://github.com/Lyde96" target="_blank" rel="noopener noreferrer">
                <Github className="h-6 w-6" />
              </a>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:text-secondary transition-colors hover:bg-secondary/10 hover:shadow-secondary"
              asChild
            >
              <a href="https://linkedin.com/in/lyderic-yabada" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6" />
              </a>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:text-accent transition-colors hover:bg-accent/10 hover:shadow-accent"
              asChild
            >
              <a href="mailto:lyderic.yabada@email.com">
                <Mail className="h-6 w-6" />
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;