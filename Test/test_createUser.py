import requests

# Define the endpoint URL
url = "http://192.168.76.25:8000/api/users/createUser"

# Define the payload (JSON data)
payload = {
    "username": "Krishnaraj S",
    "password": "007",
    "email": "krish@gmail.com"
}

# Define the headers
headers = {
    "Content-Type": "application/json"
}

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
