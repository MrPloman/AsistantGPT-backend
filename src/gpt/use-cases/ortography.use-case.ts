interface InterfaceOptions {
  prompt: string;
}

export const ortographyCheckUseCase = async (options: InterfaceOptions) => {
  const { prompt } = options;
  return {
    prompt,
  };
};
