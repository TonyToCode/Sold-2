"use client";

import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card";
import { artistData } from "@/app/data";
import { Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay"

const SocialProof = () => {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">
          Что говорят клиенты
        </h2>
        
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
            {artistData.ALL_LOGOS.map((logo) => (
                <div key={logo.id} className="flex flex-col items-center justify-center gap-2">
                <Image
                    src={logo.imageUrl}
                    alt={logo.description}
                    data-ai-hint={logo.imageHint}
                    width={120}
                    height={40}
                    className="h-10 object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all"
                    unoptimized
                />
                </div>
            ))}
        </div>

        <div className="mt-12">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                      delay: 4000,
                    }),
                ]}
                className="w-full max-w-4xl mx-auto"
            >
                <CarouselContent>
                    {artistData.QUOTES.map((quote, index) => (
                        <CarouselItem key={index} className="md:basis-1/2">
                             <Card className="border-2 border-primary/20 shadow-lg h-full">
                                <CardContent className="p-6 flex flex-col justify-center h-full">
                                    <div className="flex gap-1 mb-4 text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-current" />
                                    ))}
                                    </div>
                                    <blockquote className="text-lg italic text-foreground/80 grow">
                                    "{quote.text}"
                                    </blockquote>
                                    <p className="mt-4 font-headline font-semibold text-right text-primary">
                                    &mdash; {quote.source}
                                    </p>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
