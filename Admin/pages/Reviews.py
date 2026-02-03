import streamlit as st
from api import api_get
from utils import require_auth

require_auth()

st.title("Reviews")

token = st.session_state.get("token")
reviews = api_get("/reviews", token)

for r in reviews:
    st.markdown(f"""
    **Product:** {r['product_id']}  
    **Rating:** ⭐ {r['rating']}  
    {r['comment']}
    """)
