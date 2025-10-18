import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { artistData } from "@/app/data";
import { Download, FileText, Clock, AlertTriangle, ArrowRight, FileSignature } from "lucide-react";

const Organizer = () => {
  const organizerItems = [
    {
      title: "Варианты выступления и тайминг",
      icon: Clock,
      content: (
        <ul className="text-muted-foreground space-y-2 list-disc pl-5">
            <li><strong>Welcome-сет:</strong> 45-60 минут легкой и атмосферной музыки для встречи гостей.</li>
            <li><strong>Концертная программа:</strong> 2 блока по 45 минут с перерывом в 15-20 минут. Энергичный сет для основной части вечера.</li>
            <li><strong>Церемония или спец. номер:</strong> 1-3 знаковых композиции для ключевого момента (свадебная церемония, вынос торта).</li>
            <li><strong>Кастомизация:</strong> Всегда готов обсудить индивидуальный тайминг, идеально подходящий под ваше мероприятие. Саундчек проводится за 1-2 часа до начала.</li>
        </ul>
      ),
    },
    {
      title: "Звук и технические требования",
      icon: FileText,
      content: (
         <p className="text-muted-foreground">
          Минимальные требования к звуку и свету указаны в техническом райдере. Ключевые моменты: профессиональная звуковая система, микшерный пульт с обработкой, вокальный микрофон (предпочтительно Shure/Sennheiser) и мониторная линия. Базовое сценическое освещение обязательно.
        </p>
      ),
    },
    {
        title: "Договор и оплата",
        icon: FileSignature,
        content: (
          <p className="text-muted-foreground">
            Работа ведется официально с заключением договора, где прописываются все условия: дата, время, место, стоимость, тайминг, технические и бытовые требования. Это гарантирует спокойствие и четкое выполнение обязательств с обеих сторон.
          </p>
        ),
      },
    {
      title: "Форс-мажор и решение проблем",
      icon: AlertTriangle,
      content: (
        <p className="text-muted-foreground">
          Всегда на связи для решения любых вопросов. В случае непредвиденных ситуаций (проблемы с погодой на открытой площадке, задержки в тайминге) есть готовые решения и альтернативные планы. Главная задача — чтобы ваше мероприятие прошло идеально, несмотря ни на что.
        </p>
      ),
    },
  ];

  return (
    <section id="org" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Организатору
          </h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Все технические детали и документы, которые вам нужны, в одном месте.
          </p>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild variant="outline" size="lg">
            <a href={artistData.TECH_RIDER_URL} download>
              <Download className="mr-2" />
              Скачать техрайдер (PDF)
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={artistData.PRESS_KIT_URL} download>
              <FileText className="mr-2" />
              Скачать репертуар (PDF)
            </a>
          </Button>
        </div>
        <div className="mt-12 max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {organizerItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold py-4">
                    <item.icon className="mr-3 h-5 w-5 text-primary" />
                    {item.title}
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="p-4 bg-muted/50 rounded-md">{item.content}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="#contacts">
              Запросить дату и цену <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Organizer;
