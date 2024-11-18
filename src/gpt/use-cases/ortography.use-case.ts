import OpenAI from 'openai';
interface InterfaceOptions {
  prompt: string;
}

export const ortographyCheckUseCase = async (
  openai: OpenAI,
  options: InterfaceOptions,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-1106',
    max_tokens: 100,
    messages: [
      {
        role: 'assistant',
        content: `You are a language, syntax and vocabulary corrector. 
        You have to detect by yourself which language was written and your aim is to correct all misspelled words and syntax issues from the prompt was given.
        Rate the text out of 100. And collect all the misspelled words and show the correct way inside an array of string. Return teh response in json format.
        Example of format:
        {
                userScore: number,
                errors: string[],
                message_checked: string
        
        }
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    response_format: {
      type: 'json_object',
    },
  });
  console.log(completion.choices[0].message.content);

  const jsonResp = JSON.parse(completion.choices[0].message.content);

  return jsonResp;
};
