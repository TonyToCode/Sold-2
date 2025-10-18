"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { artistData } from "@/app/data";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { getImage } from "@/app/data";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const artistLogo = getImage('artist-logo');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Главный", href: "#main" },
    { name: "Организатор", href: "#org" },
    { name: "Репертуар", href: "#setlist" },
    { name: "Контакты", href: "#contacts" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-card/80 shadow-md backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`Go to ${artistData.ARTIST_NAME} homepage`}
        >
          <Image
            src={artistLogo.imageUrl}
            alt={artistLogo.description}
            data-ai-hint={artistLogo.imageHint}
            width={40}
            height={40}
            className="rounded-full object-cover aspect-square"
          />
          <span className="font-headline text-2xl font-bold text-primary">
            {artistData.ARTIST_NAME}
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block text-sm text-muted-foreground">
          {artistData.VOICE_TOKENS}
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card">
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-3">
                  <Image
                    src={artistLogo.imageUrl}
                    alt={artistLogo.description}
                    data-ai-hint={artistLogo.imageHint}
                    width={40}
                    height={40}
                    className="rounded-full object-cover aspect-square"
                  />
                  <span className="font-headline text-2xl font-bold text-primary">
                    {artistData.ARTIST_NAME}
                  </span>
                </Link>
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.name}>
                      <Link
                        href={link.href}
                        className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                      >
                        {link.name}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
