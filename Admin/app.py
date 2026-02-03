import streamlit as st
from auth import login
from utils import require_auth

st.set_page_config(
    page_title="Sayanan Admin",
    layout="wide"
)

if "token" not in st.session_state:
    login()
    st.stop()

require_auth()

st.sidebar.success(f"Logged in as {st.session_state['user']['name']}")

if st.sidebar.button("Logout"):
    st.session_state.clear()
    st.rerun()

st.title("Sayanan Admin Dashboard")
st.write("Use the sidebar to manage the store.")
