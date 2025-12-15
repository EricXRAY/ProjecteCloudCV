// script.js

// IMPORTANT: Replace this placeholder with your actual API Gateway URL
// Run 'terraform output api_endpoint' in your terminal to find it.
// It should look like: https://xxxxxxxxx.execute-api.us-east-1.amazonaws.com
const API_ENDPOINT = "https://rbe9uhma0f.execute-api.us-east-1.amazonaws.com"; 

document.addEventListener('DOMContentLoaded', () => {
    updateVisitCount();
});

async function updateVisitCount() {
    const counterElement = document.getElementById('counter');
    
    // Safety check for placeholder
    if (API_ENDPOINT.includes("YOUR_API_GATEWAY_URL")) {
        console.warn("API Endpoint not set.");
        counterElement.innerText = "Set API URL";
        return;
    }

    try {
        // The backend expects a POST request to increment/get the count
        const response = await fetch(`${API_ENDPOINT}/count`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Assuming the Lambda returns a JSON body with the count, e.g. "Visit count: 5" or just the number
        // Adjusting logic based on typical simple lambda responses. 
        // If the lambda returns just the body string:
        counterElement.innerText = data.body || data; 
        
    } catch (error) {
        console.error('Error fetching visit count:', error);
        counterElement.innerText = "Error";
    }
}
