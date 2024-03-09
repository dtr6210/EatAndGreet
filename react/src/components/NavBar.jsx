import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const pages = [
  "Main",
  "Create Post",
  "Favorite Recipes",
  "About",
  "Recipe Inspiration",
];
const settings = [
  { name: "Profile", path: "/profile" },
  // { name: "Account", path: "/account" },
  { name: "Logout" },
];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();
  const { handleLogout } = useUserContext();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // function to handle logout

  const logout = () => {
    handleLogout(); // clear user
    navigate("/"); // after logout go to homepage
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#4141b5" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalDiningIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 10,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 900,
              letterSpacing: ".02rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            EAT AND GREET
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      to={`/${page.toLowerCase().replace(/\s+/g, "-")}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <LocalDiningIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            EAT AND GREET
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  to={`/${page.toLowerCase().replace(/\s+/g, "-")}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {page}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleOutlinedIcon sx={{ color: "whitesmoke" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) =>
                setting.name === "Logout" ? (
                  <MenuItem key={setting.name} onClick={logout}>
                    <Typography
                      textAlign="center"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {setting.name}
                    </Typography>
                  </MenuItem>
                ) : (
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      component={Link}
                      to={setting.path}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {setting.name}
                    </Typography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
