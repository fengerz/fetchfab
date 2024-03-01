import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { UserAvatar, UserMenu } from "../../entities/user";
import SearchField from "../../shared/ui/SearchField";
import { NavMenu } from "../../features/category/menu";
import {
  ViewInArOutlined,
  FileUploadOutlined,
  Close,
  AutoAwesome,
  ExpandMore,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux";
import { openSignInDialog, openSignUpDialog } from "../../app/store/appSlice";
import {
  AppBar,
  Toolbar,
  Button,
  Grid,
  Typography,
  Avatar,
  Divider,
  Box,
  IconButton,
  Drawer,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  COLLECTIONS_ROUTE,
  LANDING_ROUTE,
  LIKES_ROUTE,
  MODELS_ROUTE,
  POPULAR_ROUTE,
  PRODUCTS_ROUTE,
} from "../../shared/config/consts";
import MenuLink from "../../shared/ui/MenuLink";
import { CategoryMenu } from "../../entities/category";
import { LogoutButton } from "../../entities/user/ui/LogoutButton";

type HeaderProps = {
  openUpload: () => void;
};

export const Header: FC<HeaderProps> = ({ openUpload }) => {
  const drawerWidth = 300;
  const dispatch = useAppDispatch();

  const { isAuth, currentUser } = useAppSelector((state) => state.user);
  const { categories } = useAppSelector((state) => state.category);

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [showMobileSearch, setShowMobileSearch] = useState<boolean>(false);

  const handleOpenLogin = () => {
    dispatch(openSignInDialog());
  };

  const handleOpenRegister = () => {
    dispatch(openSignUpDialog());
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleOpenMobileSearch = () => {
    setShowMobileSearch(true);
  };

  const handleCloseMobileSearch = () => {
    setShowMobileSearch(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        sx={{ boxShadow: "none", overflow: "hidden" }}
      >
        <Toolbar>
          <Grid container justifyContent="space-between" gap={3}>
            <Grid
              item
              sx={{
                display: showMobileSearch ? "none" : "flex",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={handleOpenDrawer}
                aria-haspopup="true"
                aria-expanded={openDrawer ? "true" : undefined}
                aria-controls={openDrawer ? "basic-menu" : undefined}
                sx={{ display: { xs: "inline-flex", sm: "none" }, mr: 1.5 }}
              >
                <MenuIcon />
              </IconButton>

              <Link
                to={isAuth ? PRODUCTS_ROUTE + POPULAR_ROUTE : LANDING_ROUTE}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      height: 32,
                      width: 32,
                      mr: 1,
                    }}
                  >
                    <ViewInArOutlined fontSize="small" />
                  </Avatar>

                  <Typography
                    variant="h6"
                    component="span"
                    sx={{
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                      color: "text.secondary",
                      fontWeight: 700,
                    }}
                  >
                    FetchFab
                  </Typography>
                </Box>
              </Link>

              <NavMenu />
            </Grid>

            <Grid item xs display="flex" justifyContent="flex-end" gap={1}>
              <SearchField
                showMobileSearch={showMobileSearch}
                handleOpenMobile={handleOpenMobileSearch}
                handleCloseMobile={handleCloseMobileSearch}
              />
            </Grid>

            <Grid
              item
              display="flex"
              flexDirection="row"
              justifyContent="end"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              {!isAuth && (
                <>
                  <Button color="primary" onClick={handleOpenLogin}>
                    Вход
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mx: 2 }}
                    onClick={handleOpenRegister}
                  >
                    Регистрация
                  </Button>
                </>
              )}

              <Button
                variant="contained"
                color="warning"
                startIcon={<FileUploadOutlined />}
                onClick={isAuth ? openUpload : handleOpenRegister}
              >
                Загрузить
              </Button>

              {isAuth && <UserMenu />}
            </Grid>
          </Grid>
        </Toolbar>

        <Divider />
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={openDrawer}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={handleCloseDrawer}>
            <Close />
          </IconButton>
        </Box>

        {isAuth && currentUser ? (
          <Accordion
            disableGutters
            elevation={0}
            square
            sx={{
              "&:not(:last-child)": {
                borderBottom: 0,
              },
              "&::before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <UserAvatar user={currentUser} width={32} heigth={32} />
                <Typography variant="button" sx={{ fontWeight: 700 }}>
                  {currentUser?.name}
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ px: 0, pt: 0, pb: 3 }}>
              <MenuLink
                text="Профиль"
                link={"/" + currentUser?.name}
                onClick={handleCloseDrawer}
              />

              <MenuLink
                text="Загрузить"
                onClick={isAuth ? openUpload : handleOpenRegister}
              />

              <MenuLink
                text="Модели"
                link={currentUser?.name + MODELS_ROUTE}
                onClick={handleCloseDrawer}
              />

              <MenuLink
                text="Коллекции"
                link={currentUser?.name + COLLECTIONS_ROUTE}
                onClick={handleCloseDrawer}
              />

              <MenuLink
                text="Понравившиеся"
                link={currentUser?.name + LIKES_ROUTE}
                onClick={handleCloseDrawer}
              />

              <Box sx={{ ml: 2, mt: 1 }}>
                <LogoutButton onClick={handleCloseDrawer} />
              </Box>
            </AccordionDetails>
          </Accordion>
        ) : (
          <Stack sx={{ p: 2, mb: 3 }} gap={1}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleOpenLogin}
              fullWidth
            >
              Вход
            </Button>

            <Button
              fullWidth
              color="warning"
              variant="contained"
              onClick={handleOpenRegister}
            >
              Регистрация
            </Button>
          </Stack>
        )}

        <Box>
          <Divider />

          <Accordion
            disableGutters
            elevation={0}
            square
            sx={{
              "&:not(:last-child)": {
                borderBottom: 0,
              },
              "&::before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="button">Категории</Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ px: 0, pt: 0, pb: 3 }}>
              <MenuLink
                text="Популярное"
                link={PRODUCTS_ROUTE + POPULAR_ROUTE}
                icon={<AutoAwesome fontSize="small" />}
                onClick={handleCloseDrawer}
              />

              <CategoryMenu categories={categories} />
            </AccordionDetails>
          </Accordion>

          <Divider />
        </Box>
      </Drawer>
    </>
  );
};
