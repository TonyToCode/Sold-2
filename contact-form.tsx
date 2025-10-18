"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  CalendarIcon,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { submitBooking, type BookingState } from "@/app/actions";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
      disabled={pending}
      size="lg"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Отправка...
        </>
      ) : (
        "Отправить и зажечь!"
      )}
    </Button>
  );
}

type ContactFormProps = {
    selectedSongs?: { title: string; artist: string; }[];
    onSuccess?: () => void;
};

const ContactForm = ({ selectedSongs, onSuccess }: ContactFormProps) => {
  const initialState: BookingState = { message: null, errors: {}, isSuccess: false };
  const [state, dispatch] = useFormState(submitBooking, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (state.message) {
      if (state.isSuccess) {
        toast({
          title: "Успешно!",
          description: state.message,
          action: <div className="p-1 rounded-full bg-green-500"><CheckCircle2 className="h-5 w-5 text-white" /></div>,
        });
        formRef.current?.reset();
        setDate(undefined);
        onSuccess?.();
      } else {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: state.message,
        });
      }
    }
  }, [state, toast, onSuccess]);

  return (
    <form ref={formRef} action={dispatch} className="space-y-4">
        {selectedSongs && <input type="hidden" name="selectedSongs" value={JSON.stringify(selectedSongs)} />}
        <div>
        <Label htmlFor="eventDate">Дата события</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: ru }) : <span>Выберите дату</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                locale={ru}
              />
            </PopoverContent>
          </Popover>
          <input type="hidden" name="eventDate" value={date?.toISOString()} />
          {state.errors?.eventDate && <p className="text-sm font-medium text-destructive mt-1">{state.errors.eventDate[0]}</p>}
        </div>
        <div>
          <Label htmlFor="cityVenue">Город/площадка</Label>
          <Input id="cityVenue" name="cityVenue" required />
          {state.errors?.cityVenue && <p className="text-sm font-medium text-destructive mt-1">{state.errors.cityVenue[0]}</p>}
        </div>
        <div>
          <Label htmlFor="format">Формат (описание/состав)</Label>
          <Input id="format" name="format" defaultValue="Соло" required />
          {state.errors?.format && <p className="text-sm font-medium text-destructive mt-1">{state.errors.format[0]}</p>}
        </div>
          <div>
          <Label htmlFor="budget">Ориентир бюджета (диапазон)</Label>
          <Input id="budget" name="budget" />
        </div>
        <div>
          <Label htmlFor="contactName">Контакт (имя)</Label>
          <Input id="contactName" name="contactName" required />
          {state.errors?.contactName && <p className="text-sm font-medium text-destructive mt-1">{state.errors.contactName[0]}</p>}
        </div>
        <div>
          <Label htmlFor="contactInfo">Телефон/мессенджер/email</Label>
          <Input id="contactInfo" name="contactInfo" required />
          {state.errors?.contactInfo && <p className="text-sm font-medium text-destructive mt-1">{state.errors.contactInfo[0]}</p>}
        </div>
        <div>
          <Label htmlFor="comment">Комментарий</Label>
          <Textarea id="comment" name="comment" />
        </div>
        <SubmitButton />
        <p className="text-xs text-muted-foreground text-center">
          Отправляя заявку, вы соглашаетесь с нашей политикой обработки данных.
        </p>
    </form>
  );
};

export default ContactForm;
