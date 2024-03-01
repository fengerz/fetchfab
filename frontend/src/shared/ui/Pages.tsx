import { ChangeEvent, FC } from "react";
import { Box, Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { IMeta } from "../api/IMeta";

type PagesProps = {
  meta: IMeta;
  isLoading: boolean;
};

const Pages: FC<PagesProps> = ({ meta, isLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (_event: ChangeEvent<unknown>, page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  return (
    <>
      {meta.last_page > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          {!isLoading && (
            <Pagination
              count={meta?.last_page}
              page={meta?.current_page || 1}
              color="primary"
              onChange={handleChange}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default Pages;
