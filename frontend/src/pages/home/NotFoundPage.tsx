import { Typography } from "@mui/material";
import Wrapper from "../../shared/ui/Wrapper";
import { Link } from "react-router-dom";
import { LANDING_ROUTE } from "../../shared/config/consts";
import { useEffect } from "react";

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "Страница не найдена";
  }, []);

  return (
    <Wrapper
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <Typography variant="h5" paragraph>
        Ошибка 404
      </Typography>

      <Typography variant="h5" paragraph>
        Страница не найдена
      </Typography>

      <Link to={LANDING_ROUTE} style={{ borderBottom: "1px solid" }}>
        Вернуться на главную
      </Link>
    </Wrapper>
  );
};

export default NotFoundPage;
