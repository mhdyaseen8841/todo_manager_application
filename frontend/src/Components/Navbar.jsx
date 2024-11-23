import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from 'react-router-dom';
const settings = ["Logout"];

function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const handleLogout = () =>{
    console.log("-----------------")
    localStorage.clear();
    navigate('/login')
  }
  return (
    <AppBar position="static" style={{ backgroundColor: "#172B4D" }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              fontFamily: "monospace",
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TODO APP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="MY" >{localStorage.getItem("username")?.charAt(0)} </Avatar>
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
            {localStorage.getItem("token") ? (
              <>
              <MenuItem  onClick={handleCloseUserMenu}>
            <Typography sx={{ textAlign: "center" }} >{localStorage.getItem("username")}</Typography>
          </MenuItem>
          <MenuItem key={"settings"} onClick={handleCloseUserMenu}>
            <Typography sx={{ textAlign: "center" }} onClick={()=>handleLogout()}>Logout</Typography>
          </MenuItem>
              </>
        ) : (
          <MenuItem key={"login"} onClick={()=>navigate('/login')}>
            <Typography sx={{ textAlign: "center" }}>Login</Typography>
          </MenuItem>
        )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
