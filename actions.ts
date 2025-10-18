"use server";

import { z } from "zod";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, getApps, App } from "firebase-admin/app";

const bookingSchema = z.object({
  eventDate: z.date({ required_error: "Пожалуйста выберите дату." }),
  cityVenue: z.string().min(3, "Город/площадка обязательны"),
  format: z.string().min(1, "Формат обязателен"),
  budget: z.string().optional(),
  contactName: z.string().min(2, "Имя обязательно"),
  contactInfo: z.string().min(5, "Контактная информация обязательна"),
  comment: z.string().optional(),
  selectedSongs: z.string().optional(),
});

export type BookingState = {
  message?: string | null;
  errors?: {
    eventDate?: string[];
    cityVenue?: string[];
    format?: string[];
    budget?: string[];
    contactName?: string[];
    contactInfo?: string[];
    comment?: string[];
    selectedSongs?: string[];
  };
  isSuccess?: boolean;
};

let firebaseApp: App;
if (!getApps().length) {
  firebaseApp = initializeApp();
} else {
  firebaseApp = getApps()[0];
}

const db = getFirestore(firebaseApp);


export async function submitBooking(
  prevState: BookingState,
  formData: FormData
): Promise<BookingState> {
  
  const songs = formData.get("selectedSongs");
  const parsedSongs = songs ? JSON.parse(songs as string) : [];

  const validatedFields = bookingSchema.safeParse({
    eventDate: new Date(formData.get("eventDate") as string),
    cityVenue: formData.get("cityVenue"),
    format: formData.get("format"),
    budget: formData.get("budget"),
    contactName: formData.get("contactName"),
    contactInfo: formData.get("contactInfo"),
    comment: formData.get("comment"),
    selectedSongs: JSON.stringify(parsedSongs),
  });

  if (!validatedFields.success) {
    console.error(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Не заполнены обязательные поля. Не удалось отправить заявку.",
      isSuccess: false,
    };
  }

  try {
    const docRef = await db.collection("bookings").add({
      ...validatedFields.data,
      createdAt: new Date(),
    });
    console.log("Новый запрос на бронирование сохранен с ID:", docRef.id);
  } catch (error) {
    console.error("Ошибка при сохранении в Firestore:", error);
    return {
      message: "Произошла ошибка на сервере. Пожалуйста, попробуйте еще раз.",
      isSuccess: false,
    };
  }
  
  return {
    message: "Ваш запрос на бронирование отправлен! Мы скоро с вами свяжемся.",
    isSuccess: true,
  };
}
