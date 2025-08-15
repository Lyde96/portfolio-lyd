import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-primary/5" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-float" />
      <div className="absolute top-40 right-20 w-64 h-64 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 left-40 w-80 h-80 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '4s' }} />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Développeur</span>
            <br />
            <span className="text-foreground">Full Stack</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Passionné par la création d'applications web modernes et performantes. 
            Spécialisé en React, TypeScript et technologies cloud.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button size="lg" className="btn-gradient animate-glow">
              <Mail className="mr-2 h-5 w-5" />
              Me contacter
            </Button>
            <Button variant="outline" size="lg" className="card-hover">
              <Download className="mr-2 h-5 w-5" />
              Télécharger CV
            </Button>
          </div>
          
          <div className="flex gap-6 justify-center">
            <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
              <Github className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
              <Linkedin className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
              <Mail className="h-6 w-6" />
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