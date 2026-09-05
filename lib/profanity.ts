export const PROFANITY_STOP_WORDS = [
  'дурак',
  'идиот',
  'тупой',
  'отстой',
  'хуй',
  'хер',
  'бля',
  'пизд',
  'сука',
  'говно',
  'ублюд',
  'мразь',
  'дебил',
  'кретин',
  'лох',
  'чмо',
  'урод',
  'жопа',
  'срать',
  'fuck',
  'shit',
  'asshole',
  'bitch',
  'damn',
  'crap',
  'stupid',
  'idiot',
] as const;

const escapedPatterns = PROFANITY_STOP_WORDS.map((word) =>
  word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
);

export function censorProfanity(text: string): string {
  let result = text;
  for (const pattern of escapedPatterns) {
    const regex = new RegExp(pattern, 'gi');
    result = result.replace(regex, '***');
  }
  return result;
}

export function containsProfanity(text: string): boolean {
  return censorProfanity(text) !== text;
}
