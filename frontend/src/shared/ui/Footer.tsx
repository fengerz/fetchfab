import Wrapper from "./Wrapper";
import hhIcon from "/static/hh-icon.svg";
import { grey } from "@mui/material/colors";
import { useAppSelector } from "../hooks/redux";
import { Link, useLocation } from "react-router-dom";
import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import { ViewInArOutlined, GitHub, Telegram, Email } from "@mui/icons-material";
import { LANDING_ROUTE, POPULAR_ROUTE, PRODUCTS_ROUTE } from "../config/consts";

const Footer = () => {
  const location = useLocation();
  const isAuth = useAppSelector((state) => state.user.isAuth);

  const landingPage = location.pathname === "" || location.pathname === "/";

  return (
    <Wrapper
      style={{ backgroundColor: landingPage ? "transparent" : grey[50] }}
    >
      <Box component="footer">
        <Divider sx={{ mt: 2 }} />

        <Grid
          container
          pt={3}
          flexDirection={{ xs: "column", sm: "row" }}
          gap={1}
        >
          <Grid
            item
            xs={12}
            sm
            gap={1}
            display="flex"
            alignItems="center"
            justifyContent={{ xs: "center", sm: "start" }}
          >
            <Link to={isAuth ? PRODUCTS_ROUTE + POPULAR_ROUTE : LANDING_ROUTE}>
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  height: 32,
                  width: 32,
                }}
              >
                <ViewInArOutlined fontSize="small" />
              </Avatar>
            </Link>

            <Typography component="span">
              © {new Date().getFullYear()}, FetchFab by Vadim B.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} textAlign={{ xs: "center", sm: "right" }}>
            <Link to={"https://github.com"} target="_blank">
              <GitHub sx={{ color: grey[700], mr: 3 }} />
            </Link>

            <Link to={"https://hh.ru"} target="_blank">
              <img src={hhIcon} height={24} width={24} />
            </Link>

            <Link to={"mailto:example@gmail.com"} target="_blank">
              <Email sx={{ color: grey[700], mx: 3 }} />
            </Link>

            <Link to={"https://t.me"} target="_blank">
              <Telegram sx={{ color: grey[700] }} />
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  );
};

export default Footer;
