import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { artistData } from "@/app/data";
import { PersonalizationToggle } from "./personalization-toggle";
import { ArrowRight, Music, HeartPulse, Smile } from "lucide-react";

const Hero = () => {
  return (
    <section id="main" className="relative pt-32 pb-20 text-center bg-card overflow-hidden">
      <div className="absolute top-0 right-0 -mr-48 -mt-48 w-96 h-96 bg-primary/10 rounded-full" />
      <div className="absolute bottom-0 left-0 -ml-48 -mb-48 w-96 h-96 bg-accent/10 rounded-full" />
      <div className="container relative mx-auto px-4">
        <div className="absolute top-4 right-4 hidden sm:block">
            <PersonalizationToggle />
        </div>

        <p className="font-headline text-2xl text-primary">{artistData.VOICE_TOKENS}</p>

        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight leading-tight max-w-4xl mx-auto mt-4">
          SOLD: музыка, которая создаёт событие
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Живой вокал и авторские аранжировки, которые сделают ваш вечер незабываемым. Энергия, стиль и профессионализм в каждой ноте.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 p-4 bg-background rounded-lg shadow-sm">
            <Music className="h-6 w-6 text-accent" />
            <span className="font-semibold">{artistData.BENEFITS[0]}</span>
          </div>
           <div className="flex items-center gap-3 p-4 bg-background rounded-lg shadow-sm">
            <HeartPulse className="h-6 w-6 text-accent" />
            <span className="font-semibold">{artistData.BENEFITS[1]}</span>
          </div>
           <div className="flex items-center gap-3 p-4 bg-background rounded-lg shadow-sm">
            <Smile className="h-6 w-6 text-accent" />
            <span className="font-semibold">{artistData.BENEFITS[2]}</span>
          </div>
        </div>
        
        <div className="mt-12">
          <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            Нам доверяют
          </p>
          <div className="relative mt-6">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent className="-ml-1">
                {artistData.LOGOS.map((logo, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-1 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                  >
                    <div className="p-1 flex flex-col items-center gap-2">
                      <Image
                        src={logo.imageUrl}
                        alt={logo.description}
                        data-ai-hint={logo.imageHint}
                        width={150}
                        height={50}
                        className="w-24 h-12 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
                        unoptimized
                      />
                      <p className="text-xs font-medium text-muted-foreground">{logo.name}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
            <Link href="#contacts">
              Забронировать <ArrowRight className="ml-2" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link href="#contacts">Посмотреть контакты</Link>
          </Button>
        </div>

        {artistData.DATES_SNIPPET && (
          <div className="mt-16 text-center">
            <p className="font-medium text-accent">{artistData.DATES_SNIPPET}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
