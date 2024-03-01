import { Box, Button, Paper, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux";
import { grey } from "@mui/material/colors";
import { UserAvatar } from "../../entities/user";
import { openSignInDialog } from "../../app/store/appSlice";
import { CreateCommentForm } from "../../features/comment/create";
import { IProduct } from "../../shared/api/IProduct";
import { FC } from "react";

type CommentFormProps = {
  product: IProduct;
  isLoading: boolean;
};

export const CommentCreate: FC<CommentFormProps> = ({ product, isLoading }) => {
  const dispatch = useAppDispatch();
  const { isAuth, currentUser } = useAppSelector((state) => state.user);

  if (!isAuth) {
    return (
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: grey[200],
          py: 5,
          mb: 3,
        }}
      >
        <Typography component="p" variant="h6" paragraph>
          Войдите, чтобы комментировать.
        </Typography>

        <Button
          variant="contained"
          onClick={() => dispatch(openSignInDialog())}
        >
          Войти
        </Button>
      </Paper>
    );
  }

  return (
    <Box sx={{ display: "flex", mb: 3 }}>
      <UserAvatar user={currentUser} width={40} heigth={40} />

      <Box sx={{ width: "100%", ml: 1.5 }}>
        <CreateCommentForm product={product} isLoading={isLoading} />
      </Box>
    </Box>
  );
};
