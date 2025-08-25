import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Code2 } from "lucide-react";
import portfolioProject from "@/assets/portfolio-project.jpg";
import ecommerceProject from "@/assets/ecommerce-project.jpg";
import dashboardProject from "@/assets/dashboard-project.jpg";
import chatProject from "@/assets/chat-project.jpg";
import cryptoToolProject from "@/assets/crypto-tool-project.jpg";
import securityMonitorProject from "@/assets/security-monitor-project.jpg";
import taskManagerProject from "@/assets/task-manager-project.jpg";
import financeManagerProject from "@/assets/finance-manager-project.jpg";

const projects = [
  {
    id: 1,
    title: "Portfolio Moderne",
    description: "Portfolio professionnel développé avec React, TypeScript et Tailwind CSS. Design moderne avec animations fluides.",
    image: portfolioProject,
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    githubUrl: "#",
    liveUrl: "/portfolio",
    featured: true
  },
  {
    id: 2,
    title: "LVND - Application E-Commerce",
    description: "Plateforme e-commerce complète avec panier, paiements et gestion des commandes. Marque de streetwear moderne.",
    image: ecommerceProject,
    technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    githubUrl: "#",
    liveUrl: "/ecommerce",
    featured: true
  },
  {
    id: 3,
    title: "API REST Documentation",
    description: "API REST complète avec authentification JWT, documentation Swagger et tests automatisés. Architecture microservices.",
    image: dashboardProject,
    technologies: ["Node.js", "Express", "Swagger", "Jest", "Docker"],
    githubUrl: "#",
    liveUrl: "/api-docs",
    featured: false
  },
  {
    id: 9,
    title: "Outil de Cryptographie",
    description: "Application de chiffrement/déchiffrement avec AES-256, RSA et hachage sécurisé. Interface intuitive pour la sécurité des données.",
    image: cryptoToolProject,
    technologies: ["React", "TypeScript", "Web Crypto API", "AES", "SHA-256"],
    githubUrl: "#",
    liveUrl: "/crypto-tool",
    featured: true
  },
  {
    id: 10,
    title: "Moniteur de Sécurité",
    description: "Dashboard de monitoring cybersécurité avec analyse de logs, détection d'anomalies et alertes en temps réel.",
    image: securityMonitorProject,
    technologies: ["React", "TypeScript", "Charts", "Security Analytics", "Real-time"],
    githubUrl: "#",
    liveUrl: "/security-monitor",
    featured: true
  },
  {
    id: 11,
    title: "Gestionnaire de Tâches",
    description: "Application complète de gestion de tâches avec priorités, catégories, et suivi de productivité.",
    image: taskManagerProject,
    technologies: ["React", "TypeScript", "Local Storage", "Drag & Drop"],
    githubUrl: "#",
    liveUrl: "/",
    featured: false
  },
  {
    id: 12,
    title: "Gestionnaire Financier",
    description: "Tableau de bord financier personnel avec suivi des dépenses, budgets et analyses détaillées.",
    image: financeManagerProject,
    technologies: ["React", "TypeScript", "Charts", "Financial Analytics"],
    githubUrl: "#",
    liveUrl: "/finance",
    featured: false
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Mes Projets</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez une sélection de mes réalisations techniques et créatives
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              className={`card-hover group ${project.featured ? 'md:col-span-2' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4">
                  {project.featured && (
                    <Badge className="bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-primary" />
                  {project.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    asChild
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 btn-gradient"
                    asChild
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="card-hover">
            <Github className="mr-2 h-5 w-5" />
            Voir tous mes projets sur GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;