"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Song = {
  title: string;
  artist: string;
  hint: string;
  tempo: string;
  mood: string;
};

interface ContactFormProps {
  selectedSongs?: Song[];
  onSuccess?: () => void;
}

const ContactForm = ({ selectedSongs = [], onSuccess }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Include selected songs in the message
    const songsText = selectedSongs.length > 0
      ? `\n\nВыбранные песни:\n${selectedSongs.map(song => `${song.title} - ${song.artist} (${song.tempo}, ${song.mood})`).join('\n')}`
      : '';

    const fullMessage = formData.message + songsText;

    // Handle form submission
    console.log('Form submitted:', {
      ...formData,
      message: fullMessage,
      selectedSongs
    });

    // Call onSuccess if provided
    if (onSuccess) {
      onSuccess();
    }

    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Связаться с нами</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Ваше имя"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Textarea
            name="message"
            placeholder="Сообщение"
            value={formData.message}
            onChange={handleChange}
            required
          />
          {selectedSongs.length > 0 && (
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm font-medium mb-2">Выбранные песни:</p>
              <ul className="text-sm space-y-1">
                {selectedSongs.map((song, index) => (
                  <li key={index}>
                    {song.title} - {song.artist}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Button type="submit" className="w-full">
            Отправить
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
