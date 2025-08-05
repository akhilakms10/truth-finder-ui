import { Card, CardContent } from "@/components/ui/card";
import { Shield, Brain, Users, Globe } from "lucide-react";

export const AboutSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Detection",
      description: "Advanced machine learning algorithms trained on millions of verified news articles"
    },
    {
      icon: Shield,
      title: "Trusted Sources",
      description: "Cross-references with multiple fact-checking databases and credible news sources"
    },
    {
      icon: Users,
      title: "User-Friendly Design",
      description: "Simple, intuitive interface that anyone can use to verify news content instantly"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Supports multiple languages and covers news from sources worldwide"
    }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Verifact</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              In an era of information overload and widespread misinformation, Verifact stands as your 
              trusted guardian of truth. Our mission is to empower everyone with the tools needed to 
              distinguish between real and fake news, fostering a more informed and discerning society.
            </p>
          </div>

          <Card className="bg-gradient-card shadow-elegant mb-12 animate-fade-in">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Our Mission</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To combat misinformation by providing instant, accurate, and accessible fake news 
                detection powered by cutting-edge artificial intelligence. We believe that access 
                to verified information is a fundamental right in the digital age.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-card hover:shadow-elegant transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{feature.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-block p-6 bg-primary/5 rounded-lg">
              <h4 className="text-lg font-semibold mb-2 text-primary">Join the Fight Against Misinformation</h4>
              <p className="text-muted-foreground">
                Every verification makes the internet a more trustworthy place for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};