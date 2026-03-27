import requests

BASE_URL = "http://76.13.245.24:5000/api"

def get_headers(token=None):
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    return headers


def api_get(endpoint, token=None, params=None):
    res = requests.get(
        f"{BASE_URL}{endpoint}",
        headers=get_headers(token),
        params=params
    )
    return res.json()


def api_post(endpoint, data=None, token=None):
    res = requests.post(
        f"{BASE_URL}{endpoint}",
        json=data,
        headers=get_headers(token)
    )
    return res.json()


def api_put(endpoint, data=None, token=None):
    res = requests.put(
        f"{BASE_URL}{endpoint}",
        json=data,
        headers=get_headers(token)
    )
    return res.json()


def api_patch(endpoint, data=None, token=None):
    res = requests.patch(
        f"{BASE_URL}{endpoint}",
        json=data,
        headers=get_headers(token)
    )
    return res.json()


def api_delete(endpoint, token=None, data=None):
    res = requests.delete(
        f"{BASE_URL}{endpoint}",
        json=data,
        headers=get_headers(token)
    )
    return res.json()
