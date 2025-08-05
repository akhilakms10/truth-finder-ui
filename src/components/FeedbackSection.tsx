import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Star, ThumbsUp, MessageSquare, TrendingUp } from 'lucide-react';

const FeedbackSection = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for helping us improve Verifact.",
      });
      setRating(0);
      setFeedback('');
      setIsSubmitting(false);
    }, 1500);
  };

  const feedbackStats = [
    {
      icon: ThumbsUp,
      value: '98%',
      label: 'Satisfaction Rate',
      color: 'text-success'
    },
    {
      icon: MessageSquare,
      value: '2,500+',
      label: 'User Reviews',
      color: 'text-primary'
    },
    {
      icon: TrendingUp,
      value: '4.9/5',
      label: 'Average Rating',
      color: 'text-primary'
    }
  ];

  return (
    <section id="feedback" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your <span className="text-primary">Feedback</span> Matters
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help us improve Verifact by sharing your experience and suggestions
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Feedback Form */}
          <Card>
            <CardHeader>
              <CardTitle>Rate Your Experience</CardTitle>
              <CardDescription>
                Your feedback helps us make Verifact better for everyone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Star Rating */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">How would you rate Verifact?</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="focus:outline-none transition-colors"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= (hoveredRating || rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {rating === 5 && "Excellent! We're thrilled you love Verifact."}
                      {rating === 4 && "Great! Thanks for the positive feedback."}
                      {rating === 3 && "Good! We'd love to hear how we can improve."}
                      {rating === 2 && "Fair. Please tell us what we can do better."}
                      {rating === 1 && "Poor. We're sorry to hear that. Help us improve."}
                    </p>
                  )}
                </div>

                {/* Feedback Text */}
                <div className="space-y-2">
                  <label htmlFor="feedback" className="text-sm font-medium">
                    Share your thoughts (optional)
                  </label>
                  <Textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us what you love about Verifact or how we can improve..."
                    className="min-h-32"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || rating === 0}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Feedback Stats and Testimonials */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Community Feedback</CardTitle>
                <CardDescription>
                  See what our users are saying about Verifact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {feedbackStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className={`w-12 h-12 mx-auto mb-2 rounded-lg bg-primary/10 flex items-center justify-center`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Testimonials */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">2 days ago</span>
                  </div>
                  <p className="text-sm italic">
                    "Verifact has become my go-to tool for checking news authenticity. 
                    The accuracy is impressive and the interface is so user-friendly!"
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">- Sarah M.</p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">5 days ago</span>
                  </div>
                  <p className="text-sm italic">
                    "As a journalist, this tool saves me hours of fact-checking. 
                    The confidence scores help me prioritize which stories to investigate further."
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">- Mark T.</p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">1 week ago</span>
                  </div>
                  <p className="text-sm italic">
                    "Great tool overall! Would love to see support for more languages 
                    and maybe a browser extension for quick checking."
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">- Alex R.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;