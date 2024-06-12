import "@google/model-viewer";
import { useEffect } from "react";
import { blue } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { ProductCard, useFetchTopProductsQuery } from "../../entities/product";
import { POPULAR_ROUTE, PRODUCTS_ROUTE } from "../../shared/config/consts";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux";
import { openSignInDialog } from "../../app/store/appSlice";
import { CategoryMenu } from "../../entities/category";
import { IProduct } from "../../shared/api/IProduct";

const LandingPage = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);

  const { data: products, isLoading: productsLoading } =
    useFetchTopProductsQuery("");

  useEffect(() => {
    document.title = "FetchFab - Ваши 3D модели онлайн";
  }, []);

  return (
    <>
      <Container>
        <Box id="intro">
          <Grid
            container
            justifyContent="center"
            textAlign={{ xs: "center", md: "left" }}
          >
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Typography variant="h3">
                  Ведущая платформа для 3D в сети
                </Typography>

                <Typography variant="body1" sx={{ my: 3 }}>
                  Управляйте 3D объектами. Распространяйте опыт. Сотрудничайте с
                  другими участниками. Демонстрируйте свои работы.
                </Typography>

                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mr: 1 }}
                    onClick={() => dispatch(openSignInDialog())}
                  >
                    Присоединиться
                  </Button>

                  <Link to={PRODUCTS_ROUTE + POPULAR_ROUTE}>
                    <Button variant="contained" color="warning">
                      Смотреть модели
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <model-viewer
                style={{
                  width: "100%",
                  height: "650px",
                }}
                src="/example/3d.glb"
                ios-src="/example/3d.usdz"
                poster="/example/3d.webp"
                shadow-intensity="1"
                camera-controls
                auto-rotate
              ></model-viewer>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Box
        id="models-preview"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: blue[50],
          py: 10,
          px: 3,
        }}
      >
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Typography variant="h4" paragraph color="primary">
            Присоединяйтесь к большому числу создателей 3D моделей
          </Typography>

          <Typography paragraph>
            Получайте вдохновение. Продемонстрируйте свои навыки. Учитесь у
            участников сообщества.
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 5 }}>
          {!productsLoading &&
            products?.data.slice(0, 12).map((product: IProduct, i: number) => (
              <Grid item key={i} xs={12} sm={6} md={4} lg={3} xl={2}>
                <ProductCard product={product} />
              </Grid>
            ))}
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(openSignInDialog())}
        >
          Присоединиться к FetchFab
        </Button>
      </Box>

      <Container id="advantages" sx={{ textAlign: "center", my: 10 }}>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" paragraph color="secondary.main">
            Загружайте и находите любые 3D-модели
          </Typography>
          <Typography paragraph>
            Найдите всё: от низкополигональных объектов до анимированных ригов и
            цифровых сканов для ваших 3D проектов, а также проектов виртуальной
            (VR) и дополненной (AR) реальности.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <img src="/static/images/Work_On_Devices.png" width="100%" />
            <Typography variant="h6" paragraph>
              Что видите, то и получаете
            </Typography>
            <Typography paragraph>
              Работает со всеми операционными системами, браузерами и
              устройствами.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <img src="/static/images/Man_Thinking.png" width="100%" />
            <Typography variant="h6" paragraph>
              Всё, что вы ищите
            </Typography>
            <Typography paragraph>
              От низкополигональных 3D объектов для видеоигр до
              фотограмметрических сканов, 3D модели из всех возможных категорий.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <img src="/static/images/Modern_Standarts.png" width="100%" />
            <Typography variant="h6" paragraph>
              Современные технические стандарты
            </Typography>
            <Typography paragraph>
              PBR материалы, анимированные риги и многое другое в универсальном
              формате.
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            py: 3,
            my: 5,
            color: "main.secondary",
            display: "flex",
            justifyContent: "center",
            textAlign: "left",
            borderRadius: "0.25rem",
            boxShadow: "0 11px 20px 0 rgba(34,34,34,.1)",
          }}
          px={{ xs: 3, sm: 10 }}
        >
          <CategoryMenu categories={categories} columns={3} />
        </Box>

        <Link to={PRODUCTS_ROUTE + POPULAR_ROUTE}>
          <Button variant="contained" color="secondary">
            Посмотреть модели
          </Button>
        </Link>
      </Container>
    </>
  );
};

export default LandingPage;
