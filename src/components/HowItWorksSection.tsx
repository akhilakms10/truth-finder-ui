import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Search, CheckCircle } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Submit Content',
      description: 'Paste news text, enter a news URL, or upload an image containing news content.',
      details: 'Our system accepts multiple formats to make verification as convenient as possible.'
    },
    {
      icon: Search,
      title: 'AI Analysis',
      description: 'Our advanced AI algorithms analyze the content against trusted sources and fact-checking databases.',
      details: 'We use machine learning models trained on millions of verified news articles.'
    },
    {
      icon: CheckCircle,
      title: 'Get Results',
      description: 'Receive instant results showing whether the content is Real or Fake, with confidence scores and explanations.',
      details: 'Clear, actionable insights help you make informed decisions about news credibility.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How <span className="text-primary">Verifact</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our simple 3-step process makes fake news detection fast and reliable
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 relative">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                      <step.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                  <CardDescription className="text-base">
                    {step.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {step.details}
                  </p>
                </CardContent>
              </Card>
              
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30 transform -translate-y-1/2 z-10">
                  <div className="absolute right-0 w-2 h-2 bg-primary rounded-full transform translate-x-1 -translate-y-0.5"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3">
            <CheckCircle className="h-5 w-5 text-primary" />
            <span className="text-primary font-medium">Fast, Accurate, Reliable</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;