import Image from "next/image";
import { Star } from "lucide-react";

const testimonialsData = [
  {
    name: "Alex M.",
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ab61a626-fad4-4b16-bb27-262199b58876-travel-grid-vercel-app/assets/icons/32-2.jpg?",
    quote:
      "This movie recommendation platform is incredible! It suggested films that perfectly matched my taste and introduced me to hidden gems I would have never found on my own.",
    rating: 5,
  },
  {
    name: "Sarah K.",
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ab61a626-fad4-4b16-bb27-262199b58876-travel-grid-vercel-app/assets/icons/44-3.jpg?",
    quote:
      "I love how the AI understands my preferences. The watchlist feature makes it easy to keep track of movies I want to see. Best movie recommendation service I've used!",
    rating: 5,
  },
  {
    name: "Michael T.",
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ab61a626-fad4-4b16-bb27-262199b58876-travel-grid-vercel-app/assets/icons/65-4.jpg?",
    quote:
      "The interface is sleek and intuitive. I've discovered so many great films across different genres that I wouldn't have considered watching before.",
    rating: 4,
  },
  {
    name: "Priya R.",
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ab61a626-fad4-4b16-bb27-262199b58876-travel-grid-vercel-app/assets/icons/68-5.jpg?",
    quote:
      "This platform has completely changed how I find movies to watch. The personalized recommendations are spot-on, and the modern design makes browsing a pleasure!",
    rating: 5,
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex justify-center mt-auto pt-4">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
        }`}
        strokeWidth={1.5}
      />
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <section className="w-full py-20 lg:py-24 bg-[--color-dark-surface]">
      <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-[#1e1b4b] via-[#4c0519] to-[#1e1b4b] opacity-60"></div>
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            <span className="text-white">What Our </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-primary to-purple-accent">
              Movie Lovers Say
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of satisfied users who have discovered amazing
            films with our AI-powered recommendation platform.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-card/80 border border-border rounded-2xl p-6 text-center flex flex-col items-center transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(236,72,153,0.2)] backdrop-blur-sm"
            >
              <div className="relative mb-4">
                <div className="p-1 rounded-full bg-gradient-to-br from-pink-primary to-purple-accent">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover w-20 h-20"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2 font-display">
                {testimonial.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 flex-grow">
                {testimonial.quote}
              </p>
              <StarRating rating={testimonial.rating} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;