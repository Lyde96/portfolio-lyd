import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Code2 } from "lucide-react";
import portfolioProject from "@/assets/portfolio-project.jpg";
import ecommerceProject from "@/assets/ecommerce-project.jpg";
import dashboardProject from "@/assets/dashboard-project.jpg";
import chatProject from "@/assets/chat-project.jpg";

const projects = [
  {
    id: 1,
    title: "Portfolio Moderne",
    description: "Portfolio professionnel développé avec React, TypeScript et Tailwind CSS. Design moderne avec animations fluides.",
    image: portfolioProject,
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    githubUrl: "https://github.com/vercel/next.js",
    liveUrl: "https://nextjs.org",
    featured: true
  },
  {
    id: 2,
    title: "Application E-Commerce",
    description: "Plateforme e-commerce complète avec panier, paiements Stripe et gestion des commandes en temps réel.",
    image: ecommerceProject,
    technologies: ["React", "Node.js", "Stripe", "Supabase"],
    githubUrl: "https://github.com/supabase/supabase",
    liveUrl: "https://supabase.com",
    featured: true
  },
  {
    id: 3,
    title: "API REST Documentation",
    description: "API REST complète avec authentification JWT, documentation Swagger et tests automatisés. Architecture microservices.",
    image: dashboardProject,
    technologies: ["Node.js", "Express", "Swagger", "Jest", "Docker"],
    githubUrl: "https://github.com/swagger-api/swagger-ui",
    liveUrl: "https://petstore.swagger.io",
    featured: false
  },
  {
    id: 4,
    title: "Chat Application",
    description: "Application de messagerie en temps réel avec salles de discussion et notifications push.",
    image: chatProject,
    technologies: ["React", "Socket.io", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/socketio/socket.io",
    liveUrl: "https://socket.io/demos/chat",
    featured: false
  },
  {
    id: 5,
    title: "App Mobile React Native",
    description: "Application mobile cross-platform avec authentification biométrique, notifications push et mode hors-ligne.",
    image: portfolioProject,
    technologies: ["React Native", "Expo", "AsyncStorage", "Push Notifications"],
    githubUrl: "https://github.com/expo/expo",
    liveUrl: "https://snack.expo.dev",
    featured: false
  },
  {
    id: 6,
    title: "Assistant IA Conversationnel",
    description: "Chatbot intelligent avec traitement du langage naturel, mémoire contextuelle et intégration API OpenAI.",
    image: chatProject,
    technologies: ["Python", "OpenAI", "FastAPI", "Vector DB", "LangChain"],
    githubUrl: "https://github.com/langchain-ai/langchain",
    liveUrl: "https://chat.openai.com",
    featured: false
  },
  {
    id: 7,
    title: "Système de Monitoring",
    description: "Dashboard de monitoring en temps réel avec alertes, métriques système et logs centralisés.",
    image: dashboardProject,
    technologies: ["Grafana", "Prometheus", "Docker", "Kubernetes", "Elasticsearch"],
    githubUrl: "https://github.com/grafana/grafana",
    liveUrl: "https://play.grafana.org/d/000000012/grafana-play-home",
    featured: false
  },
  {
    id: 8,
    title: "Blockchain DApp",
    description: "Application décentralisée sur Ethereum avec smart contracts, wallet integration et transactions sécurisées.",
    image: ecommerceProject,
    technologies: ["Solidity", "Web3.js", "Ethereum", "MetaMask", "Hardhat"],
    githubUrl: "https://github.com/ethereum/web3.js",
    liveUrl: "https://remix.ethereum.org",
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
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 btn-gradient"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
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