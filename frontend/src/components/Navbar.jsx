import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Button,
  InputBase,
  Menu,
  MenuItem,
  Drawer,
  Divider,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  /* ---------------- MOCK STATE (replace later) ---------------- */
const cartCount = 2;
const wishlistCount = 1;
/* ---------------- STATE ---------------- */
const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);
const user = JSON.parse(localStorage.getItem("user")); // later replace with context
// console.log(user)
const navigate = useNavigate();
const [categoryAnchor, setCategoryAnchor] = useState(null);
const [activeCategory, setActiveCategory] = useState(null);
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setAnchorEl(null);
  navigate("/login");
};
const [profileAnchor, setProfileAnchor] = useState(null);
const [drawerOpen, setDrawerOpen] = useState(false);
const [scrolled, setScrolled] = useState(false);
const categories = {
  Men: ["Shirt"],
  Women: ["Kurti", "Lehenga", "Poshak"],
    };
  /* ---------------- SCROLL EFFECT ---------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- STYLES ---------------- */
  const iconSx = {
    color: "#fff",
    transition: "all 0.25s ease",
    "&:hover": {
      color: "#C9A24D",
      filter: "drop-shadow(0 0 6px rgba(201,162,77,0.8))",
    },
  };

  return (
    <>
      {/* ===================== NAVBAR ===================== */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
        overflowX: "hidden",
          backgroundColor: "#121212",
          borderBottom: "1px solid rgba(201,162,77,0.3)",
          transition: "all 0.3s ease",
          boxShadow: scrolled
            ? "0 4px 20px rgba(0,0,0,0.5)"
            : "none",
        }}
      >
        <Toolbar
            disableGutters
          sx={{
            minHeight: scrolled ? 60 : 70,
            transition: "min-height 0.3s ease",
            px: { xs: 1.5, md: 4 },
            color: "#C9A24D",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* ================= LEFT ================= */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {/* Mobile Hamburger */}
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { xs: "flex", md: "none" }, ...iconSx }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                textDecoration: "none",
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Sayanan"
                sx={{
                  height: { xs: 36, md: 56 },
                  filter:
                    "drop-shadow(0 0 10px rgba(201,162,77,0.7))",
                }}
              />
              <Typography
                sx={{
                  display: { xs: "none", md: "block" },
                  fontWeight: 600,
                  letterSpacing: 2,
                  color: "#C9A24D"
                }}
              >
                SAYANAN
              </Typography>
            </Box>

            {/* Categories (Desktop) */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 2,
              }}
            >
            {Object.keys(categories).map((cat) => (
            <Button
                key={cat}
                onMouseEnter={(e) => {
                setCategoryAnchor(e.currentTarget);
                setActiveCategory(cat);
                }}
                sx={{
                color: "#fff",
                textTransform: "none",
                "&:hover": { color: "#C9A24D" },
                }}
            >
                {cat}
            </Button>
            ))}
            
            </Box>
          </Box>
            <Menu
  anchorEl={categoryAnchor}
  open={Boolean(categoryAnchor)}
  onClose={() => setCategoryAnchor(null)}
  MenuListProps={{
    onMouseLeave: () => setCategoryAnchor(null),
  }}
  PaperProps={{
    sx: {
      backgroundColor: "#121212",
      color: "#fff",
      border: "1px solid rgba(201,162,77,0.3)",
    },
  }}
>
  {activeCategory &&
    categories[activeCategory].map((item) => (
      <MenuItem
        key={item}
        onClick={() => {
          navigate(`/products?category=${item.toLowerCase()}`);
          setCategoryAnchor(null);
        }}
        sx={{
          "&:hover": { color: "#C9A24D" },
        }}
      >
        {item}
      </MenuItem>
    ))}
