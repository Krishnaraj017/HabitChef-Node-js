import requests

# Token for authentication
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJrcmlzaG5hQGdtYWlsLmNvbSIsImlhdCI6MTczNTU2NzgwOSwiZXhwIjoxNzM1NTcxNDA5fQ.OHPDr0vNOVp0fti3ZWFMvAHd-kKSPo7tQbPWsOu0ixw'

# URL of the API endpoint
url = "https://habit-chef-node-kxxg0n0mm-krish2.vercel.app/api/foods/searchByFoodName"

# Data for the request
data = {
    'foodName': 'Almonds'
}

# Headers for the request
headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}

# Send the POST request
try:
    response = requests.post(url, json=data, headers=headers)

    # Print the response status code and content
    print(f"Status Code: {response.status_code}")

    # Check content type before attempting to parse JSON
    if response.headers.get('Content-Type') == 'application/json':
        print("Response JSON:", response.json())
    else:
        print("Non-JSON Response Content:", response.text)

    # Handle specific status codes
    if response.status_code == 200:
        print("Food nutrients retrieved successfully!")
    elif response.status_code == 401:
        print("Unauthorized. Please check your token.")
    elif response.status_code == 400:
        print("Bad request. Verify the payload.")
    else:
        print("Unexpected error occurred.")

except requests.exceptions.RequestException as e:
    print("An error occurred:", e)
