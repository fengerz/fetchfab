import { FC } from "react";
import { IUser } from "../../../shared/api/IUser";
import { Avatar } from "@mui/material";

type UserAvatarProps = {
  user: IUser | undefined | null;
  heigth?: number;
  width?: number;
};

export const UserAvatar: FC<UserAvatarProps> = ({
  user,
  heigth = "auto",
  width = "auto",
}) => {
  function stringToColor(string: string) {
    if (string) {
      let hash = 0;
      let i;

      /* eslint-disable no-bitwise */
      for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
      }

      let color = "#";

      for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
      }
      /* eslint-enable no-bitwise */

      return color;
    }
  }

  if (user?.avatar) {
    return (
      <Avatar
        variant="rounded"
        src={user.avatar}
        sx={{ height: heigth, width: width }}
      />
    );
  }

  return (
    <Avatar
      variant="rounded"
      sx={{
        height: heigth,
        width: width,
        bgcolor: stringToColor(user?.name ? user.name : ""),
      }}
    >
      {user?.name && user?.name.charAt(0)}
    </Avatar>
  );
};
