import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Zap, CheckCircle2 } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: FileText,
      title: "Input Content",
      description: "Paste news text, enter a news URL, or upload an image containing news content for analysis.",
      step: "01"
    },
    {
      icon: Zap,
      title: "AI Analysis",
      description: "Our advanced AI system analyzes the content using multiple verification methods and credibility checks.",
      step: "02"
    },
    {
      icon: CheckCircle2,
      title: "Get Results",
      description: "Receive instant results showing whether the content is real or fake, with confidence scores and explanations.",
      step: "03"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Verifact Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get accurate fake news detection in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="relative bg-gradient-card shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                    <step.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full">
            <Zap className="h-5 w-5 text-primary animate-bounce-gentle" />
            <span className="text-primary font-medium">Fast, Accurate, and Reliable</span>
          </div>
        </div>
      </div>
    </section>
  );
};