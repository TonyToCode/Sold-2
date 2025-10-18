"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { artistData } from "@/app/data";
import {
  Phone,
  Youtube,
  Instagram,
  Send,
  Music,
  HeartPulse,
  Smile
} from "lucide-react";
import ContactForm from "@/components/contact-form";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.18 3.05.28 4.58.04.66.34 1.29.83 1.81.54.55 1.23.9 1.95 1.09.12-.02.24-.04.36-.06.2-.04.39-.1.59-.14.28-.06.56-.13.84-.23.05 1.57.08 3.14.1 4.71-.02.02-.04.04-.06.06a4.2 4.2 0 01-1.92 1.3c-.45.22-.92.4-1.4.56-.37.12-.75.23-1.13.32-.24.06-.48.1-.72.16-.2.04-.4.08-.6.12-.23.04-.46.08-.69.11-.23.03-.47.05-.7.06-.2.01-.4.02-.6.02-.27 0-.54-.01-.81-.02-1.28-.02-2.57-.01-3.85-.02-.08-1.53-.18-3.05-.28-4.58-.04-.66-.34-1.29-.83-1.81-.54-.55-1.23-.9-1.95-1.09-.12.02-.24.04-.36-.06-.2.04-.39.1-.59-.14-.28-.06-.56-.13-.84-.23-.05-1.57-.08-3.14-.1-4.71.02-.02.04-.04.06-.06a4.19 4.19 0 011.92-1.3c.45-.22.92.4 1.4-.56.37.12.75.23-1.13.32.24.06.48.1.72.16.2.04.4.08.6.12.23.04.46.08.69.11.23.03.47.05.7.06.2.01.4.02.6.02z" />
  </svg>
);

const socialLinks = [
  { icon: Youtube, href: artistData.YOUTUBE, name: "YouTube" },
  { icon: Youtube, href: artistData.YOUTUBE2, name: "YouTube (канал #2)" },
  { icon: Instagram, href: artistData.INSTAGRAM, name: "Instagram" },
  { icon: Send, href: artistData.TELEGRAM, name: "Telegram" },
  { icon: TikTokIcon, href: artistData.TIKTOK, name: "TikTok" },
];


const Contact = () => {
  return (
    <section id="contacts" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Контакты
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Готовы забронировать или есть вопрос? Свяжитесь со мной.
            </p>
            <div className="mt-8 space-y-4">
              <Button asChild variant="link" className="text-lg p-0 h-auto">
                <a href={`tel:${artistData.PHONE}`}>
                  <Phone className="mr-3 h-5 w-5" />
                  {artistData.PHONE}
                </a>
              </Button>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <Button
                    asChild
                    key={social.name}
                    variant="outline"
                    size="icon"
                  >
                    <Link href={social.href} target="_blank" aria-label={social.name}>
                      <social.icon className="h-5 w-5" />
                    </Link>
                  </Button>
                ))}
              </div>
              <p className="text-sm text-accent font-semibold">
                Отвечаем в течение {artistData.SLA_MIN} минут
              </p>
            </div>
             <div className="mt-12 bg-card p-6 rounded-lg shadow-lg">
                <h3 className="font-headline text-2xl text-primary mb-4">Ваше мероприятие — это событие</h3>
                <p className="text-muted-foreground mb-6">Создайте атмосферу, которую гости запомнят надолго. Музыка Sold — это не просто фон, а сердце вашего вечера.</p>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <Music className="h-5 w-5 text-accent"/>
                        <span className="font-medium">Уникальная программа под ваше событие</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <HeartPulse className="h-5 w-5 text-accent"/>
                        <span className="font-medium">Эмоциональная отдача и работа с залом</span>
                    </div>
                     <div className="flex items-center gap-3">
                        <Smile className="h-5 w-5 text-accent"/>
                        <span className="font-medium">Профессионализм и лёгкость в коммуникации</span>
                    </div>
                </div>
            </div>
          </div>
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                Забронировать
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
