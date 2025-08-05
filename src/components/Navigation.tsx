import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';
import verifactLogo from '@/assets/verifact-logo.png';

const Navigation = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <img src={verifactLogo} alt="Verifact" className="h-8 w-8" />
          <span className="text-xl font-bold text-primary">Verifact</span>
        </div>

        {/* Navigation Menu */}
        <div className="hidden md:flex items-center space-x-6">
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
          
          {/* Sign In Dialog */}
          <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
            <DialogTrigger asChild>
              <Button variant="default">Sign In</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Sign In to Verifact
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter your password" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Sign in to save your verification history and access premium features.
                </p>
                <Button className="w-full">Sign In</Button>
                <Button variant="outline" className="w-full">
                  Create Account
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm">
            Menu
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;