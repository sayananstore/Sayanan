import streamlit as st
from api import api_get, api_post, get_headers, BASE_URL
from utils import require_auth
import requests
import pandas as pd

require_auth()

st.title("Products")

token = st.session_state.get("token")

if "products" not in st.session_state:
    st.session_state.products = []

if "selected_product_id" not in st.session_state:
    st.session_state.selected_product_id = None

tab1, tab2, tab3 = st.tabs(["🔍 View Products", "➕ Create Product", "Update Stock"])

def get_categories():
    res = api_get("/category", token)
    return res if res else []
def get_sizes():
    res = api_get("/size", token)
    return res if res else []
# ================= TAB 1: VIEW PRODUCTS =================
with tab1:
    st.subheader("🔍 Search & Filter Products")

    # ================= FILTERS =================
    col1, col2, col3, col4 = st.columns(4)

    with col1:
        search = st.text_input("Search Product")

    with col2:
        category = st.text_input("Category ID")

    with col3:
        min_price = st.number_input("Min Price", value=0)

    with col4:
        max_price = st.number_input("Max Price", value=0)

    page = st.number_input("Page", min_value=1, step=1)
    limit = 10

    # ================= SEARCH =================
    if st.button("Search"):
        params = {"page": page, "limit": limit}

        if search:
            params["search"] = search
        if category:
            params["category"] = category
        if min_price > 0:
            params["minPrice"] = min_price
        if max_price > 0:
            params["maxPrice"] = max_price

        response = api_get("/products", token, params=params)
        st.session_state.products = response.get("products", [])
        st.session_state.selected_product_id = None

    products = st.session_state.get("products", [])

    if not products:
        st.info("No products loaded. Click Search.")
    else:
    # ================= TABLE =================
        st.dataframe(
            pd.DataFrame([
                {
                    "ID": p["id"],
                    "Name": p["name"],
                    "Price": p["base_price"],
                    "Active": p.get("is_active", True)
                }
                for p in products
            ]),
            use_container_width=True
        )

    # ================= OPEN PRODUCT =================
    st.divider()
    st.subheader("📦 Open Product")

    for p in products:
        col1, col2 = st.columns([4, 1])
        with col1:
            st.write(f"**{p['name']}** — ₹{p['base_price']}")
        with col2:
            if st.button("View", key=f"view_{p['id']}"):
                st.session_state.selected_product_id = p["id"]
                st.rerun()

    # ================= PRODUCT DETAILS =================
    if st.session_state.get("selected_product_id"):
        st.divider()
        st.subheader("📝 Product Details")

        product_id = st.session_state.selected_product_id
        selected_product = api_get(f"/products/{product_id}", token)

        if not isinstance(selected_product, dict) or "id" not in selected_product:
            st.error(selected_product.get("message", "Failed to load product"))
            # st.stop()

        # ================= IMAGE UPLOAD =================
        st.markdown("### ➕ Upload Images")

        upload_images = st.file_uploader(
            "Select images (max 5)",
            type=["jpg", "jpeg", "png"],
            accept_multiple_files=True,
            key="upload_images_tab1"
        )

        if st.button("Upload Images"):
            if not upload_images:
                st.warning("Please select at least one image")
                # st.stop()

            files = [
                ("images", (img.name, img, img.type))
                for img in upload_images[:5]
            ]

            upload_res = requests.post(
                f"{BASE_URL}/products/{product_id}/images",
                headers={
                    "Authorization": f"Bearer {token}"
                },
                files=files
            )

            if upload_res.status_code in [200, 201]:
                st.success("✅ Images uploaded successfully")
                st.rerun()
            else:
                if upload_res.headers.get("Content-Type", "").startswith("application/json"):
                    st.error(upload_res.json().get("message", "Image upload failed"))
                else:
                    st.error(upload_res.text or "Image upload failed")

        # ================= IMAGES =================
        st.markdown("### 🖼 Product Images")

        if selected_product.get("images"):
            for img in selected_product["images"]:
                col1, col2, col3 = st.columns([4, 2, 2])

                with col1:
                    st.markdown(
                        f"""
                        <img src="{img['image_url']}"
                             style="
                                height:100px;
                                width:100%;
                                object-fit:cover;
                                border-radius:6px;
                                border:1px solid #eee;
                             " />
                        """,
                        unsafe_allow_html=True
                    )

                with col2:
                    if img.get("is_primary"):
                        st.success("⭐ Primary")
                    else:
                        if st.button("Set Primary", key=f"primary_{img['id']}"):
                            res = requests.patch(
                                f"{BASE_URL}/products/images/{img['id']}/primary",
                                headers=get_headers(token)
                            )
                            if res.status_code == 200:
                                st.success("Primary image updated")
                                st.rerun()
                            else:
                                st.error(res.text)

                with col3:
                    if st.button("🗑 Delete", key=f"delete_{img['id']}"):
                        res = requests.delete(
                            f"{BASE_URL}/products/images/{img['id']}",
                            headers=get_headers(token)
                        )
                        if res.status_code == 200:
                            st.success("Image deleted")
                            st.rerun()
                        else:
                            st.error(res.text)

        # ================= EDIT PRODUCT =================
        st.markdown("### ✏️ Edit Product")

        with st.form("edit_product_form"):
            st.text_input(
                "Product ID",
                value=str(selected_product["id"]),
                disabled=True
            )

            name = st.text_input("Name", selected_product["name"])
            description = st.text_area(
                "Description",
                selected_product.get("description", "")
            )

            base_price = st.number_input(
                "Base Price",
                value=float(selected_product["base_price"])
            )

            current_price = st.number_input(
                "Current Price",
                value=float(selected_product["current_price"])
            )

            col1, col2 = st.columns(2)
            update_btn = col1.form_submit_button("💾 Update")
            delete_btn = col2.form_submit_button("🗑 Delete")

        # ================= UPDATE =================
        if update_btn:
            res = requests.put(
                f"{BASE_URL}/products/{product_id}",
                headers=get_headers(token),
                json={
                    "name": name,
                    "description": description,
                    "base_price": base_price,
                    "current_price": current_price
                }
            )

            if res.status_code == 200:
                st.success("Product updated")
                st.rerun()
            else:
                st.error(res.json().get("message"))

        # ================= DELETE PRODUCT =================
        if delete_btn:
            res = requests.delete(
                f"{BASE_URL}/products/{product_id}",
                headers=get_headers(token)
            )

            if res.status_code == 200:
                st.success("Product deleted")
                st.session_state.selected_product_id = None
                st.rerun()
            else:
                st.error(res.json().get("message"))

        # ================= CLOSE =================
        if st.button("❌ Close Product"):
            st.session_state.selected_product_id = None
            st.rerun()


