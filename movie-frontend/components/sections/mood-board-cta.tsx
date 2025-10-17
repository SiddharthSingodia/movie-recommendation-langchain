import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MoodBoardCta = () => {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative max-w-4xl mx-auto bg-card/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 text-center overflow-hidden">
          {/* Decorative accent gradients */}
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 bg-purple-accent/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-48 h-48 md:w-64 md:h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-6 flex-shrink-0">
              <div className="p-4 bg-gradient-to-br from-primary to-pink-light rounded-full shadow-lg shadow-primary/30">
                <Palette className="w-10 h-10 text-white" />
              </div>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
              Create Your Travel Mood Board
            </h2>

            <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-lg mx-auto">
              Save destinations, inspirations, and packages all in one place.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs sm:max-w-none mx-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto font-semibold bg-gradient-to-r from-primary via-pink-light to-purple-accent text-primary-foreground hover:opacity-90 transition-opacity duration-300 shadow-lg shadow-primary/20"
              >
                Sign in to Start
              </Button>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto font-semibold bg-dark-surface hover:bg-dark-surface/80">
                Explore ideas
              </Button>
            </div>

            <ul className="mt-8 flex flex-col items-start text-left sm:text-center sm:items-center sm:flex-row sm:flex-wrap justify-center gap-x-6 gap-y-2 text-muted-foreground text-sm">
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                Save destinations
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                Collect inspirations
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                Share with friends
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoodBoardCta;