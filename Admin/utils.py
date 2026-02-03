import streamlit as st

def require_auth():
    if "token" not in st.session_state:
        st.warning("Please login to access the admin dashboard.")
        st.stop()
