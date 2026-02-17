import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import "../App.css";

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const idToken = await result.user.getIdToken();

      const res = await axios.post(
        "https://sayanan.vercel.app//api/auth/firebase",
        { idToken }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/";
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  return (
    <button className="google-btn" onClick={handleGoogleLogin}>
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        width="20"
      />
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
