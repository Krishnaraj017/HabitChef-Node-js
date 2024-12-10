import requests
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJrcmlzaEBnbWFpbC5jb20iLCJpYXQiOjE3MzM4NDQ0ODcsImV4cCI6MTczMzg0ODA4N30.X3z017y3WrgfdnTB1OAXTO3HnVFrx7Vwz7BmOvizoXU'
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
