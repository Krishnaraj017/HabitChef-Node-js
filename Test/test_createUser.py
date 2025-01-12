import requests

# Define the endpoint URL
url = "http://192.168.19.25:3000/api/users/createUser"
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJrcmlzaG5hMEBnbWFpbC5jb20iLCJpYXQiOjE3MzYwNzgxNzIsImV4cCI6MTczNjA4MTc3Mn0.YZ0ac4CHjbXk-mUyhREM9lNEcwq2LcV3IeuB6j9unFA'

# Define the payload (JSON data)
payload = {
    "username": "Krishnaraj",
    "password": "777",
    "email": "krishna0@gmail.com"
}

# Define the headers
headers = {
    # Replace <your-token> with the actual JWT token
    "Authorization": f"Bearer {token}",
    "content-Type": "application/json"}

try:
    # Make the POST request
    response = requests.post(url, json=payload, headers=headers)

    # Check the status code and print the response
    if response.status_code == 200 or response.status_code == 201:
        print("Success:", response.json())
    else:
        print(f"Failed with status code {response.status_code}")
        print("Response text:", response.text)

except requests.exceptions.RequestException as e:
    print("Error:", e)
