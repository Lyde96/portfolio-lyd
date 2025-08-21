import { useState } from "react";
import { ShoppingCart, Heart, Search, Menu, X, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const EcommerceHome = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const products = [
    {
      id: 1,
      name: "T-Shirt Empreinte LVND",
      price: 45,
      originalPrice: 55,
      category: "t-shirts",
      image: "/lovable-uploads/13b9fa19-c977-4181-85cf-45d3cc0fc56b.png",
      rating: 4.8,
      reviews: 124,
      isNew: true,
      colors: ["Noir", "Blanc"],
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: 2,
      name: "Ensemble Collection LVND",
      price: 120,
      originalPrice: 150,
      category: "ensembles",
      image: "/lovable-uploads/875285f7-60dd-4206-a3ea-bf880f08a327.png",
      rating: 4.9,
      reviews: 89,
      isNew: false,
      colors: ["Vert", "Noir", "Marron"],
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: 3,
      name: "Hoodie Premium Collection",
      price: 85,
      originalPrice: 95,
      category: "hoodies",
      image: "/lovable-uploads/1af9cf69-fb73-4e75-a996-93452b5405c8.png",
      rating: 4.7,
      reviews: 156,
      isNew: false,
      colors: ["Marron", "Jaune"],
      sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
      id: 4,
      name: "Hoodie Signature LVND",
      price: 90,
      originalPrice: 110,
      category: "hoodies",
      image: "/lovable-uploads/9525f63a-88ef-4517-879e-2cd53bd2f822.png",
      rating: 4.8,
      reviews: 203,
      isNew: true,
      colors: ["Marron", "Jaune"],
      sizes: ["M", "L", "XL"]
    },
    {
      id: 5,
      name: "Collection Duo LVND",
      price: 95,
      originalPrice: 120,
      category: "hoodies",
      image: "/lovable-uploads/5d7471e0-eba2-460f-bde8-a9bb2298f470.png",
      rating: 4.9,
      reviews: 178,
      isNew: false,
      colors: ["Jaune", "Marron"],
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: 6,
      name: "Sac à Dos LVND Premium",
      price: 65,
      originalPrice: 75,
      category: "accessoires",
      image: "/lovable-uploads/7219e149-cebc-4271-b580-f2824b96ea39.png",
      rating: 4.6,
      reviews: 92,
      isNew: true,
      colors: ["Blanc", "Noir"],
      sizes: ["Unique"]
    },
    {
      id: 7,
      name: "Duo Sacs LVND Urban",
      price: 130,
      originalPrice: 160,
      category: "accessoires",
      image: "/lovable-uploads/c9a173f5-6609-488f-bc23-fa8d19c39fbd.png",
      rating: 4.8,
      reviews: 67,
      isNew: false,
      colors: ["Blanc"],
      sizes: ["Unique"]
    },
    {
      id: 8,
      name: "T-Shirt Racing LVND",
      price: 50,
      originalPrice: 60,
      category: "t-shirts",
      image: "/lovable-uploads/45d6271c-2120-41ed-9b1e-a1c4ed31ee67.png",
      rating: 4.7,
      reviews: 134,
      isNew: true,
      colors: ["Blanc"],
      sizes: ["S", "M", "L", "XL"]
    }
  ];

  const categories = [
    { id: "all", name: "Tous les produits", count: products.length },
    { id: "t-shirts", name: "T-Shirts", count: products.filter(p => p.category === "t-shirts").length },
    { id: "hoodies", name: "Hoodies", count: products.filter(p => p.category === "hoodies").length },
    { id: "ensembles", name: "Ensembles", count: products.filter(p => p.category === "ensembles").length },
    { id: "accessoires", name: "Accessoires", count: products.filter(p => p.category === "accessoires").length }
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="font-bold text-2xl tracking-tight">
              LVND<span className="text-xs align-super">®</span>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">Accueil</a>
            <a href="#products" className="text-sm font-medium hover:text-primary transition-colors">Produits</a>
            <a href="#collections" className="text-sm font-medium hover:text-primary transition-colors">Collections</a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">À propos</a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-4 w-4" />
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                3
              </Badge>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="container flex flex-col space-y-4 py-4">
              <a href="#home" className="text-sm font-medium">Accueil</a>
              <a href="#products" className="text-sm font-medium">Produits</a>
              <a href="#collections" className="text-sm font-medium">Collections</a>
              <a href="#about" className="text-sm font-medium">À propos</a>
              <a href="#contact" className="text-sm font-medium">Contact</a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/80" />
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/b7aa5aa7-bd75-4087-b631-fa2027068631.png" 
            alt="LVND Brand"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            LVND<span className="text-2xl md:text-4xl align-super">®</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            EST.2017
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Marque streetwear authentique depuis 2017. Découvrez notre collection exclusive de vêtements urbains premium qui reflètent votre style unique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" className="w-full sm:w-auto">
              Découvrir la Collection
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Nouveautés
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Produits Phares</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos pièces les plus populaires de la collection LVND
            </p>
          </div>
          
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {featuredProducts.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="group cursor-pointer overflow-hidden border-0 bg-card hover:shadow-lg transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.isNew && (
                        <Badge className="absolute top-4 left-4 bg-primary">Nouveau</Badge>
                      )}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="secondary" size="icon" className="rounded-full">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-3">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold">{product.price}€</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.originalPrice}€
                          </span>
                        )}
                      </div>
                      <Button className="w-full group-hover:bg-primary/90 transition-colors">
                        Ajouter au Panier
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Tous nos Produits</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explorez l'intégralité de notre collection streetwear premium
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <span>{category.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group cursor-pointer overflow-hidden border-0 bg-card hover:shadow-lg transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.isNew && (
                    <Badge className="absolute top-4 left-4 bg-primary">Nouveau</Badge>
                  )}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="icon" className="rounded-full">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold">{product.price}€</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice}€
                      </span>
                    )}
                  </div>
                  <Button size="sm" className="w-full group-hover:bg-primary/90 transition-colors">
                    Ajouter au Panier
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Restez Connecté</h2>
            <p className="text-muted-foreground">
              Soyez les premiers informés de nos nouveautés et offres exclusives
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Votre adresse email" 
                className="flex-1"
              />
              <Button>S'abonner</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="font-bold text-xl">
                LVND<span className="text-xs align-super">®</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Marque streetwear authentique depuis 2017. Style urbain premium.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Produits</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>T-Shirts</p>
                <p>Hoodies</p>
                <p>Accessoires</p>
                <p>Collections</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Guide des tailles</p>
                <p>Livraison</p>
                <p>Retours</p>
                <p>Contact</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Légal</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Conditions</p>
                <p>Confidentialité</p>
                <p>Cookies</p>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 LVND. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EcommerceHome;