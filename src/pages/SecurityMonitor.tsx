import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  Users, 
  Lock, 
  Unlock,
  Eye,
  Globe,
  Server,
  Database,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Zap
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

interface SecurityEvent {
  id: string;
  timestamp: Date;
  type: "login_attempt" | "failed_login" | "suspicious_activity" | "data_access" | "system_alert";
  severity: "low" | "medium" | "high" | "critical";
  source_ip: string;
  user_agent: string;
  description: string;
  country: string;
  blocked: boolean;
}

interface SecurityMetrics {
  totalEvents: number;
  criticalAlerts: number;
  blockedThreats: number;
  activeUsers: number;
  systemHealth: number;
}

const SecurityMonitor = () => {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    totalEvents: 0,
    criticalAlerts: 0,
    blockedThreats: 0,
    activeUsers: 0,
    systemHealth: 95
  });
  const [isMonitoring, setIsMonitoring] = useState(false);
  const { toast } = useToast();

  // Génération de données simulées pour la démonstration
  const generateMockEvent = (): SecurityEvent => {
    const types: SecurityEvent["type"][] = ["login_attempt", "failed_login", "suspicious_activity", "data_access", "system_alert"];
    const severities: SecurityEvent["severity"][] = ["low", "medium", "high", "critical"];
    const countries = ["France", "USA", "Russie", "Chine", "Allemagne", "Brésil"];
    const ips = ["192.168.1.1", "10.0.0.1", "172.16.0.1", "203.0.113.1", "198.51.100.1"];
    const userAgents = [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      "curl/7.68.0",
      "Python-requests/2.25.1",
      "Suspicious Bot v1.0"
    ];

    const type = types[Math.floor(Math.random() * types.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const isBlocked = severity === "critical" || Math.random() > 0.7;

    const descriptions = {
      login_attempt: "Tentative de connexion réussie",
      failed_login: "Échec de connexion - mot de passe incorrect",
      suspicious_activity: "Activité suspecte détectée - multiple tentatives",
      data_access: "Accès aux données sensibles",
      system_alert: "Alert système - ressources CPU élevées"
    };

    return {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      type,
      severity,
      source_ip: ips[Math.floor(Math.random() * ips.length)],
      user_agent: userAgents[Math.floor(Math.random() * userAgents.length)],
      description: descriptions[type],
      country: countries[Math.floor(Math.random() * countries.length)],
      blocked: isBlocked
    };
  };

  // Simulation du monitoring en temps réel
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isMonitoring) {
      interval = setInterval(() => {
        const newEvent = generateMockEvent();
        setEvents(prev => [newEvent, ...prev.slice(0, 49)]); // Garder les 50 derniers événements
        
        // Mise à jour des métriques
        setMetrics(prev => ({
          totalEvents: prev.totalEvents + 1,
          criticalAlerts: prev.criticalAlerts + (newEvent.severity === "critical" ? 1 : 0),
          blockedThreats: prev.blockedThreats + (newEvent.blocked ? 1 : 0),
          activeUsers: Math.floor(Math.random() * 150) + 50,
          systemHealth: Math.max(85, Math.min(100, prev.systemHealth + (Math.random() - 0.5) * 5))
        }));

        // Toast pour les événements critiques
        if (newEvent.severity === "critical") {
          toast({
            title: "Alerte Critique",
            description: `${newEvent.description} depuis ${newEvent.source_ip}`,
            variant: "destructive"
          });
        }
      }, 2000 + Math.random() * 3000); // Intervalle aléatoire entre 2-5 secondes
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMonitoring, toast]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "bg-success";
      case "medium": return "bg-accent";
      case "high": return "bg-secondary";
      case "critical": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "login_attempt": return <Users className="h-4 w-4" />;
      case "failed_login": return <Lock className="h-4 w-4" />;
      case "suspicious_activity": return <AlertTriangle className="h-4 w-4" />;
      case "data_access": return <Database className="h-4 w-4" />;
      case "system_alert": return <Shield className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const startMonitoring = () => {
    setIsMonitoring(true);
    toast({ title: "Monitoring activé", description: "Surveillance en temps réel démarrée" });
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
    toast({ title: "Monitoring arrêté", description: "Surveillance en temps réel arrêtée" });
  };

  const clearLogs = () => {
    setEvents([]);
    setMetrics({
      totalEvents: 0,
      criticalAlerts: 0,
      blockedThreats: 0,
      activeUsers: 0,
      systemHealth: 95
    });
    toast({ title: "Logs effacés", description: "Tous les événements ont été supprimés" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gradient mb-4">
                Dashboard de Sécurité
              </h1>
              <p className="text-lg text-muted-foreground">
                Surveillance et analyse des menaces en temps réel
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                onClick={clearLogs}
                variant="outline"
                disabled={events.length === 0}
              >
                Effacer les logs
              </Button>
              <Button 
                onClick={isMonitoring ? stopMonitoring : startMonitoring}
                className={isMonitoring ? "bg-destructive hover:bg-destructive/90" : ""}
              >
                {isMonitoring ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Arrêter
                  </>
                ) : (
                  <>
                    <Activity className="h-4 w-4 mr-2" />
                    Démarrer
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Métriques en temps réel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Événements Totaux</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalEvents}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-4 w-4 mr-1" />
                  Depuis le démarrage
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alertes Critiques</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{metrics.criticalAlerts}</div>
                <p className="text-xs text-muted-foreground">
                  Nécessitent une attention immédiate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Menaces Bloquées</CardTitle>
                <Shield className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{metrics.blockedThreats}</div>
                <p className="text-xs text-muted-foreground">
                  Menaces neutralisées
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.activeUsers}</div>
                <p className="text-xs text-muted-foreground">
                  Connectés actuellement
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Santé Système</CardTitle>
                <Server className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(metrics.systemHealth)}%</div>
                <Progress value={metrics.systemHealth} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  État général du système
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Status et alertes */}
          {metrics.criticalAlerts > 0 && (
            <Alert className="mb-6 border-destructive bg-destructive/10">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <AlertTitle className="text-destructive">Attention - Alertes Critiques</AlertTitle>
              <AlertDescription>
                {metrics.criticalAlerts} alerte(s) critique(s) détectée(s). Vérifiez les logs pour plus de détails.
              </AlertDescription>
            </Alert>
          )}

          {isMonitoring && (
            <Alert className="mb-6 border-success bg-success/10">
              <Zap className="h-4 w-4 text-success" />
              <AlertTitle className="text-success">Monitoring Actif</AlertTitle>
              <AlertDescription>
                La surveillance en temps réel est active. Les événements de sécurité sont analysés en continu.
              </AlertDescription>
            </Alert>
          )}

          {/* Tableau de bord principal */}
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="events">Événements en Temps Réel</TabsTrigger>
              <TabsTrigger value="threats">Analyse des Menaces</TabsTrigger>
              <TabsTrigger value="network">Trafic Réseau</TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Journal des Événements de Sécurité
                  </CardTitle>
                  <CardDescription>
                    {events.length} événement(s) récent(s) - Mise à jour en temps réel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {events.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Aucun événement détecté</p>
                        <p className="text-sm">Démarrez le monitoring pour voir les événements en temps réel</p>
                      </div>
                    ) : (
                      events.map((event) => (
                        <div 
                          key={event.id} 
                          className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-card-hover transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              {getTypeIcon(event.type)}
                              <Badge className={getSeverityColor(event.severity)}>
                                {event.severity.toUpperCase()}
                              </Badge>
                            </div>
                            
                            <div className="flex-1">
                              <p className="font-medium">{event.description}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <span>IP: {event.source_ip}</span>
                                <span>Pays: {event.country}</span>
                                <span>{event.timestamp.toLocaleTimeString()}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {event.blocked ? (
                              <Badge className="bg-destructive">
                                <Lock className="h-3 w-3 mr-1" />
                                Bloqué
                              </Badge>
                            ) : (
                              <Badge variant="outline">
                                <Unlock className="h-3 w-3 mr-1" />
                                Autorisé
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="threats" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Distribution des Menaces</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {["Tentatives de brute force", "Scans de ports", "Injections SQL", "XSS", "Malware"].map((threat, index) => (
                        <div key={threat} className="flex items-center justify-between">
                          <span className="text-sm">{threat}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={Math.random() * 100} className="w-20" />
                            <span className="text-xs text-muted-foreground w-8">
                              {Math.floor(Math.random() * 50)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Géolocalisation des Attaques</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {["Russie", "Chine", "USA", "Brésil", "Corée du Nord"].map((country, index) => (
                        <div key={country} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{country}</span>
                          </div>
                          <Badge variant="outline">
                            {Math.floor(Math.random() * 100)} attaques
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="network" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Surveillance du Trafic Réseau</CardTitle>
                  <CardDescription>
                    Analyse du trafic entrant et sortant en temps réel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">
                        {Math.floor(Math.random() * 1000)} MB/s
                      </div>
                      <p className="text-sm text-muted-foreground">Trafic Entrant</p>
                      <TrendingUp className="h-4 w-4 mx-auto mt-2 text-success" />
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {Math.floor(Math.random() * 500)} MB/s
                      </div>
                      <p className="text-sm text-muted-foreground">Trafic Sortant</p>
                      <TrendingDown className="h-4 w-4 mx-auto mt-2 text-primary" />
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">
                        {Math.floor(Math.random() * 50)}
                      </div>
                      <p className="text-sm text-muted-foreground">Connexions Actives</p>
                      <Activity className="h-4 w-4 mx-auto mt-2 text-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default SecurityMonitor;