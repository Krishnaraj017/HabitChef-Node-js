import requests

# API base URL
# Replace with your actual API base URL
BASE_URL = "http://192.168.201.25:3000"

# Endpoint and headers
url = "http://192.168.201.25:3000/api/foods/addConsumedFood"
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer",  # Replace with your JWT token
}

# Payload for adding consumed food
payload = {
    "foodId": 1,
    "foodName": "Almomnd",
    "quantity": 4,
    "consumedAt": "2025-01-01T12:00:00Z",
}

# Send POST request
response = requests.post(url, json=payload, headers=headers)

# Print response
print("Status Code:", response.status_code)
print("Response JSON:", response.json())
