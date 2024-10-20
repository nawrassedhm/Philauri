import requests

app = Flask(__name__)

# Claude API key
CLAUDE_API_KEY = "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"

def get_ai_response(prompt):
    url = "https://api.anthropic.com/v1/messages"  # API endpoint
    headers = {
        "Authorization": f"Bearer {CLAUDE_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "prompt": "Hello, Philauri!",
        "model": "claude-3-opus-20240229",
        "max_tokens": 300,
        "temperature": 0.7
    }

    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()["completion"]
    else:
        return f"Error: {response.status_code} - {response.text}"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get-response', methods=['POST'])
def get_response():
    user_input = request.json.get('prompt')
    if user_input:
        ai_response = get_ai_response(user_input)
        return jsonify({"response": ai_response})
    return jsonify({"error": "No prompt provided"}), 400

if __name__ == "__main__":
    app.run(debug=True)
