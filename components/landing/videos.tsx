import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { artistData } from '@/app/data';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';

const Videos = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">
          Видео
        </h2>
        <p className="mt-2 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
          Почувствуйте нашу энергию и сценическое присутствие. Вот несколько ярких моментов с недавних мероприятий.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {artistData.VIDEOS.slice(0, 3).map((video, index) => (
            <Link href={video.videoUrl} target="_blank" key={index} className="group">
                <Card className="overflow-hidden h-full transition-shadow duration-300 hover:shadow-xl">
                <CardHeader className="p-0 relative">
                    <Image
                    src={video.imageUrl}
                    alt={video.title}
                    data-ai-hint={video.imageHint}
                    width={600}
                    height={400}
                    className="aspect-video object-cover"
                    unoptimized
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/50">
                    <PlayCircle className="h-16 w-16 text-white/80 transform transition-transform duration-300 group-hover:text-white group-hover:scale-110" />
                    </div>
                </CardHeader>
                <CardContent className="p-4">
                    <CardTitle className="text-lg font-semibold">{video.title}</CardTitle>
                    <CardDescription className="mt-1 text-sm">{video.description}</CardDescription>
                </CardContent>
                </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;
