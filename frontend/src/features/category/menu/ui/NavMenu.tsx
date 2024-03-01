import React from "react";
import { Button, Menu, Divider, Box, IconButton } from "@mui/material";
import {
  POPULAR_ROUTE,
  PRODUCTS_ROUTE,
} from "../../../../shared/config/consts";
import MenuIcon from "@mui/icons-material/Menu";
import { AutoAwesome } from "@mui/icons-material";
import MenuLink from "../../../../shared/ui/MenuLink";
import { CategoryMenu } from "../../../../entities/category";
import { useFetchCategoriesQuery } from "../../../../entities/category/api/categoryApi";

export const NavMenu = () => {
  const { data: categories } = useFetchCategoriesQuery("");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box>
        <Button
          color="inherit"
          aria-haspopup="true"
          aria-controls={open ? "basic-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          endIcon={<MenuIcon />}
          sx={{ display: { xs: "none", md: "inline-flex" } }}
        >
          Категории
        </Button>

        <IconButton
          // color="inherit"
          aria-haspopup="true"
          aria-controls={open ? "basic-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ display: { xs: "none", sm: "inline-flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuLink
          text="Популярное"
          link={PRODUCTS_ROUTE + POPULAR_ROUTE}
          icon={<AutoAwesome fontSize="small" />}
          onClick={handleClose}
        />

        <Divider sx={{ mt: 1 }} />

        <CategoryMenu categories={categories?.data} onClick={handleClose} />
      </Menu>
    </Box>
  );
};
