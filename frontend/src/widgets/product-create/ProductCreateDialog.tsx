import {
  Close,
  Looks3Rounded,
  LooksOneRounded,
  LooksTwoRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import Wrapper from "../../shared/ui/Wrapper";
import { ProductCreateForm } from "../../features/product/create";
import posterCreator from "../../shared/lib/posterCreator";
import ModelPreview from "../../shared/ui/ModelPreview";
import { IProduct } from "../../shared/api/IProduct";
import { ModelViewerElement } from "@google/model-viewer";
import { useAppDispatch } from "../../shared/hooks/redux";
import { showFailtureToast } from "../../app/store/appSlice";

type ProductCreateProps = {
  file: File;
  open: boolean;
  reupload: boolean;
  onClose: () => void;
  onSubmit: (product: IProduct) => void;
  handleReupload: () => void;
};

export const ProductCreateDialog: FC<ProductCreateProps> = ({
  file,
  open,
  reupload,
  onClose,
  onSubmit,
  handleReupload,
}) => {
  const STAGE_LOADING = "primary.main";
  const STAGE_SUCCESS = "success.main";
  const STAGE_WAIT = "text.disabled";
  const STAGE_ERROR = "error.main";

  const dispatch = useAppDispatch();

  const formRef = useRef<HTMLInputElement | null>(null);
  const viewerRef = useRef<ModelViewerElement | null>(null);

  const [poster, setPoster] = useState<File | null>(null);
  const [viewerRendered, setViewerRendered] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const [stages, setStages] = useState({
    load: STAGE_LOADING,
    poster: STAGE_WAIT,
    ready: STAGE_WAIT,
  });

  const handleFormError = () => {
    setBtnLoading(false);
  };

  const handleFormSubmit = (product: IProduct) => {
    setBtnLoading(false);
    onSubmit(product);
  };

  const handleButtonSubmit = () => {
    setBtnLoading(true);

    // Вызываем метод click из рефа
    formRef.current && formRef.current.click();
  };

  const posterUpdate = async (event: Event) => {
    const viewer = viewerRef.current;
    viewer && viewer.removeEventListener("load", posterUpdate);

    setStages((prevStages) => ({
      ...prevStages,
      load: STAGE_SUCCESS,
      poster: STAGE_LOADING,
    }));

    const modelViewer = event.target as ModelViewerElement | null;

    if (modelViewer && modelViewer instanceof ModelViewerElement) {
      const data = await posterCreator(modelViewer);
      setPoster(data);

      setStages((prevStages) => ({
        ...prevStages,
        poster: STAGE_SUCCESS,
        ready: STAGE_SUCCESS,
      }));
    } else {
      setStages((prevStages) => ({
        ...prevStages,
        poster: STAGE_ERROR,
      }));

      dispatch(showFailtureToast("Ошибка при создании постера"));
    }
  };

  const handleClose = () => {
    setStages({
      load: STAGE_LOADING,
      poster: STAGE_WAIT,
      ready: STAGE_WAIT,
    });

    setBtnLoading(false);
    setViewerRendered(false);
    setPoster(null);

    onClose();
  };

  const handlePosterCreate = () => {
    if (file && viewerRendered && viewerRef) {
      const viewer = viewerRef.current;

      if (viewer && !poster) {
        viewer.addEventListener("load", posterUpdate);

        return () => {
          viewer.removeEventListener("load", posterUpdate);
        };
      }
    }
  };

  useEffect(() => {
    handlePosterCreate();
  }, [viewerRendered]);

  useEffect(() => {
    if (file && reupload) {
      setStages({
        load: STAGE_LOADING,
        poster: STAGE_WAIT,
        ready: STAGE_WAIT,
      });

      setPoster(null);
    }
  }, [file]);

  useEffect(() => {
    if (file && reupload && !poster) {
      handlePosterCreate();
    }
  }, [poster]);

  return (
    <Dialog open={open} onClose={handleClose} fullScreen>
      <Paper variant="outlined">
        <Toolbar>
          <Typography
            sx={{ ml: 2, flex: 1, textAlign: "center" }}
            variant="h6"
            component="div"
          >
            Публикация модели
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
                src={file ? URL.createObjectURL(file) : ""}
                rendered={viewerRendered}
                setRendered={setViewerRendered}
              />
            </Paper>

            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <LooksOneRounded sx={{ color: stages.load }} />
                  <Typography variant="button">Загрузка модели</Typography>
                </Stack>

                <Stack direction="row" spacing={0.5} alignItems="center">
                  <LooksTwoRounded sx={{ color: stages.poster }} />
                  <Typography variant="button">Генерация постера</Typography>
                </Stack>

                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Looks3Rounded sx={{ color: stages.ready }} />
                  <Typography variant="button">
                    Готовность для публикации
                  </Typography>
                </Stack>
              </Stack>
            </Paper>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                size="large"
                color="error"
                onClick={onClose}
                fullWidth
              >
                Удалить модель
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={handleReupload}
                fullWidth
              >
                Загрузить повторно
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} lg={8}>
            <ProductCreateForm
              ref={formRef}
              file={file}
              poster={poster}
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
            size="large"
            onClick={handleButtonSubmit}
            disabled={!poster || btnLoading}
          >
            {btnLoading ? "Загрузка..." : "Сохранить"}
          </Button>
        </Toolbar>
      </Paper>
    </Dialog>
  );
};
