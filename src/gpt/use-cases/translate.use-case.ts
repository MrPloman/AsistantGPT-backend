import OpenAI from 'openai';
interface Options {
  prompt: string;
  language: string;
}
export const translateUseCase = async (
  openai: OpenAI,
  { prompt, language }: Options,
) => {
  return await openai.chat.completions.create({
    stream: true,
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `
                Translate the following text: "${prompt}" to ${language}.
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.8,
    max_tokens: 500,
  });
};
