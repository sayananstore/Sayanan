import streamlit as st
from api import api_get, api_post
from utils import require_auth

require_auth()

st.title("Sizes")

token = st.session_state.get("token")
sizes = api_get("/sizes", token)

st.table(sizes)

new_size = st.text_input("New Size")

if st.button("Add Size"):
    api_post("/sizes", {"label": new_size}, token)
    st.success("Size added")
