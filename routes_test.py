import requests

headers = {
  'csrf_token': 'ImUzOGIyNDg5ZDgyNmU5ZTcwZDU4ZWQ4ZTJjMTcwMmVjNzAzMWVlZDEi.Yp--uA.I93A7TFhyxEkJn3TISC7ES2tUDQ',
  'Session': '.eJwlzjFuA0EIQNG7TO0CGFjAl1nNMKBElhJp164s3z0rpfy_eu-215HnV7s_j1fe2v692r2ZoJV6QrAbTRYrhDW6QaFzIAkM7InTCdVM0t1rbJ6S0wCmqg4utZnFIEyyBVDNDsoc4eKDGViwbyXeu48wM8VcICNYtF2Q15nHvwavjPOo_fn7yJ9rZLdJbL6MtvRUWGK5LClQgTIUOmYubJ8_3nI9bQ.Yp--uA.kNQ88mpkHFWSDPqf1eylaKG60cc',
  'Cookie': 'csrf_token=ImUzOGIyNDg5ZDgyNmU5ZTcwZDU4ZWQ4ZTJjMTcwMmVjNzAzMWVlZDEi.Yp--uA.I93A7TFhyxEkJn3TISC7ES2tUDQ; session=.eJwlzjFuA0EIQNG7TO0CGFjAl1nNMKBElhJp164s3z0rpfy_eu-215HnV7s_j1fe2v692r2ZoJV6QrAbTRYrhDW6QaFzIAkM7InTCdVM0t1rbJ6S0wCmqg4utZnFIEyyBVDNDsoc4eKDGViwbyXeu48wM8VcICNYtF2Q15nHvwavjPOo_fn7yJ9rZLdJbL6MtvRUWGK5LClQgTIUOmYubJ8_3nI9bQ.Yp--uA.kNQ88mpkHFWSDPqf1eylaKG60cc'
}

url = "http://127.0.0.1:5000/api/users/1"

payload = {
    "name": "bench",
    "weight": 220,
    'sets': 5,
    'reps': 2,
    'rpe': 10,
}

response = requests.request("GET", url, headers=headers)
# print(response.text)
# print(response)