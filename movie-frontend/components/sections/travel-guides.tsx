"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const guides = [
  {
    name: 'Aarav Mehta',
    specialty: 'Himalayan Treks',
    description: 'Certified mountain guide with 10+ years of experience leading treks in the Indian Himalayas.',
    image: 'https://randomuser.me/api/portraits/men/34.jpg',
  },
  {
    name: 'Sofia Rossi',
    specialty: 'Italian Cities & Culture',
    description: 'Passionate about art, food, and history. Fluent in English and Italian. Rome-based.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'James Carter',
    specialty: 'African Safaris',
    description: 'Wildlife expert and safari guide, specializing in Kenya and Tanzania national parks.',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    name: 'Kenji Tanaka',
    specialty: 'Japanese Culinary Tours',
    description: 'Master sushi chef turned guide. Explore the rich food culture of Japan, from street food to Michelin stars.',
    image: 'https://randomuser.me/api/portraits/men/11.jpg',
  },
  {
    name: 'Isabella Garcia',
    specialty: 'Andalusian History',
    description: 'Historian specializing in the Moorish influence in Spain. Uncover the secrets of Seville, Granada, and Cordoba.',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
];

export default function TravelGuides() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <section className="w-full py-16 md:py-24 bg-navy-base text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
            Meet Our{' '}
            <span className="bg-gradient-to-r from-pink-primary to-purple-accent bg-clip-text text-transparent">
              Top Travel Guides
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-text-muted max-w-2xl mx-auto">
            Connect with experienced local guides who will make your journey truly unforgettable.
          </p>
        </div>

        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {guides.map((guide, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full"> 
                    <div className="bg-card border border-border rounded-2xl p-6 h-full flex flex-col text-center items-center transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(236,72,153,0.3)]">
                      <div className="p-1 rounded-full bg-gradient-to-tr from-pink-primary to-purple-accent mb-4">
                        <Image
                          src={guide.image}
                          alt={guide.name}
                          width={120}
                          height={120}
                          className="rounded-full border-2 border-dark-surface"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-text-primary font-display">{guide.name}</h3>
                      <p className="text-sm font-semibold bg-gradient-to-r from-pink-light to-purple-accent bg-clip-text text-transparent mt-1">
                        {guide.specialty}
                      </p>
                      <p className="text-sm text-text-muted mt-4 flex-grow">
                        {guide.description}
                      </p>
                      <button className="mt-6 py-2.5 px-8 rounded-lg font-semibold text-white bg-gradient-to-r from-pink-primary to-purple-accent hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                        View Profile
                      </button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          <button onClick={scrollPrev} aria-label="Previous guide" className="absolute top-1/2 -translate-y-1/2 -left-2 md:-left-6 lg:-left-12 h-12 w-12 rounded-full bg-black/30 border border-border flex items-center justify-center backdrop-blur-sm hover:bg-primary/80 transition-all duration-300 text-white z-10">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button onClick={scrollNext} aria-label="Next guide" className="absolute top-1/2 -translate-y-1/2 -right-2 md:-right-6 lg:-right-12 h-12 w-12 rounded-full bg-black/30 border border-border flex items-center justify-center backdrop-blur-sm hover:bg-primary/80 transition-all duration-300 text-white z-10">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex justify-center gap-2 mt-8">
          {guides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index ? 'w-4 bg-primary' : 'w-2 bg-muted/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}