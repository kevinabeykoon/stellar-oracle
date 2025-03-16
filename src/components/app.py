from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Replace with your Gemini API key
GEMINI_API_KEY = "AIzaSyDNGTZ8FLoSWwPbhn-JDbdcrb7QhBDe6r4"

# Route to handle the sunrise data formatting
@app.route('/format_sunrise', methods=['POST'])
def format_sunrise():
    data = request.json  # Expecting JSON data from React frontend
    date_object = data.get('date_object')  # The DateObject from Wolfram API

    if not date_object:
        return jsonify({"error": "Date object is required"}), 400

    # Construct the prompt for Gemini API
    prompt = f"Convert the DateObject {date_object} to a human-readable date and time."

    try:
        # Make a request to the Gemini API to format the date object
        response = requests.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
            json={
                "contents": [
                    {
                        "parts": [{"text": prompt}]
                    }
                ]
            },
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {GEMINI_API_KEY}'
            }
        )

        # Handle the response from Gemini API
        if response.status_code == 200:
            formatted_data = response.json()
            formatted_text = formatted_data['contents'][0]['parts'][0]['text']
            return jsonify({"formatted_data": formatted_text})
        else:
            return jsonify({"error": "Failed to format the date with Gemini API"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
