import {
  Box,
  Button,
  Container,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { UserAvatar } from "../../entities/user";
import { IUser } from "../../shared/api/IUser";
import { dateFormat } from "../../shared/lib/dateFormat";
import { useAppSelector } from "../../shared/hooks/redux";
import { UserEditDialog } from "../user-edit";
import { useParams } from "react-router-dom";

type UserDetailsProps = {
  user: IUser;
  isLoading: boolean;
};

export const UserDetails: FC<UserDetailsProps> = ({ user, isLoading }) => {
  const { username } = useParams();

  const { currentUser } = useAppSelector((state) => state.user);

  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          py: 5,
          background: "#000 url('/static/pattern.png')",
          backgroundSize: "cover",
        }}
      >
        <Container maxWidth="xl">
          <Stack direction="row" spacing={3}>
            {isLoading ? (
              <Skeleton variant="rounded" width={100} height={100} />
            ) : (
              <Box sx={{ boxShadow: "0 1px 1px rgba(0,0,0,.3)" }}>
                <UserAvatar user={user} width={100} heigth={100} />
              </Box>
            )}

            <Stack justifyContent="space-between">
              <Box
                sx={{ color: "white", textShadow: "rgba(0,0,0,.5) 1px 1px 0" }}
              >
                <Typography variant="h5">
                  {isLoading ? (
                    <Skeleton component="span" width={200} />
                  ) : (
                    user?.name
                  )}
                </Typography>

                <Typography variant="body2">
                  {isLoading ? (
                    <Skeleton component="span" width={200} />
                  ) : (
                    `Участник с ${dateFormat(user?.created_at)}`
                  )}
                </Typography>
              </Box>

              {username === currentUser?.name && (
                <Button
                  variant="contained"
                  size="small"
                  sx={{ boxShadow: "0 1px 1px rgba(0,0,0,.3)" }}
                  onClick={() => setEditOpen(true)}
                >
                  Редактировать
                </Button>
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>

      <UserEditDialog open={editOpen} onClose={() => setEditOpen(false)} />
    </>
  );
};
