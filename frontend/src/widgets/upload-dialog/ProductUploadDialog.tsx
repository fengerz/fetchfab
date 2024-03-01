import { ChangeEvent, DragEventHandler, FC, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";

import Wrapper from "../../shared/ui/Wrapper";
import { Close, InsertDriveFileOutlined } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { useAppDispatch } from "../../shared/hooks/redux";
import { showFailtureToast } from "../../app/store/appSlice";

type ProductUploadProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (file: File) => void;
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const ProductUploadDialog: FC<ProductUploadProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const dispatch = useAppDispatch();

  const [file, setFile] = useState<File | null>(null);
  const [dragEnter, setDragEnter] = useState<boolean>(false);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleClose = () => {
    setFile(null);
    onClose();
  };

  const handleSubmit = () => {
    //Валидация файла
    if (file) {
      const splitedName = file?.name.split(".");
      const extension = splitedName[splitedName.length - 1];

      if (extension === "glb") {
        file && onSubmit(file);
        setFile(null);
      } else {
        dispatch(showFailtureToast("Неподдерживаемый формат файла"));
      }
    } else {
      dispatch(showFailtureToast("Файл модели отсутствует"));
    }
  };

  const handleDragEnter: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragEnter(true);
  };

  const handleDragLeave: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragEnter(false);
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const files = [...event.dataTransfer.files];

    setDragEnter(false);
    setFile(files[0]);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {dragEnter ? (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            bgcolor: grey[800],
            opacity: 0.95,
            zIndex: 999,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <InsertDriveFileOutlined
              sx={{ color: "white", fontSize: 75, mb: 2 }}
            />

            <Typography variant="h6" color="white">
              Поместите файл сюда, <br /> чтобы загрузить
            </Typography>
          </Box>
        </Box>
      ) : (
        <Wrapper
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <Stack direction="row" justifyContent="flex-end">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
          </Stack>

          <Container sx={{ textAlign: "center" }}>
            <Typography paragraph variant="h4" sx={{ fontWeight: 300 }}>
              Загрузить новую модель
            </Typography>

            <Paper
              variant="outlined"
              component="label"
              sx={{
                width: "100%",
                p: 3,
                my: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "2px dashed lightgray",
                cursor: "pointer",
              }}
            >
              <Box>
                {file ? (
                  <Button variant="outlined" size="large" component="label">
                    {file?.name}
                    <VisuallyHiddenInput type="file" onChange={onFileChange} />
                  </Button>
                ) : (
                  <img
                    src="/static/images/Upload_Model.png"
                    width={300}
                    height={300}
                  />
                )}

                <Typography
                  variant="h5"
                  paragraph
                  sx={{ fontWeight: 700, mt: 5 }}
                >
                  Перетащите или{" "}
                  <Typography
                    color="primary.main"
                    variant="inherit"
                    component="span"
                  >
                    выберите файл
                  </Typography>
                </Typography>

                {!file && (
                  <Typography>
                    Поддерживаются файлы моделей с расширением GLB размером не
                    более 30МБ
                  </Typography>
                )}
              </Box>

              <VisuallyHiddenInput type="file" onChange={onFileChange} />
            </Paper>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                size="large"
                sx={{ p: 2 }}
                onClick={handleClose}
              >
                Отмена
              </Button>

              {file && (
                <Button
                  variant="contained"
                  size="large"
                  sx={{ p: 2 }}
                  onClick={handleSubmit}
                >
                  Загрузить файл
                </Button>
              )}
            </Box>
          </Container>
        </Wrapper>
      )}
    </Dialog>
  );
};
