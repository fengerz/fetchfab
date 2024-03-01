import { FC, useState } from "react";
import { ProductUploadDialog } from "../../widgets/upload-dialog";
import { ProductCreateDialog } from "../../widgets/product-create";
import { ProductPublishedDialog } from "../../widgets/product-published";
import { IProduct } from "../../shared/api/IProduct";

type ProductUploadProcessProps = {
  open: boolean;
  onClose: () => void;
  handleOpen: () => void;
};

export const ProductUploadProcess: FC<ProductUploadProcessProps> = ({
  open,
  onClose,
  handleOpen,
}) => {
  const [reuploadInit, setReuploadInit] = useState<boolean>(false);
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openPublishedDialog, setOpenPublishedDialog] =
    useState<boolean>(false);

  const [uploadedFile, setUploadedFile] = useState<null | File>(null);
  const [product, setProduct] = useState<null | IProduct>(null);

  const handleUploadClose = () => {
    setReuploadInit(false);
    onClose();
  };

  const handleUploadSubmit = (file: File) => {
    setUploadedFile(file);

    onClose();
    setOpenCreateDialog(true);
  };

  const handleReupload = () => {
    setReuploadInit(true);
    handleOpen();
  };

  const handleCreateClose = () => {
    setOpenCreateDialog(false);
  };

  const handleCreateSubmit = (product: IProduct) => {
    setProduct(product);

    handleCreateClose();
    setReuploadInit(false);
    setOpenPublishedDialog(true);
  };

  const handlePublishedClose = () => {
    setOpenPublishedDialog(false);
  };

  return (
    <>
      <ProductUploadDialog
        open={open}
        onClose={handleUploadClose}
        onSubmit={handleUploadSubmit}
      />

      {uploadedFile && (
        <ProductCreateDialog
          file={uploadedFile}
          open={openCreateDialog}
          reupload={reuploadInit}
          onClose={handleCreateClose}
          onSubmit={handleCreateSubmit}
          handleReupload={handleReupload}
        />
      )}

      {product && (
        <ProductPublishedDialog
          open={openPublishedDialog}
          onClose={handlePublishedClose}
          product={product}
        />
      )}
    </>
  );
};
