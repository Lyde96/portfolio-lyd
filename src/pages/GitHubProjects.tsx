import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Code2, Star, GitFork, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
}

const GitHubProjects = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        // Remplacez 'Lyde96' par votre nom d'utilisateur GitHub
        const response = await fetch('https://api.github.com/users/Lyde96/repos?sort=updated&per_page=20');
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des projets GitHub');
        }
        
        const data = await response.json();
        
        // Filtrer les repos non-fork et les trier par stars
        const filteredRepos = data
          .filter((repo: GitHubRepo) => !repo.name.includes('fork'))
          .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count);
        
        setRepos(filteredRepos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubRepos();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Chargement des projets GitHub...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Réessayer
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header avec navigation */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux tâches
          </Button>
          
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-gradient">Mes Projets GitHub</span>
            </h1>
            <p className="text-muted-foreground">
              Découvrez mes projets open source et réalisations techniques
            </p>
          </div>
          
          <div className="w-32"></div> {/* Spacer pour centrer le titre */}
        </div>

        {/* Grille des projets */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <Card key={repo.id} className="card-hover group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Code2 className="h-5 w-5 text-primary" />
                  {repo.name}
                </CardTitle>
                <CardDescription className="text-sm min-h-[2.5rem]">
                  {repo.description || "Aucune description disponible"}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {/* Stats du repo */}
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {repo.stargazers_count}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="h-4 w-4" />
                    {repo.forks_count}
                  </div>
                  {repo.language && (
                    <Badge variant="secondary" className="text-xs">
                      {repo.language}
                    </Badge>
                  )}
                </div>

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {repo.topics.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{repo.topics.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Date de mise à jour */}
                <p className="text-xs text-muted-foreground mb-4">
                  Mis à jour le {formatDate(repo.updated_at)}
                </p>
                
                {/* Boutons d'action */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    asChild
                  >
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  
                  {repo.homepage && (
                    <Button 
                      size="sm" 
                      className="flex-1 btn-gradient"
                      asChild
                    >
                      <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {repos.length === 0 && (
          <div className="text-center py-12">
            <Github className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Aucun projet trouvé</h3>
            <p className="text-muted-foreground">
              Aucun projet GitHub public n'a été trouvé pour cet utilisateur.
            </p>
          </div>
        )}

        {/* Lien vers le profil GitHub */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="card-hover" asChild>
            <a href="https://github.com/Lyde96" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              Voir mon profil GitHub complet
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GitHubProjects;