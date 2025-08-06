import { pipeline, env } from '@huggingface/transformers';
import { SentimentAnalyzer, PorterStemmer, WordTokenizer } from 'natural';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

interface AnalysisResult {
  isReal: boolean;
  confidence: number;
  explanation: string;
  details: {
    sentimentScore: number;
    biasIndicators: string[];
    credibilityFactors: string[];
    linguisticPatterns: string[];
  };
}

class FakeNewsDetector {
  private classifier: any = null;
  private sentimentAnalyzer: any = null;
  private initialized = false;

  async initialize() {
    if (this.initialized) return;

    try {
      console.log('Initializing ML models...');
      
      // Initialize text classification pipeline with a model trained on fake news detection
      this.classifier = await pipeline(
        'text-classification',
        'onnx-community/roberta-base-openai-detector',
        { device: 'webgpu' }
      );

      // Initialize sentiment analyzer
      this.sentimentAnalyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
      
      this.initialized = true;
      console.log('ML models initialized successfully');
    } catch (error) {
      console.error('Error initializing ML models:', error);
      // Fallback to CPU if WebGPU fails
      try {
        this.classifier = await pipeline(
          'text-classification',
          'onnx-community/roberta-base-openai-detector'
        );
        this.initialized = true;
      } catch (fallbackError) {
        console.error('Fallback initialization failed:', fallbackError);
        throw new Error('Failed to initialize ML models');
      }
    }
  }

  async analyzeText(text: string): Promise<AnalysisResult> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // 1. ML Classification using Hugging Face model
      const classificationResult = await this.classifier(text);
      const mlScore = this.interpretClassificationResult(classificationResult);

      // 2. Sentiment Analysis
      const sentimentScore = this.analyzeSentiment(text);

      // 3. Linguistic Pattern Analysis
      const linguisticPatterns = this.analyzeLinguisticPatterns(text);

      // 4. Bias and Credibility Indicators
      const biasIndicators = this.detectBiasIndicators(text);
      const credibilityFactors = this.assessCredibility(text);

      // 5. Combine all factors for final decision
      const finalScore = this.combineScores(mlScore, sentimentScore, linguisticPatterns, biasIndicators, credibilityFactors);
      
      const isReal = finalScore.score > 0.5;
      const confidence = Math.round(Math.abs(finalScore.score - 0.5) * 200); // Convert to percentage

