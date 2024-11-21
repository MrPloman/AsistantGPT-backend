import OpenAI from 'openai';
interface Options {
  prompt: string;
}
export const prosConsDiscusserUseCase = async (
  openai: OpenAI,
  { prompt }: Options,
) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `
                You will be given a question and your task is to give an answer with pros and cons,
                the answer must be in markdown format,
                the pros and cons must be in a list.
                You have to answer in the language you were asked.`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.8,
    max_tokens: 500,
  });
  return completion.choices[0].message;
};
