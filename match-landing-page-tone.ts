'use server';

/**
 * @fileOverview Adapts the landing page's tone and style to match the artist's Telegram channel.
 *
 * - matchLandingPageTone - A function that generates the complete landing page text and section structure.
 * - MatchLandingPageToneInput - The input type for the matchLandingPageTone function.
 * - MatchLandingPageToneOutput - The return type for the matchLandingPageTone function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchLandingPageToneInputSchema = z.object({
  artistName: z.string().describe('The name of the artist.'),
  baseCity: z.string().describe('The city/region where the artist is based.'),
  formats: z.string().describe('The performance formats (duet/trio/full band etc.).'),
  setTiming: z.string().describe('The timing of sets.'),
  tgLink: z.string().describe('Link to the artist’s Telegram channel for style reference.'),
  logo1: z.string().optional().describe('URL for logo 1.'),
  logo2: z.string().optional().describe('URL for logo 2.'),
  logo3: z.string().optional().describe('URL for logo 3.'),
  logo4: z.string().optional().describe('URL for logo 4.'),
  logo5: z.string().optional().describe('URL for logo 5.'),
  logo6: z.string().optional().describe('URL for logo 6.'),
  logo7: z.string().optional().describe('URL for logo 7.'),
  logo8: z.string().optional().describe('URL for logo 8.'),
  video1Url: z.string().optional().describe('URL for video 1.'),
  video1Title: z.string().optional().describe('Title for video 1.'),
  video2Url: z.string().optional().describe('URL for video 2.'),
  video2Title: z.string().optional().describe('Title for video 2.'),
  video3Url: z.string().optional().describe('URL for video 3.'),
  video3Title: z.string().optional().describe('Title for video 3.'),
  video4Url: z.string().optional().describe('URL for video 4.'),
  video4Title: z.string().optional().describe('Title for video 4.'),
  video5Url: z.string().optional().describe('URL for video 5.'),
  video5Title: z.string().optional().describe('Title for video 5.'),
  quote1: z.string().optional().describe('Quote 1.'),
  source1: z.string().optional().describe('Source for quote 1.'),
  quote2: z.string().optional().describe('Quote 2.'),
  source2: z.string().optional().describe('Source for quote 2.'),
  techRiderUrl: z.string().optional().describe('URL for the tech rider (PDF).'),
  pressKitUrl: z.string().optional().describe('URL for the press kit (PDF).'),
  stageplotUrl: z.string().optional().describe('URL for the stageplot (PNG/JPG).'),
  phone: z.string().optional().describe('Phone contact.'),
  youtube: z.string().optional().describe('YouTube link.'),
  instagram: z.string().optional().describe('Instagram link.'),
  telegram: z.string().optional().describe('Telegram link.'),
  tiktok: z.string().optional().describe('TikTok link.'),
  slaMin: z.string().optional().describe('SLA response time in minutes.'),
  datesSnippet: z.string().optional().describe('Snippet of upcoming dates/availability.'),
  voiceTokens: z.string().optional().describe('Signature phrases/words of the artist.'),
  benefit1: z.string().optional().describe('Benefit 1.'),
  benefit2: z.string().optional().describe('Benefit 2.'),
  benefit3: z.string().optional().describe('Benefit 3.'),
});
export type MatchLandingPageToneInput = z.infer<typeof MatchLandingPageToneInputSchema>;

const MatchLandingPageToneOutputSchema = z.string().describe('The complete landing page text and section structure in Markdown.');
export type MatchLandingPageToneOutput = z.infer<typeof MatchLandingPageToneOutputSchema>;

export async function matchLandingPageTone(input: MatchLandingPageToneInput): Promise<MatchLandingPageToneOutput> {
  return matchLandingPageToneFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchLandingPageTonePrompt',
  input: {schema: MatchLandingPageToneInputSchema},
  output: {schema: MatchLandingPageToneOutputSchema},
  prompt: `You are a UX copywriter and editor specializing in creating high-converting landing pages for musicians and bands.

You will write a complete landing page text and structure for {{ARTIST_NAME}} in Markdown format. The style should match the artist's style in their Telegram channel ({{TG_LINK}}), but the text should be concise, business-oriented, and poetic, without fluff or clichés.

Here are the input data points. Use them as context to the extent available, using placeholders where there is no value.
- Artist Name: {{artistName}}
- City/Region: {{baseCity}}
- Formats: {{formats}}
- Set Timing: {{setTiming}}
- Telegram Channel: {{tgLink}}
- Logos: {{logo1}}, {{logo2}}, {{logo3}}, {{logo4}}, {{logo5}}, {{logo6}}, {{logo7}}, {{logo8}}
- Videos: {{video1Url}} ({{video1Title}}), {{video2Url}} ({{video2Title}}), {{video3Url}} ({{video3Title}}), {{video4Url}} ({{video4Title}}), {{video5Url}} ({{video5Title}})
- Quotes: {{quote1}} - {{source1}}, {{quote2}} - {{source2}}
- Tech Rider: {{techRiderUrl}}
- Press Kit: {{pressKitUrl}}
- Stageplot: {{stageplotUrl}}
- Contacts: Phone {{phone}}, YouTube {{youtube}}, Instagram {{instagram}}, Telegram {{telegram}}, TikTok {{tiktok}}
- SLA: {{slaMin}} minutes
- Dates: {{datesSnippet}}
- Voice Tokens: {{voiceTokens}}
- Benefits: {{benefit1}}, {{benefit2}}, {{benefit3}}

TASK: Generate the complete landing page text and structure, including section anchors. Adhere to the tone and style of the artist, keeping formulations concise and business-like with poetic touches.

# Output:

---

Шапка: Главный, Организатор, Репертуар, Контакты

## Главный (#main):

- H1: Live Energy + Interactivity + Venue-Ready
- {{formats}}, {{setTiming}}
- {{benefit1}}, {{benefit2}}, {{benefit3}}
- [Забронировать] [Посмотреть контакты]
- {{logo1}} {{logo2}} {{logo3}} {{logo4}} {{logo5}} {{logo6}} {{logo7}} {{logo8}}
- {{datesSnippet}}

## Видео-блок:

- {{video1Title}}
- {{video2Title}}
- {{video3Title}}
- {{video4Title}}
- {{video5Title}}

## Соцдоказ:

- {{logo1}}, {{logo2}}, {{logo3}}, {{logo4}}, {{logo5}}, {{logo6}}, {{logo7}}, {{logo8}}
- {{quote1}} - {{source1}}
- {{quote2}} - {{source2}}

## Организатор (#org):

- Организатору: всё готово
- [Скачать техрайдер (PDF)]({{techRiderUrl}}), [Скачать пресс-кит (PDF)]({{pressKitUrl}})

### Сценплан
{{stageplotUrl}}

### Звук/свет
(requirements)

### Тайминг
{{setTiming}}

### Форс-мажор
(scenarios)

- [Запросить дату и цену]

## Репертуар (#setlist):

RU / EN
Slow/Medium/Fast, Lyrical/Drive, Duet/Trio/Full

### RU:

- (Tracks)

### EN:

- (Tracks)

[Запросить редкий трек]

## Контакты (#contacts):

- {{phone}}
- {{youtube}} {{instagram}} {{telegram}} {{tiktok}}
- Отвечаем в течение {{slaMin}} минут

### Забронировать:

(Form fields)

{{voiceTokens}} + {{benefit1}}, {{benefit2}}, {{benefit3}}

### Check-list:

- OG/meta
- Schema.org
- GA4/Meta
- UTM on buttons
- Favicon
`,
});

const matchLandingPageToneFlow = ai.defineFlow(
  {
    name: 'matchLandingPageToneFlow',
    inputSchema: MatchLandingPageToneInputSchema,
    outputSchema: MatchLandingPageToneOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
