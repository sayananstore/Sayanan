import streamlit as st
import requests
import pandas as pd
from api import BASE_URL, get_headers
from utils import require_auth

# --------------------------------------------------
# AUTH
# --------------------------------------------------
require_auth()
token = st.session_state.get("token")

st.title("📂 Category Management")

# --------------------------------------------------
# HELPERS
# --------------------------------------------------
def safe_error(res, fallback="Request failed"):
    """Safely extract error message from API response"""
    if res.headers.get("Content-Type", "").startswith("application/json"):
        try:
            return res.json().get("message", fallback)
        except Exception:
            return fallback
    return res.text or fallback


def get_categories():
    res = requests.get(
        f"{BASE_URL}/category",
        headers=get_headers(token)
    )
    if res.status_code == 200:
        return res.json()
    st.error(safe_error(res, "Failed to fetch categories"))
    return []


def get_genders():
    res = requests.get(
        f"{BASE_URL}/gender",
        headers=get_headers(token)
    )
    if res.status_code == 200:
        return res.json()
    st.error(safe_error(res, "Failed to fetch genders"))
    return []

# --------------------------------------------------
# SESSION STATE
# --------------------------------------------------
if "delete_category_id" not in st.session_state:
    st.session_state.delete_category_id = None

# --------------------------------------------------
# FETCH DATA
# --------------------------------------------------
categories = get_categories()
genders = get_genders()
gender_map = {g["name"]: g["id"] for g in genders}

# --------------------------------------------------
# VIEW CATEGORIES
# --------------------------------------------------
st.subheader("📋 Categories")

if categories:
    table_data = [
        {
            "ID": c["id"],
            "Name": c["name"],
            "Gender": c["Gender"]["name"] if c.get("Gender") else "-"
        }
        for c in categories
    ]

    st.dataframe(
        pd.DataFrame(table_data),
        use_container_width=True
    )

    st.markdown("### Manage")

    for c in categories:
        col1, col2 = st.columns([4, 1])
        with col1:
            st.write(f"**{c['name']}** — {c['Gender']['name']}")
        with col2:
            if st.button("🗑 Delete", key=f"del_{c['id']}"):
                st.session_state.delete_category_id = c["id"]
else:
    st.info("No categories found")

# --------------------------------------------------
# DELETE CONFIRMATION
# --------------------------------------------------
if st.session_state.delete_category_id:
    st.divider()
    st.warning("⚠️ Are you sure you want to delete this category?")

    col1, col2 = st.columns(2)

    with col1:
        if st.button("✅ Yes, Delete"):
            res = requests.delete(
                f"{BASE_URL}/category/{st.session_state.delete_category_id}",
                headers=get_headers(token)
            )

            if res.status_code == 200:
                st.success("Category deleted successfully")
                st.session_state.delete_category_id = None
                st.rerun()
            else:
                st.error(safe_error(res, "Delete failed"))

    with col2:
        if st.button("❌ Cancel"):
            st.session_state.delete_category_id = None
            st.rerun()

# --------------------------------------------------
# CREATE CATEGORY
# --------------------------------------------------
st.divider()
st.subheader("➕ Create Category")

with st.form("create_category_form"):
    name = st.text_input("Category Name")

    selected_gender = st.selectbox(
        "Gender",
        options=["Select gender"] + list(gender_map.keys())
    )

    submit = st.form_submit_button("Create")

if submit:
    if not name.strip():
        st.warning("Category name is required")
    elif selected_gender == "Select gender":
        st.warning("Please select a gender")
    else:
        payload = {
            "name": name,
            "GenderId": gender_map[selected_gender]
        }

        res = requests.post(
            f"{BASE_URL}/category",
            headers=get_headers(token),
            json=payload
        )

        if res.status_code in [200, 201]:
            st.success("Category created successfully")
            st.rerun()
        else:
            st.error(safe_error(res, "Create failed"))
