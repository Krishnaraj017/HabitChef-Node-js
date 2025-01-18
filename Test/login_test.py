import requests

# URL of the login endpoint
url = "http://192.168.1.28:3000/api/users/login"
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJrcmlzaG5hOTlAZ21haWwuY29tIiwiaWF0IjoxNzM3MTc3Mzk4LCJleHAiOjE3MzczNTAxOTh9.xd3n0AdsFj-DoehzH-wWjfRBWAp7h7Z3ZNslj03uTHE'
# Login payload with email and password
payload = {
    "email": "krishna99@gmail.com",
    "loginPassword": "778"
}

# Headers for the request (no token needed for login typically)
headers = {
    "token": f"Bearer {token}",

    "Content-Type": "application/json"
}

# Send the POST request to log in
try:
    response = requests.post(url, json=payload, )

    # Check the response status code
    if response.status_code == 200:
        # Successful login
        response_data = response.json()
        print("Login Successful!")
        print("Response:", response_data)

        # Extract token for future requests
        token = response_data.get("token")
        if token:
            print("Token:", token)
        else:
            print("Token not found in the response.")
    else:
        print(f"Login failed with status code: {response.status_code}")
        print("Error Response:", response.text)

except requests.exceptions.RequestException as e:
    print("An error occurred:", e)
