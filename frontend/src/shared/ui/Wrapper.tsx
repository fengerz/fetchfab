import { Container } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC, ReactNode, CSSProperties } from "react";

interface WrapperProps {
  children: ReactNode;
  style?: CSSProperties;
}

const Wrapper: FC<WrapperProps> = ({ children, style }) => {
  return (
    <Container maxWidth={false} sx={{ py: 3, bgcolor: grey[50] }} style={style}>
      {children}
    </Container>
  );
};

export default Wrapper;
