import streamlit as st
from api import api_get
from utils import require_auth

require_auth()

st.title("Orders")

token = st.session_state.get("token")
orders = api_get("/orders", token)

for o in orders:
    with st.expander(f"Order #{o['id']} - {o['status']}"):
        st.json(o)
