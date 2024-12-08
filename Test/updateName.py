import requests

# Set up the API endpoint
url = "http://192.168.76.25:8000/api/users/updateUsername"
# Set up the headers with the authorization token
token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJrcmlzaEBnbWFpbC5jb20iLCJpYXQiOjE3MzM2NTE3NjgsImV4cCI6MTczMzY1NTM2OH0.NhMQ_qY57hDrW9I2JgONrFelzI4WGdJ2Zp2q2thNDhQ'
headers = {
    # Replace <your-token> with the actual JWT token
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}

# Set up the payload with the new username
payload = {
    "username": "Krishnaraj Shetty"  # Replace "NewUsername" with the desired username
}

# Make the PUT request
response = requests.put(url, json=payload, headers=headers)

# Print the response
print("Status Code:", response.status_code)
try:
    print("Response JSON:", response.json())
except ValueError:
    print("Response Text:", response.text)
