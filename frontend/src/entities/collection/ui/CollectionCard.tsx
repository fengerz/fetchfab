import {
  DeleteRounded,
  MoreVertRounded,
  SettingsRounded,
} from "@mui/icons-material";
import {
  Box,
  CardMedia,
  IconButton,
  ImageList,
  ImageListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { FC, useState, MouseEvent } from "react";
import { ICollection } from "../../../shared/api/ICollection";
import { UserAvatar } from "../../user";
import { Link } from "react-router-dom";
import { CollectionStats } from "..";

type CollectionCardProps = {
  collection: ICollection;
  hasMenu?: boolean;
  handleUpdate?: (collection: ICollection) => void;
  handleDestroy?: (collection: ICollection) => void;
};

export const CollectionCard: FC<CollectionCardProps> = ({
  collection,
  hasMenu = true,
  handleUpdate,
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
    if (collection && handleDestroy) {
      handleDestroy(collection);
    }

    handleClose();
  };

  const handleEdit = () => {
    if (collection && handleUpdate) {
      handleUpdate(collection);
    }

    handleClose();
  };

  return (
    <Paper>
      <Link to={collection?.slug}>
        <ImageList cols={2} gap={0} sx={{ m: 0, borderRadius: "4px 4px 0 0" }}>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <ImageListItem
                key={index}
                sx={{
                  background: "radial-gradient(circle, #555 0%, #111 100%)",
                  px: 3,
                }}
              >
                <CardMedia
                  image={
                    collection?.poster_products[index]
                      ? collection?.poster_products[index].toString()
                      : "/static/icons/cube.png"
                  }
                  sx={{
                    height: 135,
                    backgroundSize: collection?.poster_products[index]
                      ? "contain"
                      : "auto",
                  }}
                />
              </ImageListItem>
            ))}
        </ImageList>
      </Link>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: hasMenu ? 1 : 1.5,
          px: 1.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Link to={"/" + collection?.user.name}>
            <UserAvatar user={collection?.user} width={20} heigth={20} />
          </Link>

          <Box sx={{ overflow: "hidden", mx: 1 }}>
            <Link to={collection?.slug}>
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
                {collection?.title}
              </Typography>
            </Link>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <CollectionStats collection={collection} />

          {hasMenu && (
            <>
              <IconButton
                id="menu-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ ml: 0.5 }}
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
    </Paper>
  );
};
