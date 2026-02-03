import {
  Box,
  Button,
  TextField,
  Typography,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) return;

    const mockUser = { name: "User", email };
    localStorage.setItem("token", "mock");
    localStorage.setItem("user", JSON.stringify(mockUser));

    navigate("/");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography sx={{ mb: 2, fontWeight: 500 }}>
        Welcome back
      </Typography>

      <TextField
        label="Email"
        fullWidth
        size="small"
        sx={{ mb: 2 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        size="small"
        sx={{ mb: 3 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        fullWidth
        onClick={handleLogin}
        sx={{
          backgroundColor: "#C9A24D",
          color: "#000",
          py: 1.2,
          fontWeight: 600,
          "&:hover": { backgroundColor: "#b8923f" },
        }}
      >
        Login
      </Button>
    </Box>
  );
};

const SignupForm = ({ navigate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password) return;

    const mockUser = { name, email };
    localStorage.setItem("token", "mock");
    localStorage.setItem("user", JSON.stringify(mockUser));

    navigate("/");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography sx={{ mb: 2, fontWeight: 500 }}>
        Create your account
      </Typography>

      <TextField
        label="Name"
        fullWidth
        size="small"
        sx={{ mb: 2 }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        label="Email"
        fullWidth
        size="small"
        sx={{ mb: 2 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        size="small"
        sx={{ mb: 3 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        fullWidth
        onClick={handleSignup}
        sx={{
          backgroundColor: "#C9A24D",
          color: "#000",
          py: 1.2,
          fontWeight: 600,
          "&:hover": { backgroundColor: "#b8923f" },
        }}
      >
        Sign Up
      </Button>
    </Box>
  );
};


const AuthPage = () => {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100svh", // 👈 better than 100vh on mobile
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 1.5,
        overflowX: "hidden", // 👈 prevent sideways cut
        backgroundColor: "#fafafa",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 380,
          px: 2,
          py: 3,
          borderRadius: 2,
          border: "1px solid #eee",
          boxSizing: "border-box", // 👈 CRITICAL
        }}
      >
        {/* Brand */}
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 600,
            letterSpacing: 2,
            mb: 2,
          }}
        >
          SAYANAN
        </Typography>

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="fullWidth"
          sx={{
            mb: 3,
            "& .Mui-selected": { color: "#C9A24D" },
            "& .MuiTabs-indicator": { backgroundColor: "#C9A24D" },
          }}
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        {tab === 0 ? (
          <LoginForm navigate={navigate} />
        ) : (
          <SignupForm navigate={navigate} />
        )}
      </Paper>
    </Box>
  );
};

export default AuthPage;
