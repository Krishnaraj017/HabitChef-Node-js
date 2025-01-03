import os
import requests
from pathlib import Path

# Token for authentication
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJrcmlzaEBnbWFpbC5jb20iLCJpYXQiOjE3MzM4NDQ0ODcsImV4cCI6MTczMzg0ODA4N30.X3z017y3WrgfdnTB1OAXTO3HnVFrx7Vwz7BmOvizoXU'

# URL of the API endpoint
url = "http://192.168.201.25:3000/api/Foods/getWithImage"

# Relative path to the image
image_path = Path("images/dosa.jpg")

# Check if the file exists
if not image_path.exists():
    print(f"File not found: {image_path.resolve()}")
    exit()

# Open the file and send the POST request
with open(image_path, 'rb') as image_file:
    files = {'image': ('chapathi.jpg', image_file, 'image/jpeg')}
    headers = {
        "Authorization": f"Bearer {token}"
    }

    try:
        response = requests.post(url, files=files, headers=headers)
        print("Status Code:", response.status_code)
        print("Response JSON:", response.json())
    except requests.exceptions.RequestException as e:
        print("An error occurred:", e)
