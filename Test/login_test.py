import requests

token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJrcmlzaG5hMEBnbWFpbC5jb20iLCJpYXQiOjE3MzYwNzgxNzIsImV4cCI6MTczNjA4MTc3Mn0.YZ0ac4CHjbXk-mUyhREM9lNEcwq2LcV3IeuB6j9unFA'

# URL of the login endpoint
url = "https://habit-chef-node-kxxg0n0mm-krish2.vercel.app/api/users/login"

# Data to be sent in the request body
payload = {
    "email": "krishna0@gmail.com",
    "loginPassword": "777"
}

# Headers for the request
headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}

# Send the POST request
try:
    response = requests.post(url, json=payload, headers=headers)

    # Print the response status code and JSON response
    print("Status Code:", response.status_code)
    print("Response JSON:", response.json())
except requests.exceptions.RequestException as e:
    print("An error occurred:", e)
