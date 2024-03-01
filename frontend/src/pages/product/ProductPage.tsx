import "@google/model-viewer";
import Wrapper from "../../shared/ui/Wrapper";
import { Box, Button, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { ProductDetails } from "../../widgets/product-details";
import { ProductList } from "../../widgets/product-list";
import { CommentCreate } from "../../widgets/comment-create";
import { CommentList } from "../../widgets/comment-list";
import { useParams } from "react-router-dom";
import { useFetchProductCommentsQuery } from "../../entities/comment";
import { useAppSelector } from "../../shared/hooks/redux";
import { DeleteRounded } from "@mui/icons-material";
import { ProductDeleteDialog } from "../../widgets/product-delete";
import { useEffect, useState } from "react";
import { ProductEditDialog } from "../../widgets/product-edit";
import { ShareDialog } from "../../widgets/share-dialog";
import { ProductAddToCollection } from "../../widgets/product-add-to-collection";
import { CollectionCreateDialog } from "../../widgets/collection-create";
import { ProductUploadDialog } from "../../widgets/upload-dialog";
import {
  useFetchOneProductQuery,
  useFetchProductCollectionsQuery,
  useFetchSuggestsProductsQuery,
} from "../../entities/product";
import { IProduct } from "../../shared/api/IProduct";
import ModelView from "../../shared/ui/ModelView";
import { CollectionList } from "../../widgets/collection-list";

type ProductPageParams = {
  slug: string;
};

const ProductPage = () => {
  const { slug } = useParams<ProductPageParams>();
  const { currentUser } = useAppSelector((state) => state.user);

  const [file, setFile] = useState<File | null>(null);

  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openUploadDialog, setOpenUploadDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openShare, setOpenShare] = useState<boolean>(false);
  const [openSaveTo, setOpenSaveTo] = useState<boolean>(false);
  const [openAddCollection, setOpenAddCollection] = useState<boolean>(false);

  const [suggestsList, setSuggestsList] = useState<IProduct[] | []>([]);
  const [suggestsPage, setSuggestsPage] = useState<number>(1);
  const [suggestsPrevent, setSuggestsPrevent] = useState<boolean>(false);

  const {
    data: product,
    isLoading: productLoading,
    isFetching: productFetching,
  } = useFetchOneProductQuery(slug ? slug : "");

  const { data: comments, isLoading: commentsLoading } =
    useFetchProductCommentsQuery(slug ? slug : "");

  const { data: collections, isLoading: collectionsLoading } =
    useFetchProductCollectionsQuery(slug ? slug : "");

  const { data: suggests, isLoading: suggestsLoading } =
    useFetchSuggestsProductsQuery({ slug, page: suggestsPage });

  const handleFileUpdate = (file: File) => {
    setFile(file);
    setOpenUploadDialog(false);
  };

  const handleEditClose = () => {
    setFile(null);
    setOpenEditDialog(false);
  };

  const loadMore = () => {
    setSuggestsPage(2);
  };

  useEffect(() => {
    if (product) {
      document.title =
        product?.data.title +
        " - скачать бесплатно 3D модель от " +
        product?.data.user.name +
        " - FetchFab";

      setSuggestsPage(1);
      setSuggestsPrevent(false);
    }
  }, [product]);

  useEffect(() => {
    if (suggests && !suggestsPrevent) {
      if (suggestsPage === 1) {
        setSuggestsList([...suggests.data]);
      } else {
        setSuggestsList((prev) => [...prev, ...suggests.data]);
        setSuggestsPrevent(true);
      }
    }
  }, [suggests]);

  return (
    <>
      <Wrapper>
        <Grid container spacing={3}>
          <Grid item sm={12} md={8} xl={9}>
            {productFetching ? (
              <Skeleton variant="rounded" width={"100%"} height={750} />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "750px",
                  background: "radial-gradient(circle, #555 0%, #111 100%)",
                  borderRadius: "0.25rem",
                }}
              >
                <ModelView
                  src={product?.data["3d_model"]}
                  poster={product?.data.poster}
                />
              </Box>
            )}

            <ProductDetails
              product={product?.data}
              loading={productLoading}
              openShare={() => setOpenShare(true)}
              openSaveTo={() => setOpenSaveTo(true)}
            />

            <Box>
              <Typography sx={{ mb: 2 }} paragraph variant="h6">
                Комментарии{" "}
                {!productLoading && `(${product?.data.comments_count})`}
              </Typography>

              <CommentCreate
                product={product?.data}
                isLoading={productLoading}
              />

              {commentsLoading ? (
                Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton
                      key={i}
                      variant="rounded"
                      height={105}
                      sx={{ mb: 2 }}
                    />
                  ))
              ) : (
                <CommentList
                  comments={comments?.data}
                  product={product?.data}
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={4} xl={3}>
            {product?.data.user.id === currentUser?.id && (
              <Stack flexDirection="row" sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => setOpenEditDialog(true)}
                  sx={{ mr: 1, flexGrow: 1 }}
                >
                  Редактировать свойства
                </Button>

                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => setOpenDeleteDialog(true)}
                >
                  <DeleteRounded />
                </Button>
              </Stack>
            )}

            {(collectionsLoading || collections?.data.length > 0) && (
              <Box>
                <Typography color="text.secondary" variant="button" paragraph>
                  В коллекциях
                </Typography>

                <CollectionList
                  collections={collections?.data}
                  isLoading={collectionsLoading}
                />
              </Box>
            )}

            <Typography color="text.secondary" variant="button" paragraph>
              Рекомендуемые модели
            </Typography>

            <ProductList products={suggestsList} isLoading={suggestsLoading} />

            {suggestsPage === 1 && (
              <Box sx={{ textAlign: "center" }}>
                <Button variant="outlined" size="small" onClick={loadMore}>
                  Показать ещё
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Wrapper>

      {!productLoading && (
        <>
          <ProductEditDialog
            file={file}
            product={product?.data}
            open={openEditDialog}
            onClose={handleEditClose}
            handleUpload={() => setOpenUploadDialog(true)}
            handleDelete={() => setOpenDeleteDialog(true)}
          />

          <ProductUploadDialog
            open={openUploadDialog}
            onClose={() => setOpenUploadDialog(false)}
            onSubmit={handleFileUpdate}
          />

          <ProductDeleteDialog
            product={product?.data}
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
          />

          <ShareDialog open={openShare} onClose={() => setOpenShare(false)} />

          <ProductAddToCollection
            product={product?.data}
            open={openSaveTo}
            onClose={() => setOpenSaveTo(false)}
            handleAddCollection={() => setOpenAddCollection(true)}
          />

          <CollectionCreateDialog
            open={openAddCollection}
            onClose={() => setOpenAddCollection(false)}
          />
        </>
      )}
    </>
  );
};

export default ProductPage;
