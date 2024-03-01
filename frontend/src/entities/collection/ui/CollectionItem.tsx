import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { ICollection } from "../../../shared/api/ICollection";
import { FC } from "react";
import { Link } from "react-router-dom";
import { COLLECTIONS_ROUTE } from "../../../shared/config/consts";
import { CollectionStats } from "..";

type CollectionItemProps = {
  collection: ICollection;
};

export const CollectionItem: FC<CollectionItemProps> = ({ collection }) => {
  return (
    <Card
      sx={{
        mb: 2,
        height: 110,
        display: "flex",
      }}
    >
      <Link
        to={
          "/" +
          collection?.user.name +
          COLLECTIONS_ROUTE +
          "/" +
          collection?.slug
        }
      >
        <Box
          sx={{
            width: 170,
            height: "100%",
          }}
        >
          <ImageList cols={2} gap={0} sx={{ m: 0 }}>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <ImageListItem
                  key={index}
                  sx={{
                    background: "radial-gradient(circle, #555 0%, #111 100%)",
                    px: collection?.poster_products[index] ? 0 : 3,
                  }}
                >
                  <CardMedia
                    image={
                      collection?.poster_products[index]
                        ? collection?.poster_products[index].toString()
                        : "/static/icons/cube.png"
                    }
                    sx={{
                      height: 55,
                      backgroundSize: "contain",
                    }}
                  />
                </ImageListItem>
              ))}
          </ImageList>
        </Box>
      </Link>

      <Box sx={{ overflow: "hidden", flexGrow: 0 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Link
            to={
              "/" +
              collection?.user.name +
              COLLECTIONS_ROUTE +
              "/" +
              collection?.slug
            }
          >
            <Typography
              sx={{
                width: "100%",
                verticalAlign: "top",
                display: "inline-block",
              }}
              component="span"
              variant="body1"
              noWrap
            >
              {collection?.title}
            </Typography>
          </Link>

          <Link to={"/" + collection?.user.name}>
            <Typography component="span" variant="body2" color="text.secondary">
              {collection?.user.name}
            </Typography>
          </Link>
        </CardContent>

        <Box sx={{ pl: 2 }}>
          <CollectionStats collection={collection} />
        </Box>
      </Box>
    </Card>
  );
};
