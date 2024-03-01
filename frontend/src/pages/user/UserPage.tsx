import { useState, useEffect } from "react";
import { grey } from "@mui/material/colors";
import { Box, Tabs, Tab, Container } from "@mui/material";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useFetchUserQuery } from "../../entities/user";
import { ProductGrid } from "../../widgets/product-grid";
import { CollectionGrid } from "../../widgets/collection-grid";
import { CollectionDetails } from "../../widgets/collection-details";
import { UserDetails } from "../../widgets/user-details";
import { useAppSelector } from "../../shared/hooks/redux";
import { IProduct } from "../../shared/api/IProduct";
import { ProductEditDialog } from "../../widgets/product-edit";
import { ProductUploadDialog } from "../../widgets/upload-dialog";
import { ProductDeleteDialog } from "../../widgets/product-delete";
import { ProductAddToCollection } from "../../widgets/product-add-to-collection";
import { CollectionCreateDialog } from "../../widgets/collection-create";
import {
  useLazyFetchUserProductsQuery,
  useLazyFetchUserLikedProductsQuery,
  useLazyFetchCollectionProductsQuery,
} from "../../entities/product";
import {
  useLazyFetchOneCollectionQuery,
  useLazyFetchUserCollectionsQuery,
} from "../../entities/collection/api/collectionApi";
import {
  COLLECTIONS_ROUTE,
  LANDING_ROUTE,
  LIKES_ROUTE,
  LOGIN_ROUTE,
  NOT_FOUND_ROUTE,
} from "../../shared/config/consts";
import { CollectionEditDialog } from "../../widgets/collection-edit";
import { CollectionDeleteDialog } from "../../widgets/collection-delete";
import { ICollection } from "../../shared/api/ICollection";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