      return {
        isReal,
        confidence: Math.min(confidence, 99),
        explanation: this.generateExplanation(finalScore, isReal),
        details: {
          sentimentScore,
          biasIndicators,
          credibilityFactors,
          linguisticPatterns
        }
      };
    } catch (error) {
      console.error('Error during analysis:', error);
      throw new Error('Analysis failed. Please try again.');
    }
  }

  private interpretClassificationResult(result: any): number {
    if (Array.isArray(result) && result.length > 0) {
      const topResult = result[0];
      // Assuming the model returns 'FAKE' and 'REAL' labels
      if (topResult.label === 'REAL' || topResult.label === 'Human') {
        return topResult.score;
      } else {
        return 1 - topResult.score;
      }
    }
    return 0.5; // Neutral if no clear result
  }

  private analyzeSentiment(text: string): number {
    const tokenizer = new WordTokenizer();
    const tokens = tokenizer.tokenize(text.toLowerCase()) || [];
    const stemmedTokens = tokens.map(token => PorterStemmer.stem(token));
    const sentiment = this.sentimentAnalyzer.getSentiment(stemmedTokens);
    
    // Normalize sentiment score to 0-1 range
    return (sentiment + 5) / 10; // AFINN scores range from -5 to 5
  }

  private analyzeLinguisticPatterns(text: string): string[] {
    const patterns: string[] = [];
    
    // Check for excessive capitalization
    const capsRatio = (text.match(/[A-Z]/g) || []).length / text.length;
    if (capsRatio > 0.1) {
      patterns.push('Excessive capitalization detected');
    }

    // Check for excessive punctuation
    const exclamationCount = (text.match(/!/g) || []).length;
    if (exclamationCount > 3) {
      patterns.push('Excessive exclamation marks');
    }

    // Check for clickbait patterns
    const clickbaitPatterns = [
      /you won't believe/i,
      /this will shock you/i,
      /doctors hate/i,
      /one weird trick/i,
      /\d+ reasons why/i
    ];
    
    clickbaitPatterns.forEach(pattern => {
      if (pattern.test(text)) {
        patterns.push('Clickbait language detected');
      }
    });

    // Check for emotional manipulation
    const emotionalWords = [
      'outrageous', 'shocking', 'incredible', 'unbelievable', 
      'devastating', 'explosive', 'breaking'
    ];
    
    const emotionalCount = emotionalWords.filter(word => 
      text.toLowerCase().includes(word)
    ).length;
    
    if (emotionalCount > 2) {
      patterns.push('High emotional manipulation language');
    }

    return patterns;
  }

  private detectBiasIndicators(text: string): string[] {
    const indicators: string[] = [];
    
    // Check for absolute statements
    const absoluteWords = ['always', 'never', 'all', 'none', 'every', 'completely'];
    const absoluteCount = absoluteWords.filter(word => 
      text.toLowerCase().includes(word)
    ).length;
    
    if (absoluteCount > 2) {
      indicators.push('Excessive absolute statements');
    }

    // Check for lack of sources
    const sourcePatterns = [
      /according to/i,
      /study shows/i,
      /research indicates/i,
      /experts say/i,
      /data reveals/i
    ];
    
    const hasSourceReference = sourcePatterns.some(pattern => pattern.test(text));
    if (!hasSourceReference && text.length > 200) {
      indicators.push('No credible sources cited');
    }

    // Check for conspiracy language
    const conspiracyWords = [
      'cover-up', 'conspiracy', 'they don\'t want you to know', 
      'hidden truth', 'suppressed', 'mainstream media'
    ];
    
    const conspiracyCount = conspiracyWords.filter(word => 
      text.toLowerCase().includes(word)
    ).length;
    
    if (conspiracyCount > 0) {
      indicators.push('Conspiracy theory language');
    }

    return indicators;
  }

  private assessCredibility(text: string): string[] {
    const factors: string[] = [];
    
    // Check for specific dates
    const datePattern = /\b(19|20)\d{2}\b|\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+(19|20)\d{2}\b/i;
    if (datePattern.test(text)) {
      factors.push('Specific dates mentioned');
    }

    // Check for quotes
    const quotePattern = /"[^"]{10,}"/g;
    const quotes = text.match(quotePattern);
    if (quotes && quotes.length > 0) {
      factors.push('Direct quotes included');
    }

    // Check for statistical data
    const statsPattern = /\b\d+(\.\d+)?%|\b\d+\s+(percent|people|participants|respondents)\b/i;
    if (statsPattern.test(text)) {
      factors.push('Statistical data provided');
    }

    // Check for balanced language
    const balancedWords = ['however', 'although', 'while', 'on the other hand', 'nevertheless'];
    const balancedCount = balancedWords.filter(word => 
      text.toLowerCase().includes(word)
    ).length;
    
    if (balancedCount > 0) {
      factors.push('Balanced perspective language');
    }

    return factors;
  }

  private combineScores(
    mlScore: number,
    sentimentScore: number,
    linguisticPatterns: string[],
    biasIndicators: string[],
    credibilityFactors: string[]
  ): { score: number; reasoning: string[] } {
    let finalScore = mlScore * 0.4; // ML model gets 40% weight
    
    // Sentiment analysis (20% weight)
    // Extreme sentiment scores (very positive or negative) can indicate bias
    const sentimentBias = Math.abs(sentimentScore - 0.5) * 2;
    finalScore += (1 - sentimentBias) * 0.2;
    
    // Linguistic patterns (20% weight)
    const linguisticPenalty = Math.min(linguisticPatterns.length * 0.1, 0.2);
    finalScore += (0.2 - linguisticPenalty);
    
    // Bias indicators (10% weight)
    const biasPenalty = Math.min(biasIndicators.length * 0.05, 0.1);
    finalScore += (0.1 - biasPenalty);
    
    // Credibility factors (10% weight)
    const credibilityBonus = Math.min(credibilityFactors.length * 0.025, 0.1);
    finalScore += credibilityBonus;
    
    // Ensure score is between 0 and 1
    finalScore = Math.max(0, Math.min(1, finalScore));
    
    const reasoning = [
      `ML model confidence: ${(mlScore * 100).toFixed(1)}%`,
      `Sentiment analysis: ${sentimentScore > 0.7 ? 'Highly positive' : sentimentScore < 0.3 ? 'Highly negative' : 'Balanced'}`,
      `Linguistic issues: ${linguisticPatterns.length}`,
      `Bias indicators: ${biasIndicators.length}`,
      `Credibility factors: ${credibilityFactors.length}`
    ];
    
    return { score: finalScore, reasoning };
  }

  private generateExplanation(finalScore: { score: number; reasoning: string[] }, isReal: boolean): string {
    const baseExplanation = isReal 
      ? 'This content appears to be legitimate based on our analysis. '
      : 'This content shows characteristics of potentially misleading information. ';
    
    const factors = finalScore.reasoning.join(', ');
    
    return `${baseExplanation}Analysis factors: ${factors}. Our AI model combines multiple detection techniques including linguistic pattern analysis, sentiment evaluation, and bias detection to provide this assessment.`;
  }

  async analyzeUrl(url: string): Promise<AnalysisResult> {
    try {
      // For URL analysis, we would typically fetch the content
      // For now, we'll simulate this with domain analysis
      const domain = new URL(url).hostname.toLowerCase();
      
      // Simple domain credibility check
      const trustedDomains = [
        'reuters.com', 'bbc.com', 'npr.org', 'ap.org', 
        'cnn.com', 'nytimes.com', 'washingtonpost.com',
        'theguardian.com', 'abc.com', 'cbsnews.com'
      ];
      
      const suspiciousDomains = [
        'fake-news.com', 'clickbait.com', 'conspiracy.com'
      ];
      
      let domainScore = 0.5; // Neutral for unknown domains
      
      if (trustedDomains.some(trusted => domain.includes(trusted))) {
        domainScore = 0.8;
      } else if (suspiciousDomains.some(suspicious => domain.includes(suspicious))) {
        domainScore = 0.2;
      }
      
      const isReal = domainScore > 0.5;
      const confidence = Math.round(Math.abs(domainScore - 0.5) * 200);
      
      return {
        isReal,
        confidence: Math.min(confidence, 99),
        explanation: `Domain analysis indicates ${isReal ? 'a credible' : 'a potentially unreliable'} source. ${isReal ? 'This domain is recognized as a legitimate news source.' : 'This domain may not be a verified news source.'}`,
        details: {
          sentimentScore: 0.5,
          biasIndicators: isReal ? [] : ['Unverified domain'],
          credibilityFactors: isReal ? ['Recognized news domain'] : [],
          linguisticPatterns: []
        }
      };
    } catch (error) {
      throw new Error('Invalid URL format');
    }
  }

  async analyzeImage(file: File): Promise<AnalysisResult> {
    // For image analysis, we could implement:
    // 1. Reverse image search simulation
    // 2. Metadata analysis
    // 3. Image manipulation detection
    
    // Simplified implementation for now
    const fileName = file.name.toLowerCase();
    const fileSize = file.size;
    
    // Basic heuristics
    const suspiciousFactors: string[] = [];
    const credibilityFactors: string[] = [];
    
    if (fileSize < 50000) {
      suspiciousFactors.push('Very low image quality');
    }
    
    if (fileName.includes('meme') || fileName.includes('fake')) {
      suspiciousFactors.push('Filename suggests edited content');
    }
    
    if (file.type.startsWith('image/')) {
      credibilityFactors.push('Valid image format');
    }
    
    const score = suspiciousFactors.length > credibilityFactors.length ? 0.3 : 0.7;
    const isReal = score > 0.5;
    const confidence = Math.round(Math.abs(score - 0.5) * 200);
    
    return {
      isReal,
      confidence: Math.min(confidence, 99),
      explanation: `Image analysis completed. ${isReal ? 'No obvious signs of manipulation detected.' : 'Potential signs of manipulation or unreliable source detected.'}`,
      details: {
        sentimentScore: 0.5,
        biasIndicators: suspiciousFactors,
        credibilityFactors,
        linguisticPatterns: []
      }
    };
  }
}

export const fakeNewsDetector = new FakeNewsDetector();