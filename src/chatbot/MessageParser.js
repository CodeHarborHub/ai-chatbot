class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    if (message.trim()) {
      this.actionProvider.handleOpenAIResponse(message);
    }
  }
}

export default MessageParser;