import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Play, 
  Code, 
  Book, 
  Server, 
  Database, 
  Key, 
  ArrowLeft,
  CheckCircle,
  XCircle,
  Copy,
  ExternalLink 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const APIDocumentation = () => {
  const { toast } = useToast();
  const [selectedEndpoint, setSelectedEndpoint] = useState("users");
  const [requestBody, setRequestBody] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("GET");

  const endpoints = [
    {
      id: "users",
      path: "/api/users",
      method: "GET",
      description: "Récupérer la liste des utilisateurs",
      parameters: [
        { name: "page", type: "query", required: false, description: "Numéro de page" },
        { name: "limit", type: "query", required: false, description: "Nombre d'éléments par page" }
      ],
      responses: {
        200: { description: "Liste des utilisateurs récupérée avec succès", example: `{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 150,
  "page": 1,
  "per_page": 10
}` },
        400: { description: "Paramètres invalides" },
        500: { description: "Erreur serveur interne" }
      }
    },
    {
      id: "users-post",
      path: "/api/users",
      method: "POST",
      description: "Créer un nouvel utilisateur",
      requestBody: {
        required: true,
        example: `{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "securePassword123"
}`
      },
      responses: {
        201: { description: "Utilisateur créé avec succès", example: `{
  "id": 2,
  "name": "Jane Smith",
  "email": "jane@example.com",
  "created_at": "2024-01-15T11:00:00Z"
}` },
        400: { description: "Données invalides" },
        409: { description: "Email déjà utilisé" }
      }
    },
    {
      id: "auth",
      path: "/api/auth/login",
      method: "POST", 
      description: "Authentification utilisateur",
      requestBody: {
        required: true,
        example: `{
  "email": "user@example.com",
  "password": "password123"
}`
      },
      responses: {
        200: { description: "Authentification réussie", example: `{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "expires_in": 3600
}` },
        401: { description: "Identifiants invalides" },
        429: { description: "Trop de tentatives de connexion" }
      }
    }
  ];

  const currentEndpoint = endpoints.find(e => e.id === selectedEndpoint);

  const handleTestEndpoint = async () => {
    setLoading(true);
    
    // Simulation d'un appel API
    setTimeout(() => {
      const mockResponse = currentEndpoint?.responses[200]?.example || "{}";
      setResponse(mockResponse);
      setLoading(false);
      
      toast({
        title: "Test réussi",
        description: "La requête a été exécutée avec succès",
      });
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copié !",
      description: "Le contenu a été copié dans le presse-papiers",
    });
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET": return "bg-green-500/10 text-green-700 border-green-200";
      case "POST": return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "PUT": return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "DELETE": return "bg-red-500/10 text-red-700 border-red-200";
      default: return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/portfolio">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Portfolio
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Book className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">API REST Documentation</h1>
                  <p className="text-sm text-muted-foreground">Documentation interactive pour API RESTful</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Server className="h-3 w-3" />
                v1.2.0
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                En ligne
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar - Liste des endpoints */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Endpoints
                </CardTitle>
                <CardDescription>
                  Sélectionnez un endpoint pour voir sa documentation
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-1 p-4">
                    {endpoints.map((endpoint) => (
                      <button
                        key={endpoint.id}
                        onClick={() => setSelectedEndpoint(endpoint.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selectedEndpoint === endpoint.id
                            ? "bg-primary/10 border-primary/20"
                            : "bg-background hover:bg-muted/50 border-border"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Badge className={`text-xs ${getMethodColor(endpoint.method)}`}>
                            {endpoint.method}
                          </Badge>
                        </div>
                        <div className="font-mono text-sm font-medium">{endpoint.path}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {endpoint.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentEndpoint && (
              <div className="space-y-6">
                {/* Endpoint Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Badge className={getMethodColor(currentEndpoint.method)}>
                        {currentEndpoint.method}
                      </Badge>
                      <code className="text-lg font-mono bg-muted px-3 py-1 rounded">
                        {currentEndpoint.path}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(currentEndpoint.path)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription className="text-base">
                      {currentEndpoint.description}
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Tabs defaultValue="documentation" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="documentation">Documentation</TabsTrigger>
                    <TabsTrigger value="test">Tester l'API</TabsTrigger>
                    <TabsTrigger value="examples">Exemples</TabsTrigger>
                  </TabsList>

                  <TabsContent value="documentation" className="space-y-6">
                    {/* Paramètres */}
                    {currentEndpoint.parameters && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Paramètres</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {currentEndpoint.parameters.map((param, index) => (
                              <div key={index} className="border-l-2 border-primary/20 pl-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <code className="bg-muted px-2 py-1 rounded text-sm">
                                    {param.name}
                                  </code>
                                  <Badge variant={param.required ? "destructive" : "secondary"} className="text-xs">
                                    {param.required ? "Requis" : "Optionnel"}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {param.type}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{param.description}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Corps de la requête */}
                    {currentEndpoint.requestBody && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Corps de la requête</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <Badge variant="destructive" className="text-xs">
                                Requis
                              </Badge>
                              <code className="text-sm">application/json</code>
                            </div>
                            <div className="relative">
                              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                                <code>{currentEndpoint.requestBody.example}</code>
                              </pre>
                              <Button
                                variant="outline"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => copyToClipboard(currentEndpoint.requestBody.example)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Réponses */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Réponses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {Object.entries(currentEndpoint.responses).map(([code, response]) => (
                            <div key={code} className="border rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <Badge 
                                  className={`${
                                    code.startsWith('2') ? 'bg-green-500/10 text-green-700 border-green-200' :
                                    code.startsWith('4') ? 'bg-yellow-500/10 text-yellow-700 border-yellow-200' :
                                    'bg-red-500/10 text-red-700 border-red-200'
                                  }`}
                                >
                                  {code}
                                </Badge>
                                <span className="text-sm font-medium">{response.description}</span>
                                {code.startsWith('2') && <CheckCircle className="h-4 w-4 text-green-500" />}
                                {code.startsWith('4') && <XCircle className="h-4 w-4 text-yellow-500" />}
                                {code.startsWith('5') && <XCircle className="h-4 w-4 text-red-500" />}
                              </div>
                              {'example' in response && response.example && (
                                <div className="relative">
                                  <pre className="bg-muted/50 p-3 rounded text-xs overflow-x-auto">
                              <code>{'example' in response ? response.example : '{}'}</code>
                            </pre>
                            <Button
                              variant="outline"
                              size="sm"
                              className="absolute top-1 right-1 h-6 w-6 p-0"
                              onClick={() => copyToClipboard('example' in response ? response.example : '{}')}
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="test" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Tester l'endpoint</CardTitle>
                        <CardDescription>
                          Testez directement l'API depuis cette interface
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* URL et méthode */}
                        <div className="flex gap-2">
                          <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="GET">GET</SelectItem>
                              <SelectItem value="POST">POST</SelectItem>
                              <SelectItem value="PUT">PUT</SelectItem>
                              <SelectItem value="DELETE">DELETE</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input 
                            value={`https://api.example.com${currentEndpoint.path}`} 
                            readOnly 
                            className="flex-1 font-mono"
                          />
                        </div>

                        {/* Headers */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Headers</label>
                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <Input placeholder="Content-Type" value="application/json" readOnly />
                              <Input placeholder="Bearer your-token-here" />
                            </div>
                          </div>
                        </div>

                        {/* Corps de la requête */}
                        {(selectedMethod === "POST" || selectedMethod === "PUT") && (
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Corps de la requête</label>
                            <Textarea
                              placeholder="Entrez le JSON ici..."
                              value={requestBody || currentEndpoint.requestBody?.example || ""}
                              onChange={(e) => setRequestBody(e.target.value)}
                              className="font-mono text-sm"
                              rows={8}
                            />
                          </div>
                        )}

                        <Button 
                          onClick={handleTestEndpoint} 
                          disabled={loading}
                          className="w-full btn-gradient"
                        >
                          {loading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                              Exécution...
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Exécuter la requête
                            </>
                          )}
                        </Button>

                        {/* Réponse */}
                        {response && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium">Réponse</label>
                              <Badge className="bg-green-500/10 text-green-700 border-green-200">
                                200 OK
                              </Badge>
                            </div>
                            <div className="relative">
                              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto max-h-64">
                                <code>{response}</code>
                              </pre>
                              <Button
                                variant="outline"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => copyToClipboard(response)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="examples" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Exemples d'utilisation</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* cURL Example */}
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <Code className="h-4 w-4" />
                            cURL
                          </h4>
                          <div className="relative">
                            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                              <code>{`curl -X ${currentEndpoint.method} \\
  'https://api.example.com${currentEndpoint.path}' \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer your-token-here'${currentEndpoint.requestBody ? ` \\
  -d '${currentEndpoint.requestBody.example}'` : ''}`}</code>
                            </pre>
                            <Button
                              variant="outline"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => copyToClipboard(`curl -X ${currentEndpoint.method} 'https://api.example.com${currentEndpoint.path}' -H 'Content-Type: application/json' -H 'Authorization: Bearer your-token-here'${currentEndpoint.requestBody ? ` -d '${currentEndpoint.requestBody.example}'` : ''}`)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* JavaScript Example */}
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <Code className="h-4 w-4" />
                            JavaScript (Fetch)
                          </h4>
                          <div className="relative">
                            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                              <code>{`fetch('https://api.example.com${currentEndpoint.path}', {
  method: '${currentEndpoint.method}',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token-here'
  }${currentEndpoint.requestBody ? `,
  body: JSON.stringify(${currentEndpoint.requestBody.example})` : ''}
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}</code>
                            </pre>
                            <Button
                              variant="outline"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => copyToClipboard(`fetch('https://api.example.com${currentEndpoint.path}', {
  method: '${currentEndpoint.method}',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token-here'
  }${currentEndpoint.requestBody ? `,
  body: JSON.stringify(${currentEndpoint.requestBody.example})` : ''}
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Python Example */}
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <Code className="h-4 w-4" />
                            Python (Requests)
                          </h4>
                          <div className="relative">
                            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                              <code>{`import requests

url = "https://api.example.com${currentEndpoint.path}"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer your-token-here"
}${currentEndpoint.requestBody ? `
data = ${currentEndpoint.requestBody.example}

response = requests.${currentEndpoint.method.toLowerCase()}(url, headers=headers, json=data)` : `

response = requests.${currentEndpoint.method.toLowerCase()}(url, headers=headers)`}
print(response.json())`}</code>
                            </pre>
                            <Button
                              variant="outline"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => copyToClipboard(`import requests

url = "https://api.example.com${currentEndpoint.path}"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer your-token-here"
}${currentEndpoint.requestBody ? `
data = ${currentEndpoint.requestBody.example}

response = requests.${currentEndpoint.method.toLowerCase()}(url, headers=headers, json=data)` : `

response = requests.${currentEndpoint.method.toLowerCase()}(url, headers=headers)`}
print(response.json())`)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Key className="h-5 w-5 text-primary" />
                Authentification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                L'API utilise l'authentification JWT. Incluez votre token dans le header Authorization.
              </p>
              <code className="text-xs bg-muted p-2 rounded block">
                Authorization: Bearer your-jwt-token
              </code>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Database className="h-5 w-5 text-primary" />
                Limites de taux
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                L'API limite les requêtes à 1000 par heure par clé API.
              </p>
              <div className="space-y-1 text-xs">
                <div>• Standard: 1000 req/h</div>
                <div>• Premium: 10000 req/h</div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ExternalLink className="h-5 w-5 text-primary" />
                SDKs disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Des SDKs officiels sont disponibles pour plusieurs langages.
              </p>
              <div className="space-y-1 text-xs">
                <div>• JavaScript/Node.js</div>
                <div>• Python</div>
                <div>• PHP</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default APIDocumentation;