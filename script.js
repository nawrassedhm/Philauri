const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function addMessage(content, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'assistant-message');
    messageDiv.textContent = content;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = '';

        try {
            const response = await axios.post(
                'https://api.anthropic.com/v1/messages',
                {
                    model: 'claude-3-sonnet-20240229',
                    max_tokens: 1024,
                    messages: [{ role: 'user', content: message }]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': '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'
                    }
                }
            );

            const assistantMessage = response.data.content[0].text;
            addMessage(assistantMessage, false);
        } catch (error) {
            console.error('Error:', error);
            addMessage('Sorry, there was an error processing your request.', false);
        }
    }
}
