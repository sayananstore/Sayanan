import streamlit as st
from mysql.connector import pooling

# @st.cache_resource(show_spinner=False)
def get_db_pool():
    return pooling.MySQLConnectionPool(
        pool_name="streamlit_pool",
        pool_size=5,
        host=st.secrets["database"]["host"],
        port=st.secrets["database"]["port"],
        user=st.secrets["database"]["user"],
        password=st.secrets["database"]["password"],
        database=st.secrets["database"]["name"],
        connection_timeout=5
    )

def get_connection():
    return get_db_pool().get_connection()
