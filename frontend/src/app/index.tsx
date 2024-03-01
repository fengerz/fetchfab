import "./styles/index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Header } from "../widgets/header";
import { Box, CircularProgress, Stack } from "@mui/material";
import Footer from "../shared/ui/Footer";
import AppRouter from "../pages";
import { AuthDialog } from "../widgets/auth-dialog";
import { useAuthQuery } from "../entities/user";
import Toast from "../shared/ui/Toast";
import { ProductUploadProcess } from "../processes/product-upload";
import { useState } from "react";

function App() {
  const { isLoading: loading } = useAuthQuery("");

  const [showUploadDialog, setShowUploadDialog] = useState<boolean>(false);

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Header openUpload={() => setShowUploadDialog(true)} />

      <Stack
        direction="column"
        sx={{
          minHeight: "calc(100vh - 65px)",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <AppRouter />
        </Box>

        <Footer />
      </Stack>

      <ProductUploadProcess
        open={showUploadDialog}
        onClose={() => setShowUploadDialog(false)}
        handleOpen={() => setShowUploadDialog(true)}
      />

      <AuthDialog />

      <Toast />
    </>
  );
}

export default App;