# ================= TAB 2: CREATE PRODUCT =================
with tab2:
    st.subheader("Create New Product")

    # ---------- FETCH DATA ----------
    categories = get_categories()
    category_map = {c["name"]: c["id"] for c in categories}

    sizes = get_sizes()
    size_map = {s["label"]: s["id"] for s in sizes}



    # ---------- CREATE PRODUCT FORM ----------
    with st.form("create_product_form"):
        name = st.text_input("Product Name")
        description = st.text_area("Description")

        base_price = st.number_input("Base Price", min_value=0.0)
        current_price = st.number_input("Current Price", min_value=0.0)

        selected_category = st.selectbox(
            "Category",
            options=["Select category"] + list(category_map.keys())
        )

        submitted = st.form_submit_button("💾 Create Product")
    # ---------- SIZE SELECTION (OUTSIDE FORM) ----------
    st.markdown("### Sizes & Stock")

    selected_sizes = st.multiselect(
        "Select Sizes",
        options=list(size_map.keys()),
        key="selected_sizes"
    )

    size_stock = {}
    for size_label in selected_sizes:
        size_stock[size_label] = st.number_input(
            f"Stock for {size_label}",
            min_value=0,
            step=1,
            key=f"stock_{size_label}"
        )
    # ---------- SUBMIT (ONLY ONCE) ----------
    if submitted:
        if not name.strip():
            st.warning("Product name is required")
            # st.stop()

        if selected_category == "Select category":
            st.warning("Please select a category")
            # st.stop()

        if not selected_sizes:
            st.warning("Please select at least one size")
            # st.stop()

        sizes_payload = [
            {
                "size_id": size_map[label],
                "stock_quantity": size_stock[label]
            }
            for label in selected_sizes
        ]

        payload = {
            "name": name,
            "description": description,
            "base_price": base_price,
            "current_price": current_price,
            "category_id": category_map[selected_category],
            "sizes": sizes_payload
        }

        res = requests.post(
            f"{BASE_URL}/products",
            headers=get_headers(token),
            json=payload
        )

        if res.status_code not in [200, 201]:
            st.error(res.json().get("message", "Failed to create product"))
            # st.stop()

        st.session_state.new_product_id = res.json()["id"]
        st.success(f"✅ Product created (ID: {st.session_state.new_product_id})")


    # ================= IMAGE UPLOAD =================
    if st.session_state.get("new_product_id"):
        st.divider()
        st.subheader("📷 Upload Product Images")

        images = st.file_uploader(
            "Select images (max 5)",
            type=["jpg", "jpeg", "png"],
            accept_multiple_files=True
        )

        if st.button("Upload Images"):
            if not images:
                st.warning("Please select at least one image")
                # st.stop()

            files = [
                ("images", (img.name, img, img.type))
                for img in images[:5]
            ]

            upload_res = requests.post(
                f"{BASE_URL}/products/{st.session_state.new_product_id}/images",
                headers={
                    "Authorization": f"Bearer {token}"  # ✅ ONLY auth header
                },
                files=files
            )

            if upload_res.status_code in [200, 201]:
                st.success("✅ Images uploaded successfully")
                st.session_state.new_product_id = None
            else:
                if upload_res.headers.get("Content-Type", "").startswith("application/json"):
                    st.error(upload_res.json().get("message", "Image upload failed"))
                else:
                    st.error(upload_res.text or "Image upload failed")

