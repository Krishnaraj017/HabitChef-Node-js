import requests

# API base URL
# Replace with your actual API base URL
BASE_URL = "http://192.168.201.25:3000"

# Endpoint and headers
url = "http://192.168.201.25:3000/api/foods/getConsumedFoods"
headers = {
    "Authorization": "Bearer YOUR_JWT_TOKEN_HERE",  # Replace with your JWT token
}

# Send GET request
response = requests.get(url, headers=headers)

# Print response
print("Status Code:", response.status_code)
print("Response JSON:", response.json())
