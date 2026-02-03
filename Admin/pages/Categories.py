import streamlit as st
from api import api_get, api_post
from utils import require_auth

require_auth()
st.title("Categories")

token = st.session_state.get("token")

genders = api_get("/genders", token)
categories = api_get("/categories", token)

st.subheader("Create Category")

name = st.text_input("Category Name")
gender = st.selectbox(
    "Gender",
    genders,
    format_func=lambda g: g["name"]
)

if st.button("Add Category"):
    api_post("/categories", {
        "name": name,
        "gender_id": gender["id"]
    }, token)
    st.success("Category added")
