import { Box, Typography } from "@mui/material";
import { IComment } from "../../../shared/api/IComment";
import { FC } from "react";
import { dateTimeFormat } from "../../../shared/lib/dateTimeFormat";
import { Link } from "react-router-dom";
import { UserAvatar } from "../../user";

type CommentCardProps = {
  comment: IComment;
  productOwnerId: number;
};

export const CommentCard: FC<CommentCardProps> = ({
  comment,
  productOwnerId,
}) => {
  return (
    <Box sx={{ display: "flex", my: 2, flexGrow: 1 }}>
      <Link to={"/" + comment?.user.name}>
        <UserAvatar user={comment?.user} width={40} heigth={40} />
      </Link>

      <Box sx={{ ml: 1.5 }}>
        <Box
          sx={{
            height: 40,
            lineHeight: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Link to={"/" + comment?.user.name}>
            <Typography component="span" sx={{ fontWeight: 700 }}>
              {comment?.user.name}
            </Typography>
          </Link>

          <Box>
            {productOwnerId === comment.user.id && (
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                sx={{ backgroundColor: "lightyellow", mr: 1 }}
              >
                Автор
              </Typography>
            )}

            <Typography component="span" variant="body2" color="text.secondary">
              {dateTimeFormat(comment?.created_at)}
            </Typography>
          </Box>
        </Box>

        <Typography sx={{ mt: 1 }}>{comment?.text}</Typography>
      </Box>
    </Box>
  );
};
