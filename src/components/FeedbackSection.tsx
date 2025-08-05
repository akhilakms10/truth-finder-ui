import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const FeedbackSection = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please provide a rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate feedback submission
    setTimeout(() => {
      toast({
        title: "Thank You!",
        description: "Your feedback helps us improve Verifact for everyone.",
      });
      setRating(0);
      setFeedback('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="feedback" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Share Your Feedback</h2>
            <p className="text-xl text-muted-foreground">
              Help us improve Verifact by sharing your experience and suggestions.
            </p>
          </div>

          <Card className="bg-gradient-card shadow-elegant animate-fade-in">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <MessageSquare className="h-6 w-6 text-primary" />
                Your Opinion Matters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">Rate Your Experience</h3>
                  <div className="flex justify-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="transition-all duration-200 hover:scale-110"
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setRating(star)}
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= (hoveredRating || rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'
                          } transition-colors duration-200`}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {rating === 0 && "Click to rate"}
                    {rating === 1 && "Poor - Needs significant improvement"}
                    {rating === 2 && "Fair - Could be better"}
                    {rating === 3 && "Good - Meets expectations"}
                    {rating === 4 && "Very Good - Exceeds expectations"}
                    {rating === 5 && "Excellent - Outstanding experience"}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Tell us more (optional)
                  </h3>
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your thoughts, suggestions, or report any issues you encountered..."
                    className="min-h-32"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Send className="h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Your feedback is anonymous and helps us build better fake news detection tools.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};