type UserPageProps = {
  username: string;
  slug?: string;
};

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const UserPage = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const { username, slug } = useParams<UserPageProps>();
  const [searchParams] = useSearchParams();

  const location = useLocation();
  const navigate = useNavigate();

  const page = searchParams.get("page") || 1;

  const [value, setValue] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>();
  const [selectedCollection, setSelectedCollection] =
    useState<ICollection | null>();

  const [openEditProduct, setOpenEditProduct] = useState<boolean>(false);
  const [openUploadProduct, setOpenUploadProduct] = useState<boolean>(false);
  const [openDeleteProduct, setOpenDeleteProduct] = useState<boolean>(false);
  const [openAddCollection, setOpenAddCollection] = useState<boolean>(false);
  const [openSaveTo, setOpenSaveTo] = useState<boolean>(false);

  const [openEditCollection, setOpenEditCollection] = useState<boolean>(false);
  const [openDeleteCollection, setOpenDeleteCollection] =
    useState<boolean>(false);

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useFetchUserQuery(username ? username : "");

  const [
    fetchUserModels,
    { data: userProducts, isLoading: userProductsLoading },
  ] = useLazyFetchUserProductsQuery();

  const [fetchOneCollection, { data: collection }] =
    useLazyFetchOneCollectionQuery();

  const [
    fetchCollections,
    { data: collections, isLoading: collectionsLoading },
  ] = useLazyFetchUserCollectionsQuery();

  const [
    fetchCollectionProducts,
    { data: collectionProducts, isLoading: collectionProductsLoading },
  ] = useLazyFetchCollectionProductsQuery();

  const [
    fetchLikedModels,
    { data: likedProducts, isLoading: likedProductsLoading },
  ] = useLazyFetchUserLikedProductsQuery();

  const handleCount = (count: number) => {
    return count ? "(" + count + ")" : "";
  };

  const handleProductAddTo = (product: IProduct) => {
    setSelectedProduct(product);
    setOpenSaveTo(true);
  };

  const handleProductUpdate = (product: IProduct) => {
    setSelectedProduct(product);
    setOpenEditProduct(true);
  };

  const handleProductDestroy = (product: IProduct) => {
    setSelectedProduct(product);
    setOpenDeleteProduct(true);
  };

  const handleProductFileUpdate = (file: File) => {
    setFile(file);
    setOpenUploadProduct(false);
  };

  const handleProductEditClose = () => {
    setFile(null);
    setOpenEditProduct(false);
  };

  const handleCollectionUpdate = (collection: ICollection) => {
    setSelectedCollection(collection);
    setOpenEditCollection(true);
  };

  const handleCollectionDestroy = (collection: ICollection) => {
    setSelectedCollection(collection);
    setOpenDeleteCollection(true);
  };

  useEffect(() => {
    switch (location.pathname) {
      case `/${username}`:
        setValue(0);
        fetchUserModels({ username: username ? username : "", page });

        document.title = "3D модели от " + username + " - FetchFab";
        break;

      case `/${username + COLLECTIONS_ROUTE}`:
        setValue(1);
        fetchCollections({ username, page });

        document.title = "Коллекции 3D моделей от " + username + " - FetchFab";
        break;

      case `/${username + COLLECTIONS_ROUTE}/${slug}`:
        fetchCollectionProducts({ username, slug, page });
        setValue(1);

        document.title = "Коллекция 3D моделей от " + username + " - FetchFab";
        break;

      case `/${username + LIKES_ROUTE}`:
        setValue(2);
        fetchLikedModels({ username: username ? username : "", page });

        document.title =
          "Понравившиеся 3D модели от " + username + " - FetchFab";
        break;

      default:
        setValue(0);
        fetchUserModels({ username: username ? username : "", page });

        document.title = username + " - FetchFab";
        break;
    }
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (slug) {
      fetchOneCollection({ username, slug });

      if (collection) {
        document.title =
          collection?.data.title +
          " - коллекция 3D моделей от " +
          username +
          " - FetchFab";
      }
    }
  }, [collection, slug]);

  useEffect(() => {
    if (userError) {
      if ("status" in userError && userError.status !== undefined) {
        const status = userError.status;

        switch (status) {
          case 404:
            navigate(NOT_FOUND_ROUTE);
            break;

          case 401:
            navigate(LOGIN_ROUTE);
            break;

          default:
            navigate(LANDING_ROUTE);
            break;
        }
      } else {
        navigate(LANDING_ROUTE);
      }
    }
  }, [userError]);

  return (
    <>
      <UserDetails user={user?.data} isLoading={userLoading} />

      <Box sx={{ bgcolor: grey[50], pt: 2, flexGrow: 1 }}>
        <Container maxWidth="xl">
          <Box>
            <Tabs value={value}>
              <Tab
                label={`Модели ${handleCount(user?.data.products_count)}`}
                onClick={() => navigate("/" + username)}
              />

              <Tab
                label="Коллекции"
                onClick={() => navigate("/" + username + COLLECTIONS_ROUTE)}
              />

              <Tab
                label={`Понравившиеся ${handleCount(user?.data.likes_count)}`}
                onClick={() => navigate("/" + username + LIKES_ROUTE)}
              />
            </Tabs>
          </Box>

          <CustomTabPanel value={value} index={0}>
            <ProductGrid
              meta={userProducts?.meta}
              products={userProducts?.data}
              isLoading={userProductsLoading}
              hasMenu={user?.data.name === currentUser?.name}
              handleDestroy={handleProductDestroy}
              handleUpdate={handleProductUpdate}
              handleAddTo={handleProductAddTo}
            />
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            {username && slug ? (
              <Box>
                <CollectionDetails username={username} slug={slug} />

                <ProductGrid
                  meta={collectionProducts?.meta}
                  products={collectionProducts?.data}
                  isLoading={collectionProductsLoading}
                  hasMenu={user?.data.name === currentUser?.name}
                  handleDestroy={handleProductDestroy}
                  handleUpdate={handleProductUpdate}
                  handleAddTo={handleProductAddTo}
                />
              </Box>
            ) : (
              <CollectionGrid
                hasMenu={true}
                meta={collections?.meta}
                isLoading={collectionsLoading}
                collections={collections?.data}
                handleUpdate={handleCollectionUpdate}
                handleDestroy={handleCollectionDestroy}
              />
            )}
          </CustomTabPanel>

          <CustomTabPanel value={value} index={2}>
            <ProductGrid
              hasMenu={true}
              meta={likedProducts?.meta}
              products={likedProducts?.data}
              isLoading={likedProductsLoading}
              handleDestroy={handleProductDestroy}
              handleUpdate={handleProductUpdate}
              handleAddTo={handleProductAddTo}
            />
          </CustomTabPanel>
        </Container>
      </Box>

      {selectedProduct && (
        <>
          <ProductEditDialog
            file={file}
            open={openEditProduct}
            product={selectedProduct}
            onClose={handleProductEditClose}
            handleUpload={() => setOpenUploadProduct(true)}
            handleDelete={() => setOpenDeleteProduct(true)}
          />

          <ProductUploadDialog
            open={openUploadProduct}
            onSubmit={handleProductFileUpdate}
            onClose={() => setOpenUploadProduct(false)}
          />

          <ProductDeleteDialog
            open={openDeleteProduct}
            product={selectedProduct}
            onClose={() => setOpenDeleteProduct(false)}
          />

          <ProductAddToCollection
            open={openSaveTo}
            product={selectedProduct}
            onClose={() => setOpenSaveTo(false)}
            handleAddCollection={() => setOpenAddCollection(true)}
          />

          <CollectionCreateDialog
            open={openAddCollection}
            onClose={() => setOpenAddCollection(false)}
          />
        </>
      )}

      {selectedCollection && (
        <>
          <CollectionEditDialog
            open={openEditCollection}
            collection={selectedCollection}
            onClose={() => setOpenEditCollection(false)}
          />

          <CollectionDeleteDialog
            open={openDeleteCollection}
            collection={selectedCollection}
            onClose={() => setOpenDeleteCollection(false)}
          />
        </>
      )}
    </>
  );
};

export default UserPage;