</Menu>
    
          {/* ================= CENTER (Mobile Logo) ================= */}
          <Typography
            sx={{
              display: { xs: "block", md: "none" },
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            SAYANAN
          </Typography>

          {/* ================= RIGHT ================= */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.1,
                    ml: "auto", // 👈 pushes icons to right safely
                }}
                >

            {/* Search (Desktop) */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                border: "1px solid rgba(255,255,255,0.4)",
                px: 2,
                borderRadius: 20,
              }}
            >
              <SearchIcon fontSize="small" />
              <InputBase
                placeholder="Search"
                sx={{
                  ml: 1,
                  color: "#fff",
                  "& input::placeholder": {
                    color: "rgba(255,255,255,0.6)",
                  },
                }}
              />
            </Box>

            {/* Search Icon (Mobile) */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" }, ...iconSx }}
            >
              <SearchIcon />
            </IconButton>

            {/* Profile */}
            <IconButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                    color: "#fff",
                    "&:hover": { color: "#C9A24D" },
                }}
                >
                <AccountCircleOutlinedIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                    sx: {
                    backgroundColor: "#121212",
                    color: "#fff",
                    minWidth: 180,
                    border: "1px solid rgba(201,162,77,0.3)",
                    },
                }}
                >
                {user && (
                    <MenuItem disabled>
                    <Typography sx={{ fontWeight: 600 }}>
                        Hi, {user.name}
                    </Typography>
                    </MenuItem>
                )}
                
                {user && (
                    <MenuItem onClick={() => navigate("/profile")}>
                    My Profile
                    </MenuItem>
                )}
                
                {user && (
                    <MenuItem onClick={() => navigate("/orders")}>
                    Orders
                    </MenuItem>
                )}
                
                {user && (
                    <MenuItem
                    onClick={handleLogout}
                    sx={{ color: "#C9A24D" }}
                    >
                    Logout
                    </MenuItem>
                )}
                
                {!user && (
                    <MenuItem component={Link} to="/login">
                    Login
                    </MenuItem>
                )}
                
                {!user && (
                    <MenuItem component={Link} to="/signup">
                    Sign up
                    </MenuItem>
                )}
                </Menu>


            {/* Wishlist */}
            <IconButton sx={iconSx}>
              <Badge
                badgeContent={wishlistCount}
                invisible={wishlistCount === 0}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#C9A24D",
                    color: "#000",
                    fontSize: "0.7rem",
                  },
                }}
              >
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>

            {/* Cart */}
            <IconButton sx={iconSx}>
              <Badge
                badgeContent={cartCount}
                invisible={cartCount === 0}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#C9A24D",
                    color: "#000",
                    fontSize: "0.7rem",
                  },
                }}
              >
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ================= MOBILE DRAWER ================= */}
            <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
                sx: {
                backgroundColor: "#121212",
                color: "#fff",
                width: 260,
                overflow: "hidden", // 👈 CRITICAL
                },
            }}
            >
            <Box
                sx={{
                height: "100vh", // 👈 fill viewport
                px: 2,
                py: 2,
                display: "flex",
                flexDirection: "column",
                }}
            >
                {/* Top: Categories */}
                <Box>
                <Typography
                    sx={{
                    fontWeight: 600,
                    mb: 2,
                    letterSpacing: 1,
                    }}
                >
                    Categories
                </Typography>
            
                {["Men", "Women"].map((cat) => (
                    <Button
                    key={cat}
                    fullWidth
                    sx={{
                        justifyContent: "flex-start",
                        textTransform: "none",
                        color: "#fff",
                        fontWeight: 500,
                        py: 1,
                        "&:hover": {
                        color: "#C9A24D",
                        backgroundColor: "transparent",
                        },
                    }}
                    >
                    {cat}
                    </Button>
                ))}
                </Box>
            
                {/* Spacer */}
                <Box sx={{ flexGrow: 1 }} />
            
                {/* Bottom: Auth */}
                <Divider
                sx={{
                    borderColor: "rgba(201,162,77,0.3)",
                    mb: 2,
                }}
                />
            
                {user ? (
                <Button
                    fullWidth
                    sx={{
                    color: "#fff",
                    fontWeight: 500,
                    "&:hover": { color: "#C9A24D" },
                    }}
                >
                    Logout
                </Button>
                ) : (
                <Button
                    component={Link}
                    to="/login"
                    fullWidth
                    sx={{
                    color: "#fff",
                    fontWeight: 500,
                    "&:hover": { color: "#C9A24D" },
                    }}
                >
                    Login
                </Button>
                )}
            </Box>
            </Drawer>


    </>
  );
};

export default Navbar;










// import {
//   AppBar,
//   Toolbar,
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import logo from "../assets/logo.png";

// const Navbar = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <AppBar
//       position="sticky"
//       elevation={0}
//       sx={{
//         backgroundColor: "#121212",
//         borderBottom: "1px solid rgba(201,162,77,0.35)",
//       }}
//     >
//       <Toolbar
//         sx={{
//           minHeight: { xs: 56, md: 70 },
//           px: { xs: 2, md: 4 },
//           display: "flex",
//           justifyContent: "space-between",
//         }}
//       >
//         {/* LOGO */}
//         <Box display="flex" alignItems="center">
//           <Box
//             component="img"
//             src={logo}
//             alt="Sayanan"
//             sx={{
//               height: { xs: 40, md: 56 },
//               mr: 1.5,
//               filter: "drop-shadow(0 0 10px rgba(201,162,77,0.6))",
//             }}
//           />
//           <Typography
//             sx={{
//               color: "#C9A24D",
//               fontWeight: 600,
//               letterSpacing: 2,
//               fontSize: { xs: "1rem", md: "1.2rem" },
//             }}
//           >
//             SAYANAN
//           </Typography>
//         </Box>

//         {/* DESKTOP MENU */}
//         <Box
//           sx={{
//             display: { xs: "none", md: "flex" },
//             gap: 2,
//           }}
//         >
//           <Button component={Link} to="/" sx={{ color: "#C9A24D" }}>
//             Home
//           </Button>
//           <Button component={Link} to="/products" sx={{ color: "#C9A24D" }}>
//             Products
//           </Button>
//           <Button component={Link} to="/login" sx={{ color: "#C9A24D" }}>
//             Login
//           </Button>
//         </Box>

//         {/* MOBILE MENU ICON */}
//         <IconButton
//           onClick={handleMenuOpen}
//           sx={{
//             display: { xs: "flex", md: "none" },
//             color: "#C9A24D",
//           }}
//         >
//           <MenuIcon />
//         </IconButton>

//         {/* MOBILE DROPDOWN */}
//         <Menu
//           anchorEl={anchorEl}
//           open={open}
//           onClose={handleMenuClose}
//           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//           transformOrigin={{ vertical: "top", horizontal: "right" }}
//           PaperProps={{
//             sx: {
//               backgroundColor: "#121212",
//               border: "1px solid rgba(201,162,77,0.3)",
//               minWidth: 160,
//             },
//           }}
//         >
//           <MenuItem
//             component={Link}
//             to="/"
//             onClick={handleMenuClose}
//             sx={{ color: "#C9A24D" }}
//           >
//             Home
//           </MenuItem>
//           <MenuItem
//             component={Link}
//             to="/products"
//             onClick={handleMenuClose}
//             sx={{ color: "#C9A24D" }}
//           >
//             Products
//           </MenuItem>
//           <MenuItem
//             component={Link}
//             to="/login"
//             onClick={handleMenuClose}
//             sx={{ color: "#C9A24D" }}
//           >
//             Login
//           </MenuItem>
//         </Menu>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;
