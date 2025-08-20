import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, Download, Upload, Lock, Unlock, Key, Shield, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const CryptoTool = () => {
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [key, setKey] = useState("");
  const [algorithm, setAlgorithm] = useState("caesar");
  const [showKey, setShowKey] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  // Algorithmes de chiffrement
  const caesarCipher = (text: string, shift: number, decrypt = false) => {
    const s = decrypt ? 26 - (shift % 26) : shift % 26;
    return text
      .replace(/[a-z]/g, char => 
        String.fromCharCode(((char.charCodeAt(0) - 97 + s) % 26) + 97)
      )
      .replace(/[A-Z]/g, char => 
        String.fromCharCode(((char.charCodeAt(0) - 65 + s) % 26) + 65)
      );
  };

  const vigenereCipher = (text: string, key: string, decrypt = false) => {
    if (!key) return text;
    let result = "";
    let keyIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (/[a-zA-Z]/.test(char)) {
        const isUpperCase = char === char.toUpperCase();
        const charCode = char.toLowerCase().charCodeAt(0) - 97;
        const keyChar = key[keyIndex % key.length].toLowerCase().charCodeAt(0) - 97;
        
        let newCharCode;
        if (decrypt) {
          newCharCode = (charCode - keyChar + 26) % 26;
        } else {
          newCharCode = (charCode + keyChar) % 26;
        }
        
        const newChar = String.fromCharCode(newCharCode + 97);
        result += isUpperCase ? newChar.toUpperCase() : newChar;
        keyIndex++;
      } else {
        result += char;
      }
    }
    return result;
  };

  const base64Encode = (text: string) => {
    try {
      return btoa(unescape(encodeURIComponent(text)));
    } catch {
      return "Erreur d'encodage";
    }
  };

  const base64Decode = (text: string) => {
    try {
      return decodeURIComponent(escape(atob(text)));
    } catch {
      return "Erreur de décodage";
    }
  };

  const hexEncode = (text: string) => {
    return Array.from(text)
      .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
  };

  const hexDecode = (hex: string) => {
    try {
      return hex.match(/.{1,2}/g)?.map(byte => String.fromCharCode(parseInt(byte, 16))).join('') || "";
    } catch {
      return "Erreur de décodage hexadécimal";
    }
  };

  const encrypt = () => {
    if (!plaintext) {
      toast({ title: "Erreur", description: "Veuillez saisir un texte à chiffrer", variant: "destructive" });
      return;
    }

    let result = "";
    
    switch (algorithm) {
      case "caesar":
        const shift = parseInt(key) || 3;
        result = caesarCipher(plaintext, shift);
        break;
      case "vigenere":
        if (!key) {
          toast({ title: "Erreur", description: "Veuillez saisir une clé pour Vigenère", variant: "destructive" });
          return;
        }
        result = vigenereCipher(plaintext, key);
        break;
      case "base64":
        result = base64Encode(plaintext);
        break;
      case "hex":
        result = hexEncode(plaintext);
        break;
      default:
        result = plaintext;
    }
    
    setCiphertext(result);
    toast({ title: "Succès", description: "Texte chiffré avec succès" });
  };

  const decrypt = () => {
    if (!ciphertext) {
      toast({ title: "Erreur", description: "Veuillez saisir un texte à déchiffrer", variant: "destructive" });
      return;
    }

    let result = "";
    
    switch (algorithm) {
      case "caesar":
        const shift = parseInt(key) || 3;
        result = caesarCipher(ciphertext, shift, true);
        break;
      case "vigenere":
        if (!key) {
          toast({ title: "Erreur", description: "Veuillez saisir une clé pour Vigenère", variant: "destructive" });
          return;
        }
        result = vigenereCipher(ciphertext, key, true);
        break;
      case "base64":
        result = base64Decode(ciphertext);
        break;
      case "hex":
        result = hexDecode(ciphertext);
        break;
      default:
        result = ciphertext;
    }
    
    setPlaintext(result);
    toast({ title: "Succès", description: "Texte déchiffré avec succès" });
  };

  const analyzeText = (text: string) => {
    if (!text) return null;

    const length = text.length;
    const charFreq: { [key: string]: number } = {};
    const letterCount = text.replace(/[^a-zA-Z]/g, '').length;
    
    // Analyse de fréquence
    for (const char of text.toLowerCase()) {
      if (/[a-z]/.test(char)) {
        charFreq[char] = (charFreq[char] || 0) + 1;
      }
    }
    
    const sortedFreq = Object.entries(charFreq)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
    
    // Calcul de l'indice de coïncidence (approximatif)
    const ic = Object.values(charFreq).reduce((sum, freq) => 
      sum + (freq * (freq - 1)), 0) / (letterCount * (letterCount - 1)) || 0;
    
    return {
      length,
      letterCount,
      topFrequencies: sortedFreq,
      indexOfCoincidence: ic.toFixed(4),
      possibleCipher: ic > 0.06 ? "Probable texte en clair" : "Possible chiffrement"
    };
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copié", description: "Texte copié dans le presse-papiers" });
  };

  const downloadText = (text: string, filename: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gradient mb-4">
              Outil de Cryptographie
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chiffrez et déchiffrez vos messages avec différents algorithmes cryptographiques. 
              Parfait pour comprendre les bases de la sécurité informatique.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Configuration */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  Configuration
                </CardTitle>
                <CardDescription>
                  Choisissez l'algorithme et configurez les paramètres
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="algorithm">Algorithme</Label>
                  <Select value={algorithm} onValueChange={setAlgorithm}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="caesar">César (décalage)</SelectItem>
                      <SelectItem value="vigenere">Vigenère</SelectItem>
                      <SelectItem value="base64">Base64</SelectItem>
                      <SelectItem value="hex">Hexadécimal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(algorithm === "caesar" || algorithm === "vigenere") && (
                  <div>
                    <Label htmlFor="key">
                      {algorithm === "caesar" ? "Décalage" : "Clé"}
                    </Label>
                    <div className="relative">
                      <Input
                        id="key"
                        type={showKey ? "text" : "password"}
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        placeholder={algorithm === "caesar" ? "3" : "motdepasse"}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowKey(!showKey)}
                      >
                        {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button onClick={encrypt} className="flex-1">
                    <Lock className="h-4 w-4 mr-2" />
                    Chiffrer
                  </Button>
                  <Button onClick={decrypt} variant="outline" className="flex-1">
                    <Unlock className="h-4 w-4 mr-2" />
                    Déchiffrer
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Interface principale */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Chiffrement / Déchiffrement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="encrypt" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="encrypt">Chiffrement</TabsTrigger>
                    <TabsTrigger value="decrypt">Déchiffrement</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="encrypt" className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="plaintext">Texte en clair</Label>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(plaintext)}
                            disabled={!plaintext}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        id="plaintext"
                        value={plaintext}
                        onChange={(e) => setPlaintext(e.target.value)}
                        placeholder="Saisissez votre message à chiffrer..."
                        className="min-h-[120px] resize-none"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="ciphertext-result">Texte chiffré</Label>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(ciphertext)}
                            disabled={!ciphertext}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => downloadText(ciphertext, "message_chiffre.txt")}
                            disabled={!ciphertext}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        id="ciphertext-result"
                        value={ciphertext}
                        onChange={(e) => setCiphertext(e.target.value)}
                        placeholder="Le résultat du chiffrement apparaîtra ici..."
                        className="min-h-[120px] resize-none bg-muted"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="decrypt" className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="ciphertext-input">Texte chiffré</Label>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(ciphertext)}
                            disabled={!ciphertext}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        id="ciphertext-input"
                        value={ciphertext}
                        onChange={(e) => setCiphertext(e.target.value)}
                        placeholder="Saisissez le message chiffré à décrypter..."
                        className="min-h-[120px] resize-none"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="plaintext-result">Texte déchiffré</Label>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(plaintext)}
                            disabled={!plaintext}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => downloadText(plaintext, "message_dechiffre.txt")}
                            disabled={!plaintext}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        id="plaintext-result"
                        value={plaintext}
                        onChange={(e) => setPlaintext(e.target.value)}
                        placeholder="Le résultat du déchiffrement apparaîtra ici..."
                        className="min-h-[120px] resize-none bg-muted"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Analyse cryptographique */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Analyse Cryptographique</CardTitle>
              <CardDescription>
                Analysez la fréquence des caractères et obtenez des indices sur le type de chiffrement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <Button 
                  onClick={() => setAnalysisResult(analyzeText(plaintext))}
                  disabled={!plaintext}
                  variant="outline"
                >
                  Analyser le texte clair
                </Button>
                <Button 
                  onClick={() => setAnalysisResult(analyzeText(ciphertext))}
                  disabled={!ciphertext}
                  variant="outline"
                >
                  Analyser le texte chiffré
                </Button>
              </div>

              {analysisResult && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Statistiques générales</h4>
                    <div className="text-sm space-y-1">
                      <p>Longueur totale: <Badge variant="secondary">{analysisResult.length}</Badge></p>
                      <p>Lettres: <Badge variant="secondary">{analysisResult.letterCount}</Badge></p>
                      <p>Indice de coïncidence: <Badge variant="secondary">{analysisResult.indexOfCoincidence}</Badge></p>
                      <p>Analyse: <Badge className={analysisResult.possibleCipher.includes("clair") ? "bg-success" : "bg-accent"}>{analysisResult.possibleCipher}</Badge></p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Fréquences des lettres (Top 5)</h4>
                    <div className="space-y-1">
                      {analysisResult.topFrequencies.map(([char, freq]: [string, number]) => (
                        <div key={char} className="flex items-center justify-between text-sm">
                          <span className="font-mono uppercase">{char}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${(freq / analysisResult.letterCount) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground w-8">
                              {freq}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Informations éducatives */}
          <Alert className="mt-6">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Note éducative:</strong> Cet outil est conçu à des fins d'apprentissage. 
              Les algorithmes classiques comme César et Vigenère ne sont pas sécurisés pour un usage réel. 
              Utilisez des méthodes de chiffrement modernes (AES, RSA) pour protéger des données sensibles.
            </AlertDescription>
          </Alert>
        </div>
      </main>
    </div>
  );
};

export default CryptoTool;