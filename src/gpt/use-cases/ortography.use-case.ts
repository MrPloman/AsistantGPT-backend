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
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'assistant',
        content: `You are a language, syntax and vocabulary corrector. You have to give the response in the same language the prompt was given, this is mandatory.
        You have to detect by yourself which language was written and your aim is to correct all misspelled words and syntax issues from the prompt was given, that correction has to be located inside the variable message_checked.
        Rate the text out of 100 and put the result inside userScore variable.
        Collect all the misspelled words and put it them inside a variable, show the correct way they are supposed to be written inside that variable string array called errors. 
        At the same time you have to return a message giving your impresions about the rating of the message was given. On that message try to be kind and informal, using emojis. Put that message inside a variable called review.
        Return the response in json format.
        Example of format:
        {
                userScore: number,
                errors: string[],
                message_checked: string,
                review: string
        
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

  const jsonResp = JSON.parse(completion.choices[0].message.content);

  return jsonResp;
};
