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

    // Safety check removed to avoid logic errors
    // if (API_ENDPOINT.includes("YOUR_API_GATEWAY_URL")) { ... }

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
        console.log('API Response:', data); // Debugging

        // The Lambda returns {"visits": N}
        if (data.visits !== undefined) {
            counterElement.innerText = data.visits;
        } else {
            counterElement.innerText = "No data";
        }

    } catch (error) {
        console.error('Error fetching visit count:', error);
        counterElement.innerText = "Error";
    }
}

