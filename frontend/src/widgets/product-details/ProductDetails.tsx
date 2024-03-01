import { Typography, Box, Button, Divider, Skeleton } from "@mui/material";

import {
  VisibilityOutlined,
  FileDownloadOutlined,
  Add,
  Share,
  AccessTimeOutlined,
  Inventory2Outlined,
  SellOutlined,
} from "@mui/icons-material";
import { IProduct } from "../../shared/api/IProduct";
import { FC } from "react";
import { dateFormat } from "../../shared/lib/dateFormat";
import { numberFormat } from "../../shared/lib/numberFormat";
import { Link } from "react-router-dom";
import { UserAvatar } from "../../entities/user";
import {
  CATEGORY_ROUTE,
  PRODUCTS_ROUTE,
  TAG_ROUTE,
} from "../../shared/config/consts";
import { LikeButton } from "../../features/product/like/ui/LikeButton";
import { ProductDownloadButton } from "../../features/product/download";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux";
import { openSignInDialog } from "../../app/store/appSlice";

type ProductDetailsProps = {
  product: IProduct;
  loading: boolean;
  openShare: () => void;
  openSaveTo: () => void;
};

export const ProductDetails: FC<ProductDetailsProps> = ({
  product,
  loading,
  openShare,
  openSaveTo,
}) => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((state) => state.user.isAuth);

  const handleSaveTo = () => {
    if (isAuth) {
      openSaveTo();
    } else {
      dispatch(openSignInDialog());
    }
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Box>
          <Typography
            component="p"
            variant="h5"
            sx={{ mt: 2, mb: 0, fontWeight: 700 }}
          >
            {loading ? <Skeleton component="span" /> : product?.title}
          </Typography>

          <Typography
            component="p"
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            3D модель
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Link to={"/" + product?.user.name}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <UserAvatar user={product?.user} width={40} heigth={40} />

              <Typography component="p" sx={{ fontWeight: 700, ml: 1.5 }}>
                {loading ? (
                  <Skeleton component="span" width={225} />
                ) : (
                  product?.user.name
                )}
              </Typography>
            </Box>
          </Link>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {loading ? (
              <Skeleton
                variant="rounded"
                width={70}
                height={35}
                sx={{ mr: 1 }}
              />
            ) : (
              <Typography
                component="div"
                variant="button"
                color="text.secondary"
                sx={{ mr: 2, display: "flex", alignItems: "center" }}
              >
                <FileDownloadOutlined fontSize="small" sx={{ mr: 0.5 }} />{" "}
                {product?.downloads_count &&
                  numberFormat(product?.downloads_count)}
              </Typography>
            )}

            {loading ? (
              <Skeleton
                variant="rounded"
                width={70}
                height={35}
                sx={{ mr: 1 }}
              />
            ) : (
              <Typography
                component="div"
                variant="button"
                color="text.secondary"
                sx={{ mr: 2, display: "flex", alignItems: "center" }}
              >
                <VisibilityOutlined fontSize="small" sx={{ mr: 0.5 }} />{" "}
                {product?.views_count && numberFormat(product?.views_count)}
              </Typography>
            )}

            <LikeButton product={product} isLoading={loading} />
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <ProductDownloadButton product={product} isLoading={loading} />

          <Button
            startIcon={<Add />}
            disabled={loading}
            onClick={handleSaveTo}
            sx={{ color: "gray" }}
          >
            Сохранить
          </Button>

          <Button
            startIcon={<Share />}
            sx={{ color: "gray" }}
            onClick={openShare}
            disabled={loading}
          >
            Поделиться
          </Button>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography>
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => <Skeleton component="span" key={i} />)
              : product?.description}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", mb: 2 }}
          >
            <AccessTimeOutlined fontSize="small" sx={{ mr: 1 }} />

            <Typography component="p" variant="body2" color="text.secondary">
              {loading ? (
                <Skeleton variant="rounded" width={250} />
              ) : (
                `Опубликовано ${dateFormat(product?.created_at)}`
              )}
            </Typography>
          </Box>

          <Box
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", mb: 2 }}
          >
            <Inventory2Outlined fontSize="small" sx={{ mr: 1 }} />

            {loading ? (
              <Skeleton variant="rounded" width={250} height={30} />
            ) : (
              <Link
                to={
                  PRODUCTS_ROUTE + CATEGORY_ROUTE + "/" + product?.category.slug
                }
              >
                <Button color="inherit" variant="outlined" size="small">
                  {product?.category.title}
                </Button>
              </Link>
            )}
          </Box>

          {product?.tags && (
            <Box
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <SellOutlined fontSize="small" sx={{ mr: 1 }} />

              {loading ? (
                <Skeleton variant="rounded" width="100%" height={30} />
              ) : (
                <Box>
                  {product?.tags.split(",").map((tag, i) => (
                    <Link to={TAG_ROUTE + "/" + tag} key={i}>
                      <Button
                        variant="contained"
                        color="inherit"
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      >
                        {tag}
                      </Button>
                    </Link>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </Box>

        <Divider />
      </Box>
    </>
  );
};
