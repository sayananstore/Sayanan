import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../utils/GoogleLoginButton";
import "./styles/AuthPage.css";
import { loginUser, registerUser } from "../api/auth.api";
/* =======================
   LOGIN FORM
======================= */
const LoginForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
  if (!email || !password) return;

  try {

    const res = await loginUser({
      email,
      password,
    });

    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/");

  } catch (err) {

    console.error("Login failed:", err);
  }
};


  return (
    <div>
      <div className="form-title">Welcome back</div>

      <input
        className="input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="button-primary" onClick={handleLogin}>
        Login
      </button>

      <GoogleLoginButton />
    </div>
  );
};

/* =======================
   SIGNUP FORM
======================= */
const SignupForm = ({ navigate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleSignup = async () => {
  if (!name || !email || !password) return;

  try {

    const res = await registerUser({
      name,
      email,
      password,
    });

    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/");

  } catch (err) {

    console.error("Signup failed:", err);
  }
};


  return (
    <div>
      <div className="form-title">Create your account</div>

      <input
        className="input"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="button-primary" onClick={handleSignup}>
        Sign Up
      </button>

      <GoogleLoginButton />
    </div>
  );
};

/* =======================
   AUTH PAGE
======================= */
const AuthPage = () => {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="brand">SAYANAN</div>

        <div className="tabs">
          <button
            className={`tab ${tab === 0 ? "active" : ""}`}
            onClick={() => setTab(0)}
          >
            Login
          </button>

          <button
            className={`tab ${tab === 1 ? "active" : ""}`}
            onClick={() => setTab(1)}
          >
            Sign Up
          </button>
        </div>

        {tab === 0 ? (
          <LoginForm navigate={navigate} />
        ) : (
          <SignupForm navigate={navigate} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;










// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Tabs,
//   Tab,
//   Paper,
// } from "@mui/material";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import GoogleLoginButton from "../utils/GoogleLoginButton";


// const LoginForm = ({ navigate }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     if (!email || !password) return;

//     // TODO: replace with real API
//     const mockUser = { name: "User", email };
//     localStorage.setItem("token", "mock");
//     localStorage.setItem("user", JSON.stringify(mockUser));

//     navigate("/");
//   };

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Typography sx={{ mb: 2, fontWeight: 500 }}>
//         Welcome back
//       </Typography>

//       <TextField
//         label="Email"
//         fullWidth
//         size="small"
//         sx={{ mb: 2 }}
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <TextField
//         label="Password"
//         type="password"
//         fullWidth
//         size="small"
//         sx={{ mb: 3 }}
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <Button
//         fullWidth
//         onClick={handleLogin}
//         sx={{
//           backgroundColor: "#C9A24D",
//           color: "#000",
//           py: 1.2,
//           fontWeight: 600,
//           "&:hover": { backgroundColor: "#b8923f" },
//         }}
//       >
//         Login
//       </Button>

//       {/* 🔹 GOOGLE LOGIN */}
//       <GoogleLoginButton />
//     </Box>
//   );
// };

// /* =======================
//    SIGNUP FORM
// ======================= */

// const SignupForm = ({ navigate }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignup = async () => {
//     if (!name || !email || !password) return;

//     // TODO: replace with real API
//     const mockUser = { name, email };
//     localStorage.setItem("token", "mock");
//     localStorage.setItem("user", JSON.stringify(mockUser));

//     navigate("/");
//   };

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Typography sx={{ mb: 2, fontWeight: 500 }}>
//         Create your account
//       </Typography>

//       <TextField
//         label="Name"
//         fullWidth
//         size="small"
//         sx={{ mb: 2 }}
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <TextField
//         label="Email"
//         fullWidth
//         size="small"
//         sx={{ mb: 2 }}
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <TextField
//         label="Password"
//         type="password"
//         fullWidth
//         size="small"
//         sx={{ mb: 3 }}
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <Button
//         fullWidth
//         onClick={handleSignup}
//         sx={{
//           backgroundColor: "#C9A24D",
//           color: "#000",
//           py: 1.2,
//           fontWeight: 600,
//           "&:hover": { backgroundColor: "#b8923f" },
//         }}
//       >
//         Sign Up
//       </Button>

//       {/* 🔹 GOOGLE SIGNUP */}
//       <GoogleLoginButton />
//     </Box>
//   );
// };

// /* =======================
//    AUTH PAGE
// ======================= */

// const AuthPage = () => {
//   const [tab, setTab] = useState(0);
//   const navigate = useNavigate();

//   return (
//     <Box
//       sx={{
//         minHeight: "100svh", // mobile-safe height
//         width: "100%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         px: 1.5,
//         overflowX: "hidden",
//         backgroundColor: "#fafafa",
//       }}
//     >
//       <Paper
//         elevation={0}
//         sx={{
//           width: "100%",
//           maxWidth: 380,
//           px: 2,
//           py: 3,
//           borderRadius: 2,
//           border: "1px solid #eee",
//           boxSizing: "border-box",
//         }}
//       >
//         {/* Brand */}
//         <Typography
//           sx={{
//             textAlign: "center",
//             fontWeight: 600,
//             letterSpacing: 2,
//             mb: 2,
//           }}
//         >
//           SAYANAN
//         </Typography>

//         {/* Tabs */}
//         <Tabs
//           value={tab}
//           onChange={(_, v) => setTab(v)}
//           variant="fullWidth"
//           sx={{
//             mb: 3,
//             "& .Mui-selected": { color: "#C9A24D" },
//             "& .MuiTabs-indicator": { backgroundColor: "#C9A24D" },
//           }}
//         >
//           <Tab label="Login" />
//           <Tab label="Sign Up" />
//         </Tabs>

//         {tab === 0 ? (
//           <LoginForm navigate={navigate} />
//         ) : (
//           <SignupForm navigate={navigate} />
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default AuthPage;
