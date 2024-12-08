import requests
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJrcmlzaEBnbWFpbC5jb20iLCJpYXQiOjE3MzM2NTE2MjgsImV4cCI6MTczMzY1NTIyOH0.BCl_5hCK32UaU4eefE20ejeO-NwnHHB6BbjcqCJKm_Q'
# URL of the login endpoint
# Replace with your actual endpoint
url = "http://192.168.76.25:8000/api/users/login"

# Data to be sent in the request body
payload = {
    "email": "krish@gmail.com",
    "loginPassword": "007"
}

# Headers for the request
headers = {
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
