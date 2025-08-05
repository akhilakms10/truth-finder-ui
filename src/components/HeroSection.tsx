import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FileText, Link2, Image, CheckCircle, XCircle, Shield, Zap, Brain } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('text');
  const [textInput, setTextInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const isReal = Math.random() > 0.5;
      const confidence = Math.floor(Math.random() * 30) + 70; // 70-99%
      
      setAnalysisResult({
        isReal,
        confidence,
        explanation: isReal 
          ? 'This content appears to be factually accurate based on reliable sources and fact-checking algorithms.'
          : 'This content contains misleading information that contradicts verified facts from trusted sources.'
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setTextInput('');
    setUrlInput('');
    setImageFile(null);
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center py-20"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Detect Fake News <span className="text-primary">Instantly</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Paste text, enter a URL, or upload an image to verify the truth with our AI-powered detection system.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex justify-center items-center gap-6 mb-12 text-white">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">Trusted by 10K+ users</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm">Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <span className="text-sm">AI-Powered</span>
            </div>
          </div>
        </div>

        {/* Analysis Tool */}
        <div className="max-w-4xl mx-auto">
          {!analysisResult ? (
            <Card className="backdrop-blur-md bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-center">Choose Your Analysis Method</CardTitle>
                <CardDescription className="text-gray-200 text-center">
                  Select how you want to verify your content
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Tab Selection */}
                <div className="flex justify-center mb-6">
                  <div className="bg-white/20 rounded-lg p-1 backdrop-blur-md">
                    <Button
                      variant={activeTab === 'text' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveTab('text')}
                      className="text-white"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Text
                    </Button>
                    <Button
                      variant={activeTab === 'url' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveTab('url')}
                      className="text-white"
                    >
                      <Link2 className="h-4 w-4 mr-2" />
                      URL
                    </Button>
                    <Button
                      variant={activeTab === 'image' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveTab('image')}
                      className="text-white"
                    >
                      <Image className="h-4 w-4 mr-2" />
                      Image
                    </Button>
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                  {activeTab === 'text' && (
                    <div>
                      <Label htmlFor="text-input" className="text-white">News Text</Label>
                      <Textarea
                        id="text-input"
                        placeholder="Paste the news article or text you want to verify..."
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        className="min-h-32 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                      />
                    </div>
                  )}

                  {activeTab === 'url' && (
                    <div>
                      <Label htmlFor="url-input" className="text-white">News URL</Label>
                      <Input
                        id="url-input"
                        type="url"
                        placeholder="https://example.com/news-article"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                      />
                    </div>
                  )}

                  {activeTab === 'image' && (
                    <div>
                      <Label htmlFor="image-input" className="text-white">Upload Image</Label>
                      <Input
                        id="image-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        className="bg-white/20 border-white/30 text-white"
                      />
                      {imageFile && (
                        <p className="text-sm text-gray-300 mt-2">
                          Selected: {imageFile.name}
                        </p>
                      )}
                    </div>
                  )}

                  <Button
                    onClick={simulateAnalysis}
                    disabled={isAnalyzing || (
                      (activeTab === 'text' && !textInput.trim()) ||
                      (activeTab === 'url' && !urlInput.trim()) ||
                      (activeTab === 'image' && !imageFile)
                    )}
                    size="xl"
                    className="w-full animate-pulse-glow"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            // Results Display
            <Card className="backdrop-blur-md bg-white/10 border-white/20">
              <CardContent className="pt-6">
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    {analysisResult.isReal ? (
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-16 w-16 text-success" />
                        <div>
                          <Badge variant="default" className="bg-success text-success-foreground text-lg px-4 py-2">
                            REAL NEWS
                          </Badge>
                          <p className="text-success text-sm mt-1 font-medium">
                            {analysisResult.confidence}% Confidence
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <XCircle className="h-16 w-16 text-destructive" />
                        <div>
                          <Badge variant="destructive" className="text-lg px-4 py-2">
                            FAKE NEWS
                          </Badge>
                          <p className="text-destructive text-sm mt-1 font-medium">
                            {analysisResult.confidence}% Confidence
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-md">
                    <h3 className="text-white font-semibold mb-2">Analysis Explanation</h3>
                    <p className="text-gray-200 text-sm">
                      {analysisResult.explanation}
                    </p>
                  </div>

                  <Button variant="outline" onClick={resetAnalysis} className="text-white border-white/30">
                    Analyze Another
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;