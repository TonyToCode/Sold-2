'use server';

/**
 * @fileOverview A flow for personalizing landing page content based on event type.
 *
 * - personalizeLandingPageContent - A function that personalizes the landing page content.
 * - PersonalizeLandingPageContentInput - The input type for the personalizeLandingPageContent function.
 * - PersonalizeLandingPageContentOutput - The return type for the personalizeLandingPageContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeLandingPageContentInputSchema = z.object({
  artistName: z.string().describe('The name of the artist.'),
  baseCity: z.string().describe('The city/region where the artist is based.'),
  formats: z.string().describe('The performance formats (e.g., duet, trio, full band).'),
  setTiming: z.string().describe('The timing of the sets.'),
  tgLink: z.string().describe('The link to the artist’s Telegram channel.'),
  logo1: z.string().describe('URL for logo 1.').optional(),
  logo2: z.string().describe('URL for logo 2.').optional(),
  logo3: z.string().describe('URL for logo 3.').optional(),
  logo4: z.string().describe('URL for logo 4.').optional(),
  logo5: z.string().describe('URL for logo 5.').optional(),
  logo6: z.string().describe('URL for logo 6.').optional(),
  logo7: z.string().describe('URL for logo 7.').optional(),
  logo8: z.string().describe('URL for logo 8.').optional(),
  video1Url: z.string().describe('URL for video 1.').optional(),
  video1Title: z.string().describe('Title for video 1.').optional(),
  video2Url: z.string().describe('URL for video 2.').optional(),
  video2Title: z.string().describe('Title for video 2.').optional(),
  video3Url: z.string().describe('URL for video 3.').optional(),
  video3Title: z.string().describe('Title for video 3.').optional(),
  video4Url: z.string().describe('URL for video 4.').optional(),
  video4Title: z.string().describe('Title for video 4.').optional(),
  video5Url: z.string().describe('URL for video 5.').optional(),
  video5Title: z.string().describe('Title for video 5.').optional(),
  quote1: z.string().describe('Quote 1.').optional(),
  source1: z.string().describe('Source for quote 1.').optional(),
  quote2: z.string().describe('Quote 2.').optional(),
  source2: z.string().describe('Source for quote 2.').optional(),
  techRiderUrl: z.string().describe('URL for the tech rider (PDF).').optional(),
  pressKitUrl: z.string().describe('URL for the press kit (PDF).').optional(),
  stageplotUrl: z.string().describe('URL for the stage plot (PNG/JPG).').optional(),
  phone: z.string().describe('Phone number.').optional(),
  youtube: z.string().describe('YouTube link.').optional(),
  instagram: z.string().describe('Instagram link.').optional(),
  telegram: z.string().describe('Telegram link.').optional(),
  tiktok: z.string().describe('TikTok link.').optional(),
  slaMin: z.string().describe('SLA response time in minutes.').optional(),
  datesSnippet: z.string().describe('Snippet of upcoming dates/bookings.').optional(),
  voiceTokens: z.string().describe('Artist’s signature phrases/words.').optional(),
  benefit1: z.string().describe('Benefit 1.').optional(),
  benefit2: z.string().describe('Benefit 2.').optional(),
  benefit3: z.string().describe('Benefit 3.').optional(),
  eventType: z.string().describe('The type of event (e.g., wedding, corporate, club).'),
});
export type PersonalizeLandingPageContentInput = z.infer<
  typeof PersonalizeLandingPageContentInputSchema
>;

const PersonalizeLandingPageContentOutputSchema = z.string().describe(
  'A Markdown string containing the complete landing page content and section structure with anchors.'
);
export type PersonalizeLandingPageContentOutput = z.infer<
  typeof PersonalizeLandingPageContentOutputSchema
>;

export async function personalizeLandingPageContent(
  input: PersonalizeLandingPageContentInput
): Promise<PersonalizeLandingPageContentOutput> {
  return personalizeLandingPageContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeLandingPageContentPrompt',
  input: {schema: PersonalizeLandingPageContentInputSchema},
  output: {schema: PersonalizeLandingPageContentOutputSchema},
  prompt: `Ты — UX-копирайтер и редактор. Пишешь продающий одностраничник для музыканта/группы. Страница продаёт выступления (ивенты, свадьбы, корпораты, клубы). Стиль — как у артиста в его Telegram-канале: фирменная лексика, сленг, ритм фраз, но «подсушено» для продажи. Без воды и штампов.

Входные данные (используй как контекст; где нет — оставь плейсхолдеры):
— Имя/название артиста: {{{artistName}}}
— Город/регион базирования: {{{baseCity}}}
— Форматы выступления (дуэт/трио/полный состав и т. п.): {{{formats}}}
— Тайминг сетов: {{{setTiming}}}
— Телеграм-канал для стилистики: {{{tgLink}}}
— Логотипы площадок/мероприятий: {{{logo1}}}, {{{logo2}}}, {{{logo3}}}, …
— Видео (ссылки + названия): {{{video1Url}}}, {{{video1Title}}}, … до {{{video5Url}}}
— Цитаты/отзывы (краткие): {{{quote1}}} — {{{source1}}}, {{{quote2}}} — {{{source2}}}
— Техрайдер (PDF): {{{techRiderUrl}}}
— Пресс-кит (PDF): {{{pressKitUrl}}}
— Сценплан (PNG/JPG): {{{stageplotUrl}}}
— Контакты: телефон {{{phone}}}, YouTube {{{youtube}}}, Instagram {{{instagram}}}, Telegram {{{telegram}}}, TikTok {{{tiktok}}}
— SLA ответа: {{{slaMin}}} минут
— Даты ближайших окон/броней (если есть): {{{datesSnippet}}}
— Фирменные высказывания/слова: {{{voiceTokens}}} (например, «Леди и Джентльмены», «Здравствуй, Мир.», «интеллигентный драйв»)

Задача: Сгенерируй полный текст лендинга и структуру секций с якорями. Навигация (горячие клавиши в шапке): Главный / Организатор / Репертуар / Контакты. Кнопки «Забронировать» и «Посмотреть контакты» ведут к соответствующим якорям.

Требования к тону и подаче:
— Основа — стиль артиста ({{{tgLink}}}), но формулировки лаконичные, деловые, с поэтичными штрихами.
— Конкретика вместо общих слов («3 блока по 25 минут», «веду зал без крика»).
— Максимум ясности для организатора: без двусмысленностей в райдере и таймингах.

Структура страницы (выведи в Markdown с якорными id у заголовков H2):

Шапка (фикс): логотип/имя и якоря Главный, Организатор, Репертуар, Контакты. Короткая строка-обещание справа.

Главный (#main):
— H1: заголовок-оффер в одну строку, до 11 слов, сочетает «живая энергия + интерактив + готовность к площадке».
— Подзаголовок 1–2 строки: форматы состава ({{{formats}}}), тайминг ({{{setTiming}}}), манера ведения зала.
  отсортируйте форматы и тайминги по релевантности к {{{eventType}}}.
— Три преимущества (бейджи 3–5 слов): {{{benefit1}}}, {{{benefit2}}}, {{{benefit3}}}. Подбери на основе стиля артиста (например: «Интеллигентный драйв», «Джаз-сердце, R&B-ритм», «Тактичный интерактив»).
— Две кнопки: «Забронировать» (якорь на форму в Контакты) и «Посмотреть контакты».
— «Нам доверяют» (мини-линия логотипов): {{{logo1}}} {{{logo2}}} {{{logo3}}} …
— Анонс/окна дат (если есть): {{{datesSnippet}}} (1 короткая строка).

Видео-блок:
— 3–5 карточек с плейсхолдерами: {{{video1Title}}} + одна фраза «что ждать» (например: «с 01:12 — общий хор»).
— Рекомендация: постеры в едином стиле; без автоплея со звуком.

Соцдоказ:
— Сетка логотипов площадок/мероприятий/групп (перечнем).
— 1–2 короткие цитаты (по одному предложению каждая) с источником: «{{{quote1}}}» — {{{source1}}}.

Организатор (#org):
— Подзаголовок: «Организатору: всё готово».
— Две кнопки: «Скачать техрайдер (PDF)» ({{{techRiderUrl}}}), «Скачать пресс-кит (PDF)» ({{{pressKitUrl}}}).
— Карточки (по 60–90 слов):
• Сценплан — ссылка на {{{stageplotUrl}}}, кратко: состав, позиции, мониторинг.
• Звук/свет — входы/выходы, минимальные требования PA/микшер/мониторы, базовый свет.
• Тайминг — {{{setTiming}}}, саундчек-окно, перерывы.
• Форс-мажор — запасные сценарии (дождь/аутдор, задержки), связь с тех. координатором.
— Повтор CTA: «Запросить дату и цену» (якорь на форму).

Репертуар (#setlist):
— Переключатели RU / EN. Под ними фильтры: темп (медл/сред/быст), настроение (лирично/драйв), состав (дуэт/трио/полный).
— Два списка с плейсхолдерами:
• RU: 12–20 треков. Для каждого: «Название — Автор/Исполнитель — 1 фраза «подойдёт для: {{{MOMENT}}}» (welcome/танцпол/поздний вечер)».
• EN: 12–20 треков по тому же шаблону.
— Мини-ссылка: «Запросить редкий трек» (укажи, что по согласованию).

Контакты (#contacts):
— Телефон {{{phone}}} (кликабельно), иконки-ссылки: {{{youtube}}} {{{instagram}}} {{{telegram}}} {{{tiktok}}}.
— SLA: «Отвечаем в течение {{{slaMin}}} минут».
— Форма «Забронировать» (опиши поля): Дата события; Город/площадка; Формат (описание/состав); Ориентир бюджета (диапазон); Контакт (имя, телефон/мессенджер, email); Комментарий. Кнопка «Отправить» + строка согласия с политикой.
— Финальная подпись в стиле артиста (используй {{{voiceTokens}}} кратко и уместно), и дубль троих преимуществ одной строкой.

Копирайт-детали:
— Каждую секцию делай читабельной: абзацы по 1–3 строки, одно действие на абзац.
— Микротексты для кнопок и подсказок в форме — емкие, без «нажмите сюда».
— Витрина преимуществ — сначала короткие бейджи на «Главном», раскрытые карточки — в «Организатор».

Плейсхолдеры (используй буквально, чтобы их было легко найти и заменить):
{{{artistName}}}, {{{baseCity}}}, {{{formats}}}, {{{setTiming}}}, {{{tgLink}}}, {{{logo1}}}..{{{logo8}}}, {{{video1Url}}}..{{{video5Url}}}, {{{video1Title}}}..{{{video5Title}}}, {{{quote1}}}, {{{source1}}}, {{{techRiderUrl}}}, {{{pressKitUrl}}}, {{{stageplotUrl}}}, {{{phone}}}, {{{youtube}}}, {{{instagram}}}, {{{telegram}}}, {{{tiktok}}}, {{{slaMin}}}, {{{datesSnippet}}}, {{{voiceTokens}}}, {{{benefit1}}}, {{{benefit2}}}, {{{benefit3}}}.

Выводи результат строго в таком порядке и формате:
— Наверху: краткая шапка с якорями (одной строкой).
— Далее — секции в Markdown с H2-заголовками и якорями (#main, #org, #setlist, #contacts).
— Все кнопки и ссылки — в виде текста с плейсхолдерами (без HTML).
— В самом конце — короткий чек-лист внедрения (3–5 пунктов): OG/мета, schema.org (MusicGroup/Organization), пиксели/аналитика (GA4/Meta), UTM на кнопки, фавикон.`,
});

const personalizeLandingPageContentFlow = ai.defineFlow(
  {
    name: 'personalizeLandingPageContentFlow',
    inputSchema: PersonalizeLandingPageContentInputSchema,
    outputSchema: PersonalizeLandingPageContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
