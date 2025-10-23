"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/hooks/use-toast";

const eventTypes: { [key: string]: string } = {
  wedding: "свадьбы",
  corporate: "корпоративного мероприятия",
  club: "клубного выступления",
  festival: "фестиваля",
};

export function PersonalizationToggle() {
  const { toast } = useToast();

  return (
    <Select
      onValueChange={(value) => {
        toast({
          title: "Контент персонализирован",
          description: `Страница теперь адаптирована для ${eventTypes[value]}.`,
        });
      }}
    >
      <SelectTrigger className="w-[220px] bg-card shadow-sm">
        <SelectValue placeholder="✨ Персонализировать для..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="wedding">Свадьба</SelectItem>
        <SelectItem value="corporate">Корпоратив</SelectItem>
        <SelectItem value="club">Клуб</SelectItem>
        <SelectItem value="festival">Фестиваль</SelectItem>
      </SelectContent>
    </Select>
  );
}
