import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Cloud, Palette, Smartphone, Globe } from "lucide-react";
import skillsIllustration from "@/assets/skills-illustration.jpg";

const skillCategories = [
  {
    icon: Code,
    title: "Frontend",
    skills: ["React", "TypeScript", "Next.js", "Vue.js", "Tailwind CSS", "HTML5", "CSS3", "JavaScript"]
  },
  {
    icon: Database,
    title: "Backend",
    skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Supabase", "Firebase", "REST APIs", "GraphQL"]
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud",
    skills: ["Docker", "AWS", "Vercel", "Netlify", "Git", "GitHub Actions", "Linux", "CI/CD"]
  },
  {
    icon: Smartphone,
    title: "Mobile",
    skills: ["React Native", "Expo", "Flutter", "PWA", "Responsive Design", "Mobile-First"]
  },
  {
    icon: Palette,
    title: "Design",
    skills: ["Figma", "Adobe XD", "UI/UX", "Design Systems", "Prototyping", "User Research"]
  },
  {
    icon: Globe,
    title: "Autres",
    skills: ["Agile", "Scrum", "TDD", "Clean Code", "Team Leadership", "Problem Solving"]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-6 bg-background-secondary relative overflow-hidden">
      {/* Background illustration */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-20">
        <img 
          src={skillsIllustration} 
          alt="Skills illustration" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Mes Compétences</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies et outils que je maîtrise pour créer des solutions complètes
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card 
              key={category.title} 
              className="card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    index % 3 === 0 ? 'bg-primary/10 shadow-glow' : 
                    index % 3 === 1 ? 'bg-secondary/10 shadow-secondary' : 
                    'bg-accent/10 shadow-accent'
                  }`}>
                    <category.icon className={`h-6 w-6 ${
                      index % 3 === 0 ? 'text-primary' : 
                      index % 3 === 1 ? 'text-secondary' : 
                      'text-accent'
                    }`} />
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;