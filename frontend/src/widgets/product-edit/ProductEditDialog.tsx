import { FC, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import Wrapper from "../../shared/ui/Wrapper";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../shared/api/IProduct";
import { ProductEditForm } from "../../features/product/edit";
import { PRODUCTS_ROUTE } from "../../shared/config/consts";
import ModelPreview from "../../shared/ui/ModelPreview";
import posterCreator from "../../shared/lib/posterCreator";
import { ModelViewerElement } from "@google/model-viewer";
import { useAppDispatch } from "../../shared/hooks/redux";
import { showFailtureToast } from "../../app/store/appSlice";

type ProductEditProps = {
  file?: File | null;
  product: IProduct;
  open: boolean;
  onClose: () => void;
  handleUpload: () => void;
  handleDelete: () => void;
};

export const ProductEditDialog: FC<ProductEditProps> = ({
  file = null,
  product,
  open,
  onClose,
  handleUpload,
  handleDelete,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formRef = useRef<HTMLInputElement | null>(null);
  const viewerRef = useRef<ModelViewerElement | null>(null);

  const [poster, setPoster] = useState<File | null>(null);
  const [viewerRendered, setViewerRendered] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const posterUpdate = async (event: Event) => {
    const viewer = viewerRef.current;
    viewer && viewer.removeEventListener("load", posterUpdate);

    const modelViewer = event.target as ModelViewerElement | null;

    if (modelViewer && modelViewer instanceof ModelViewerElement) {
      const data = await posterCreator(modelViewer);

      setPoster(data);
    } else {
      dispatch(showFailtureToast("Ошибка при создании постера"));
    }
  };

  const handleClose = () => {
    setBtnLoading(false);
    setViewerRendered(false);
    setPoster(null);

    onClose();
  };

  const handleButtonSubmit = () => {
    setBtnLoading(true);

    // Вызываем метод click из рефа
    formRef.current && formRef.current.click();
  };

  const handleFormError = () => {
    setBtnLoading(false);
  };

  const handleFormSubmit = (slug: string) => {
    handleClose();
    setBtnLoading(false);
    navigate(PRODUCTS_ROUTE + "/" + slug);
  };

  useEffect(() => {
    if (file && viewerRendered && viewerRef) {
      const viewer = viewerRef.current;

      if (viewer && !poster) {
        viewer.addEventListener("load", posterUpdate);

        return () => {
          viewer.removeEventListener("load", posterUpdate);
        };
      }
    }
  }, [file]);

  return (
    <Dialog open={open} onClose={handleClose} fullScreen>
      <Paper variant="outlined">
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1, textAlign: "center" }} variant="h6">
            Редактирование модели
          </Typography>

          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
        </Toolbar>
      </Paper>

      <Wrapper
        style={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <Paper variant="outlined" sx={{ mb: 2 }}>
              <ModelPreview
                ref={viewerRef}
                src={
                  (file ? URL.createObjectURL(file) : product["3d_model"]) || ""
                }
                poster={
                  product.poster ? product.poster : "/static/icons/cube.svg"
                }
                rendered={viewerRendered}
                setRendered={setViewerRendered}
              />
            </Paper>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                size="large"
                color="error"
                onClick={handleDelete}
                fullWidth
              >
                Удалить модель
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={handleUpload}
                fullWidth
              >
                Загрузить повторно
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} lg={8}>
            <ProductEditForm
              ref={formRef}
              file={file}
              poster={poster}
              product={product}
              onSubmit={handleFormSubmit}
              onError={handleFormError}
            />
          </Grid>
        </Grid>
      </Wrapper>

      <Paper elevation={8}>
        <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={handleButtonSubmit}
            disabled={(file ? !poster : false) || btnLoading}
          >
            {btnLoading ? "Загрузка..." : "Сохранить"}
          </Button>
        </Toolbar>
      </Paper>
    </Dialog>
  );
};
