import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";
import contactIllustration from "@/assets/contact-illustration.jpg";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Contactez-moi</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Intéressé par mon profil ? N'hésitez pas à me contacter pour discuter de vos projets
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Restons en contact</h3>
              <p className="text-muted-foreground mb-8">
                Je suis toujours ouvert aux nouvelles opportunités et collaborations. 
                Que vous ayez un projet en tête ou souhaitiez simplement échanger, 
                je serais ravi de vous entendre.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 shadow-glow">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">Lyde72@hotmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-secondary/10 shadow-secondary">
                  <Phone className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">Téléphone</p>
                  <p className="text-muted-foreground">+32 492 43 84 63</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-accent/10 shadow-accent">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Localisation</p>
                  <p className="text-muted-foreground">Bruxelles, Belgique</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 shadow-glow">
                  <Github className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">GitHub</p>
                  <a href="https://github.com/Lyde96" target="_blank" rel="noopener noreferrer" 
                     className="text-muted-foreground hover:text-primary transition-colors">
                    github.com/Lyde96
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-secondary/10 shadow-secondary">
                  <Linkedin className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">LinkedIn</p>
                  <a href="https://linkedin.com/in/lyderic-yabada" target="_blank" rel="noopener noreferrer"
                     className="text-muted-foreground hover:text-secondary transition-colors">
                    Lydéric Yabada
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Envoyez-moi un message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstname">Prénom</Label>
                    <Input id="firstname" placeholder="Votre prénom" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname">Nom</Label>
                    <Input id="lastname" placeholder="Votre nom" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="votre.email@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet</Label>
                  <Input id="subject" placeholder="Sujet de votre message" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Décrivez votre projet ou posez votre question..."
                    rows={5}
                  />
                </div>
                
                <Button type="submit" className="w-full btn-gradient">
                  <Send className="mr-2 h-4 w-4" />
                  Envoyer le message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;