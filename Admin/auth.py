import streamlit as st
from api import api_post

def login():
    # 🔒 Hide sidebar when logged out
    st.markdown(
        """
        <style>
        section[data-testid="stSidebar"] {
            display: none;
        }
        </style>
        """,
        unsafe_allow_html=True,
    )

    st.subheader("Admin Login")

    email = st.text_input("Email")
    password = st.text_input("Password", type="password")

    if st.button("Login"):
        res = api_post("/auth/login", {
            "email": email,
            "password": password
        })

        if res.get("token"):
            st.session_state["token"] = res["token"]
            st.session_state["user"] = res["user"]
            st.success("Login successful")
            st.rerun()
        else:
            st.error(res.get("message", "Login failed"))