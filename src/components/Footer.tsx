import React from 'react';
import { Shield, Twitter, Facebook, Linkedin, Github, Mail } from 'lucide-react';
import verifactLogo from '@/assets/verifact-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'How It Works', href: '#how-it-works' },
      { name: 'Features', href: '#about' },
      { name: 'Pricing', href: '#' },
      { name: 'API Documentation', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Contact', href: '#contact' },
      { name: 'Careers', href: '#' },
      { name: 'Press Kit', href: '#' },
    ],
    legal: [
      { name: 'Terms & Conditions', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'GDPR Compliance', href: '#' },
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Community Forum', href: '#' },
      { name: 'Status Page', href: '#' },
      { name: 'Bug Reports', href: '#contact' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Mail, href: '#contact', label: 'Email' },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src={verifactLogo} alt="Verifact" className="h-8 w-8" />
              <span className="text-xl font-bold text-primary">Verifact</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Empowering truth in the digital age through advanced AI-powered 
              fake news detection. Making information verification accessible to everyone.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-b py-8 mb-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">
              Get the latest updates on new features, security enhancements, and industry insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-input rounded-md bg-background"
              />
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-success" />
              <span className="text-sm text-muted-foreground">SOC 2 Type II Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-success" />
              <span className="text-sm text-muted-foreground">GDPR Compliant</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Trusted by 10,000+ users worldwide
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Verifact. All rights reserved. | 
            <a href="#" className="hover:text-primary ml-1">Terms</a> | 
            <a href="#" className="hover:text-primary ml-1">Privacy</a>
          </p>
          <p className="mt-2">
            Made with ❤️ for a more truthful internet
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;