import {
  Box,
  Card,
  CardMedia,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { ProductStats } from "./ProductStats";
import { Link } from "react-router-dom";
import { PRODUCTS_ROUTE } from "../../../shared/config/consts";
import { IProduct } from "../../../shared/api/IProduct";
import { FC, MouseEvent, useState } from "react";
import { UserAvatar } from "../../user";
import {
  DeleteRounded,
  LibraryAddRounded,
  MoreVertRounded,
  SettingsRounded,
} from "@mui/icons-material";

type ProductCardProps = {
  product: IProduct;
  hasMenu?: boolean;
  handleUpdate?: (product: IProduct) => void;
  handleAddTo?: (product: IProduct) => void;
  handleDestroy?: (product: IProduct) => void;
};

export const ProductCard: FC<ProductCardProps> = ({
  product,
  hasMenu = false,
  handleUpdate,
  handleAddTo,
  handleDestroy,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (product && handleDestroy) {
      handleDestroy(product);
    }

    handleClose();
  };

  const handleEdit = () => {
    if (product && handleUpdate) {
      handleUpdate(product);
    }

    handleClose();
  };

  const handleSaveTo = () => {
    if (product && handleAddTo) {
      handleAddTo(product);
    }

    handleClose();
  };

  return (
    <Card>
      <Link to={PRODUCTS_ROUTE + "/" + product?.slug}>
        <Box
          sx={{
            background: "radial-gradient(circle, #555 0%, #111 100%)",
            px: 3,
          }}
        >
          <CardMedia
            image={product?.poster ? product.poster : "/static/icons/cube.png"}
            sx={{
              height: 270,
              mx: "auto",
              backgroundSize: product?.poster ? "contain" : "auto",
            }}
          />
        </Box>
      </Link>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: hasMenu ? 1 : 1.5,
          px: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", overflow: "hidden" }}>
          <Link to={"/" + product?.user.name}>
            <UserAvatar user={product?.user} width={20} heigth={20} />
          </Link>

          <Box sx={{ overflow: "hidden", mx: 1 }}>
            <Link to={PRODUCTS_ROUTE + "/" + product?.slug}>
              <Typography
                component="span"
                variant="subtitle2"
                sx={{
                  width: "100%",
                  verticalAlign: "middle",
                  display: "inline-block",
                }}
                noWrap
              >
                {product?.title}
              </Typography>
            </Link>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ProductStats product={product} />

          {hasMenu && (
            <>
              <IconButton
                id="menu-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreVertRounded
                  sx={{ color: "text.disabled" }}
                  fontSize="small"
                />
              </IconButton>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleEdit}>
                  <ListItemIcon>
                    <SettingsRounded fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Редактировать</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleSaveTo}>
                  <ListItemIcon>
                    <LibraryAddRounded fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>В коллекцию</ListItemText>
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
                  <ListItemIcon>
                    <DeleteRounded
                      fontSize="small"
                      sx={{ color: "error.main" }}
                    />
                  </ListItemIcon>
                  <ListItemText>Удалить</ListItemText>
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Box>
    </Card>
  );
};
