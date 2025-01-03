import requests

# Token for authentication
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJrcmlzaG5hQGdtYWlsLmNvbSIsImlhdCI6MTczNTU2NzgwOSwiZXhwIjoxNzM1NTcxNDA5fQ.OHPDr0vNOVp0fti3ZWFMvAHd-kKSPo7tQbPWsOu0ixw'

# URL of the API endpoint
url = "http://192.168.201.25:3000/api/foods/addConsumedFood"

# Data for the request (only foodName)
data = {
    "foodId": 3,
    "foodName": "Almonds",
    "quantity": 2,
    "consumedAt": "2024-12-30T12:00:00Z"
}


headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"  # Ensure the content type is JSON
}

# Send the request
response = requests.post(url, json=data, headers=headers)

if response.status_code == 201:
    print("Food nutrients retrieved successfully")
    print(response.json())
else:
    print(response.json())
    print("Failed to retrieve food nutrients:", response.status_code)
