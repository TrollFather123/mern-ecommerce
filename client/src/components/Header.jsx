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
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loggedOut } from "../redux/slice/userSlice";
import { useAuth } from "../hooks/useAuth";
import { styled } from "@mui/material";
import { getOrders } from "../redux/slice/orderSlice";

const CustomAppBar = styled(AppBar)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99;
  .cart_btn {
    position: relative;
    min-width: auto;
    padding: 0;
    margin: 0 20px;
    .order_amount {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 15px;
      height: 15px;
      font-size: 10px;
      border-radius: 100%;
      background-color: black;
      position: absolute;
      right: -5px;
      top: -5px;
      z-index: 1;
    }
  }
`;

const pages = [
  // { name: "Products", pathname: "/products" },
  // { name: "Pricing", pathname: "/pricing" },
  // { name: "Blog", pathname: "/blog" },
  // { name: "About", pathname: "/about" },
];

const settings = [
  { name: "Profile", pathname: "/profile" },
  { name: "Account", pathname: "/account" },
  { name: "Dashboard", pathname: "/dashboard/products" },
];

const settingsForGeneralUser = [
  { name: "Profile", pathname: "/profile" },
  { name: "Account", pathname: "/account" },
];

function Header() {
  // const [orders ,setOrders] = React.useState([]);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { orders } = useSelector((s) => s.order);
  const { user } = useAuth();

  console.log(user, "user");

  const handelLogout = () => {
    dispatch(loggedOut(null));
    navigate("/auth/login");
  };

  React.useEffect(() => {
    dispatch(getOrders());
  }, []);

  console.log(orders,"orders")



  return (
    <CustomAppBar position="static">
      <Container fixed>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
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
                <MenuItem key={page?.name}>
                  <Link to={page?.pathname}>
                    <Typography textAlign="center">{page?.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
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
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page?.name}
                onClick={() => navigate(page?.pathname)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page?.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user?._id && (
              <>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, borderRadius: 0 }}
                  >
                    <Avatar alt="Remy Sharp" src={user?.profilePic} />{" "}
                    {user && (
                      <Typography
                        variant="caption"
                        sx={{ color: "#fff", marginLeft: "10px" }}
                      >
                        Hello {user?.name}
                      </Typography>
                    )}
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
                  {user?.role !== "ADMIN" ? (
                    <Box>
                      {settingsForGeneralUser.map((setting) => (
                        <MenuItem
                          key={setting?.name}
                          onClick={handleCloseUserMenu}
                        >
                          <Link to={setting.pathname}>
                            <Typography textAlign="center">
                              {setting.name}
                            </Typography>
                          </Link>
                        </MenuItem>
                      ))}
                    </Box>
                  ) : (
                    <Box>
                      {settings.map((setting) => (
                        <MenuItem
                          key={setting?.name}
                          onClick={handleCloseUserMenu}
                        >
                          <Link to={setting.pathname}>
                            <Typography textAlign="center">
                              {setting.name}
                            </Typography>
                          </Link>
                        </MenuItem>
                      ))}
                    </Box>
                  )}
                </Menu>
              </>
            )}

            {user && (
              <Button
                sx={{ color: "#fff" }}
                className="cart_btn"
                onClick={() => navigate("/add-to-cart")}
              >
                <ShoppingCartIcon />
                {orders?.productList?.length && (
                  <Typography variant="caption" className="order_amount">
                    {orders?.productList?.length}
                  </Typography>
                )}
              </Button>
            )}

            {user ? (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handelLogout()}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/auth/login")}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </CustomAppBar>
  );
}
export default Header;