# ================= TAB 3: UPDATE STOCK =================

with tab3:
    st.subheader("📦 Create / Add Stock")

    # ---------- PRODUCT ID ----------
    product_id = st.number_input(
        "Enter Product ID",
        min_value=1,
        step=1
    )

    if not product_id:
        st.info("Enter a Product ID to continue")
        # st.stop()

    # ---------- FETCH AVAILABLE SIZES ----------
    res = requests.get(
        f"{BASE_URL}/size/available/{product_id}",
        headers=get_headers(token)
    )

    if res.status_code != 200:
        if res.headers.get("Content-Type", "").startswith("application/json"):
            st.error(res.json().get("message", "Failed to fetch sizes"))
        else:
            st.error(res.text or "Failed to fetch sizes")
        # st.stop()

    data = res.json()
    existing_sizes = data.get("existing_sizes", [])
    missing_sizes = data.get("missing_sizes", [])

    # ---------- EXISTING SIZES ----------
    st.markdown("### ✅ Existing Sizes")

    if not existing_sizes:
        st.info("No sizes added yet")
    else:
        for size in existing_sizes:
            st.write(f"• {size['label']}")

    # ---------- ADD MISSING SIZES ----------
    if missing_sizes:
        st.divider()
        st.markdown("### ➕ Add Missing Sizes")

        size_map = {
            size["label"]: size["id"]
            for size in missing_sizes
        }

        selected_sizes = st.multiselect(
            "Select sizes to add",
            options=list(size_map.keys())
        )

        size_stock = {}
        for label in selected_sizes:
            size_stock[label] = st.number_input(
                f"Stock for {label}",
                min_value=0,
                step=1,
                key=f"add_stock_{product_id}_{label}"
            )

        if st.button("➕ Add Sizes"):
            if not selected_sizes:
                st.warning("Please select at least one size")
                # st.stop()

            payload = {
                "sizes": [
                    {
                        "size_id": size_map[label],
                        "stock_quantity": size_stock[label]
                    }
                    for label in selected_sizes
                ]
            }

            add_res = requests.post(
                f"{BASE_URL}/size/addsizes/{product_id}",
                headers=get_headers(token),
                json=payload
            )

            if add_res.status_code in [200, 201]:
                st.success("✅ Sizes added successfully")
                st.rerun()
            else:
                st.error(add_res.json().get("message", "Failed to add sizes"))

    else:
        st.success("🎉 All sizes are already added for this product")
