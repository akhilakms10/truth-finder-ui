import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Link, Image, Upload, AlertCircle, CheckCircle2, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroBackground from "@/assets/hero-bg.jpg";

interface AnalysisResult {
  type: 'real' | 'fake';
  confidence: number;
  explanation: string;
}

export const HeroSection = () => {
  const [activeTab, setActiveTab] = useState<'text' | 'url' | 'image'>('text');
  const [textInput, setTextInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const analyzeContent = async () => {
    if (!textInput && !urlInput && !imageFile) {
      toast({
        title: "Input Required",
        description: "Please provide content to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call with random result for demo
    setTimeout(() => {
      const isReal = Math.random() > 0.5;
      const confidence = Math.floor(Math.random() * 30) + 70; // 70-99%
      
      setResult({
        type: isReal ? 'real' : 'fake',
        confidence,
        explanation: isReal 
          ? "This content appears to be legitimate based on source credibility, fact-checking databases, and linguistic analysis."
          : "This content shows signs of misinformation including suspicious language patterns, lack of credible sources, and contradictory information."
      });
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Content classified as ${isReal ? 'real' : 'fake'} with ${confidence}% confidence.`,
      });
    }, 2000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center py-20">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Detect Fake News Instantly
            <span className="block text-2xl md:text-3xl font-normal mt-2 text-primary-foreground/90">
              with Verifact
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-3xl mx-auto">
            Paste text, enter a URL, or upload an image to verify the truth behind any news content
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Input Method Selection */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              variant={activeTab === 'text' ? 'hero' : 'outline'}
              size="lg"
              onClick={() => setActiveTab('text')}
              className="gap-2"
            >
              <FileText className="h-5 w-5" />
              Text Input
            </Button>
            <Button
              variant={activeTab === 'url' ? 'hero' : 'outline'}
              size="lg"
              onClick={() => setActiveTab('url')}
              className="gap-2"
            >
              <Link className="h-5 w-5" />
              URL Input
            </Button>
            <Button
              variant={activeTab === 'image' ? 'hero' : 'outline'}
              size="lg"
              onClick={() => setActiveTab('image')}
              className="gap-2"
            >
              <Image className="h-5 w-5" />
              Image Upload
            </Button>
          </div>

          {/* Input Cards */}
          <Card className="bg-gradient-card shadow-elegant animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {activeTab === 'text' && <FileText className="h-5 w-5 text-primary" />}
                {activeTab === 'url' && <Link className="h-5 w-5 text-primary" />}
                {activeTab === 'image' && <Image className="h-5 w-5 text-primary" />}
                {activeTab === 'text' && 'Analyze News Text'}
                {activeTab === 'url' && 'Analyze News URL'}
                {activeTab === 'image' && 'Analyze News Image'}
              </CardTitle>
              <CardDescription>
                {activeTab === 'text' && 'Paste the news article text you want to verify'}
                {activeTab === 'url' && 'Enter the URL of the news article'}
                {activeTab === 'image' && 'Upload an image containing news content'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeTab === 'text' && (
                <Textarea
                  placeholder="Enter the news text you want to analyze..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="min-h-32"
                />
              )}
              
              {activeTab === 'url' && (
                <Input
                  placeholder="https://example.com/news-article"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  type="url"
                />
              )}
              
              {activeTab === 'image' && (
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {imageFile ? imageFile.name : 'Click to upload an image or drag and drop'}
                    </p>
                  </label>
                </div>
              )}

              <Button
                variant="analyze"
                size="xl"
                className="w-full"
                onClick={analyzeContent}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <BarChart3 className="h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5" />
                    Analyze Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Display */}
          {result && (
            <Card className="mt-8 animate-fade-in shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {result.type === 'real' ? (
                    <>
                      <CheckCircle2 className="h-6 w-6 text-success" />
                      <span className="text-success">Real News Detected</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-6 w-6 text-destructive" />
                      <span className="text-destructive">Fake News Detected</span>
                    </>
                  )}
                  <Badge 
                    variant={result.type === 'real' ? 'default' : 'destructive'}
                    className="ml-auto"
                  >
                    {result.confidence}% Confidence
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {result.explanation}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};