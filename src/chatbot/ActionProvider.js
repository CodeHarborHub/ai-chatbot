class ActionProvider {
  constructor(createChatbotMessage, setStateFunc) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
  }

  handleOpenAIResponse = async (message) => {
    const chatbotMessage = this.createChatbotMessage("Let me think...");
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, chatbotMessage],
    }));

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
        }),
      });

      const data = await response.json();
      const openAIResponse = data.choices[0].message.content;

      const botResponse = this.createChatbotMessage(openAIResponse);
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botResponse],
      }));
    } catch (error) {
      const errorMessage = this.createChatbotMessage("Oops! Something went wrong.");
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  };
}

export default ActionProvider;