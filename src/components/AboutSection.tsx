import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Zap, Brain, Award, Globe } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning algorithms trained on millions of verified articles'
    },
    {
      icon: Zap,
      title: 'Instant Analysis',
      description: 'Get results in seconds, not minutes. Real-time fact-checking at your fingertips'
    },
    {
      icon: Shield,
      title: 'Trusted Sources',
      description: 'Cross-referenced with reputable news outlets and fact-checking organizations'
    },
    {
      icon: Users,
      title: 'User-Friendly',
      description: 'Simple interface designed for everyone, from students to professionals'
    },
    {
      icon: Award,
      title: 'High Accuracy',
      description: '95%+ accuracy rate in detecting misinformation and fake news content'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Support for multiple languages and international news sources'
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Mission Statement */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-primary">Verifact</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Empowering truth in the digital age through advanced AI technology
            </p>
            
            <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="p-0">
                <h3 className="text-2xl font-semibold mb-4 text-primary">Our Mission</h3>
                <p className="text-lg leading-relaxed text-foreground">
                  In an era where misinformation spreads faster than truth, Verifact stands as your digital guardian 
                  against fake news. We leverage cutting-edge artificial intelligence to help users quickly identify 
                  and combat false information, promoting a more informed and truthful digital society.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Problem Statement */}
          <div className="mb-16">
            <Card className="p-8 border-destructive/20 bg-destructive/5">
              <CardContent className="p-0">
                <h3 className="text-2xl font-semibold mb-4 text-destructive">The Problem We Solve</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Misinformation Crisis</h4>
                    <p className="text-muted-foreground">
                      False information spreads 6x faster than true stories on social media, 
                      affecting elections, public health, and social harmony.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Information Overload</h4>
                    <p className="text-muted-foreground">
                      With thousands of news sources and social media posts daily, 
                      it's impossible to manually verify every piece of information.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12">Why Choose Verifact?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-semibold text-lg">{feature.title}</h4>
                    </div>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="text-center">
            <Card className="p-8 bg-gradient-to-r from-success/5 to-primary/5 border-success/20">
              <CardContent className="p-0">
                <h3 className="text-2xl font-semibold mb-8">Trusted by Thousands</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                    <div className="text-sm text-muted-foreground">Users Trust Us</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">95%</div>
                    <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">1M+</div>
                    <div className="text-sm text-muted-foreground">Articles Analyzed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">Available</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;