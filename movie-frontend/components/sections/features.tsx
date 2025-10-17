import { CheckCircle, Heart, Brain, Star } from 'lucide-react';
import React from 'react';

const featuresData = [
  {
    icon: Brain,
    title: "AI-Powered Recommendations",
    description: "Get personalized movie suggestions based on your viewing history and preferences using advanced machine learning.",
  },
  {
    icon: Heart,
    title: "Personal Watchlist",
    description: "Save movies you want to watch and organize your viewing queue with our intuitive watchlist feature.",
  },
  {
    icon: Star,
    title: "Rate & Review",
    description: "Rate movies you've watched and help improve recommendations for yourself and other movie lovers.",
  },
  {
    icon: CheckCircle,
    title: "Comprehensive Database",
    description: "Access thousands of movies with detailed information, posters, and ratings from trusted sources.",
  },
];

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 flex flex-col items-start transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
      <div className="mb-6">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      <h3 className="text-xl font-bold font-display text-text-primary mb-2">
        {title}
      </h3>
      <p className="text-text-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[--color-burgundy-gradient-start] -z-10" />
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
              Why Choose MovieGrid?
            </h2>
            <p className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-pink-primary to-purple-accent">
              Experience the future of movie discovery with our AI-powered recommendation engine designed for cinephiles seeking their next favorite film.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {featuresData.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;