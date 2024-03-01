import { FC, useState } from "react";
import { IProduct } from "../../../../shared/api/IProduct";
import { Button } from "@mui/material";
import { FileDownloadOutlined } from "@mui/icons-material";
import { useDownloadProduct } from "../api/downloadProduct";

type DownloadButtonProps = {
  product: IProduct;
  isLoading: boolean;
};

export const ProductDownloadButton: FC<DownloadButtonProps> = ({
  product,
  isLoading,
}) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const { downloadProduct } = useDownloadProduct();

  const downloadHandle = async () => {
    setDisabled(true);

    const url = await downloadProduct(product);

    if (url) {
      const link = document.createElement("a");
      link.href = url;
      link.download = product.slug + ".glb";
      link.click();
    }

    setDisabled(false);
  };

  return (
    <Button
      startIcon={<FileDownloadOutlined />}
      onClick={downloadHandle}
      disabled={isLoading || disabled}
    >
      Скачать 3D модель
    </Button>
  );
};
