"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { artistData } from "@/app/data";
import { Music4, PlusCircle, MinusCircle, Send, X } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter
} from "@/components/ui/sheet";
import ContactForm from "@/components/contact-form";

type Song = {
  title: string;
  artist: string;
  hint: string;
  tempo: string;
  mood: string;
};

const FilterButtons = ({
  title,
  options,
  selected,
  setSelected,
}: {
  title: string;
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
}) => (
  <div className="flex items-center gap-2 flex-wrap">
    <p className="font-medium text-sm mr-2">{title}:</p>
    <Button
      variant={selected === "All" ? "secondary" : "ghost"}
      size="sm"
      onClick={() => setSelected("All")}
    >
      Все
    </Button>
    {options.map((option) => (
      <Button
        key={option}
        variant={selected === option ? "secondary" : "ghost"}
        size="sm"
        onClick={() => setSelected(option)}
      >
        {option}
      </Button>
    ))}
  </div>
);

const Repertoire = () => {
  const [tempo, setTempo] = useState("All");
  const [mood, setMood] = useState("All");
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const filterSongs = (songs: Song[]) => {
    return songs.filter(
      (song) =>
        (tempo === "All" || song.tempo === tempo) &&
        (mood === "All" || song.mood === mood)
    );
  };

  const filteredRuSongs = useMemo(() => filterSongs(artistData.REPERTOIRE.ru), [tempo, mood]);
  const filteredEnSongs = useMemo(() => filterSongs(artistData.REPERTOIRE.en), [tempo, mood]);

  const handleSelectSong = (song: Song) => {
    setSelectedSongs((prev) =>
      prev.find((s) => s.title === song.title)
        ? prev.filter((s) => s.title !== song.title)
        : [...prev, song]
    );
  };
  
  const isSongSelected = (song: Song) => {
    return selectedSongs.some((s) => s.title === song.title);
  };


  const renderSongList = (songs: Song[]) => {
    if (songs.length === 0) {
        return <p className="text-muted-foreground text-center py-8">Нет песен, соответствующих текущим фильтрам.</p>
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {songs.map((song, index) => (
            <Card key={index} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-base">{song.title}</CardTitle>
                  <CardDescription>{song.artist}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-end">
                  <p className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full inline-block mb-4">
                      подойдёт для: {song.hint}
                  </p>
                  <Button variant={isSongSelected(song) ? 'secondary' : 'outline'} size="sm" onClick={() => handleSelectSong(song)}>
                    {isSongSelected(song) ? <MinusCircle className="mr-2" /> : <PlusCircle className="mr-2" />}
                    {isSongSelected(song) ? 'Удалить' : 'Выбрать'}
                  </Button>
                </CardContent>
            </Card>
            ))}
        </div>
    );
  }

  return (
    <section id="setlist" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Репертуар
          </h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Выберите музыку для вашего мероприятия
          </p>
        </div>

        <Tabs defaultValue="en" className="mt-8">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="en">EN</TabsTrigger>
              <TabsTrigger value="ru">RU</TabsTrigger>
            </TabsList>
          </div>

          <Card className="mt-4 p-4">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 space-y-4">
                    <FilterButtons
                        title="Темп"
                        options={artistData.tempos}
                        selected={tempo}
                        setSelected={setTempo}
                    />
                    <FilterButtons
                        title="Настроение"
                        options={artistData.moods}
                        selected={mood}
                        setSelected={setMood}
                    />
                </div>
            </div>
          </Card>

          <TabsContent value="ru" className="mt-6">
            {renderSongList(filteredRuSongs)}
          </TabsContent>
          <TabsContent value="en" className="mt-6">
            {renderSongList(filteredEnSongs)}
          </TabsContent>
        </Tabs>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
             <div className="fixed bottom-8 right-8 z-50">
                <Button size="lg" className="shadow-2xl" disabled={selectedSongs.length === 0}>
                    <Send className="mr-2"/>
                    Забронировать ({selectedSongs.length})
                </Button>
            </div>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto max-h-[90svh] flex flex-col">
            <SheetHeader>
              <SheetTitle>Ваш сет-лист</SheetTitle>
              <CardDescription>
                Вы выбрали {selectedSongs.length} {selectedSongs.length === 1 ? 'песню' : selectedSongs.length > 1 && selectedSongs.length < 5 ? 'песни' : 'песен'}. 
                Заполните форму ниже, чтобы отправить заявку.
              </CardDescription>
            </SheetHeader>
            <div className="flex-grow overflow-y-auto pr-6">
              <ul className="divide-y">
                {selectedSongs.map(song => (
                  <li key={song.title} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">{song.title}</p>
                      <p className="text-sm text-muted-foreground">{song.artist}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleSelectSong(song)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <SheetFooter className="mt-4">
               <div className="w-full">
                  <h3 className="text-lg font-semibold mb-4">Контактная информация</h3>
                  <ContactForm 
                    selectedSongs={selectedSongs} 
                    onSuccess={() => {
                      setSelectedSongs([]);
                      setIsSheetOpen(false);
                    }}
                  />
               </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        
        <div className="mt-8 text-center">
            <Button asChild variant="link">
                <Link href="#contacts">
                    <Music4 className="mr-2 h-4 w-4" />
                    Предложить свой музыкальный шедевр
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
};

export default Repertoire;
