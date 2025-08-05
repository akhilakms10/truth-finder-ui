import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Menu, X, Shield, LogIn } from "lucide-react";
import logo from "@/assets/logo.png";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Verifact Logo" className="h-8 w-8" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Verifact
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Button variant="ghost" onClick={() => scrollToSection('hero')}>
              Home
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection('how-it-works')}>
              How It Works
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection('about')}>
              About
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection('contact')}>
              Contact Us
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection('feedback')}>
              Feedback
            </Button>
            
            <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Sign In to Verifact
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                  </div>
                  <Button className="w-full" variant="hero">
                    Sign In
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    Login allows you to save your analysis history
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-slide-in">
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" onClick={() => scrollToSection('hero')}>
                Home
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => scrollToSection('how-it-works')}>
                How It Works
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => scrollToSection('about')}>
                About
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => scrollToSection('contact')}>
                Contact Us
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => scrollToSection('feedback')}>
                Feedback
              </Button>
              <Button variant="outline" className="w-full gap-2 mt-4" onClick={() => setIsSignInOpen(true)}>
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};