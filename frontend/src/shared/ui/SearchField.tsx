import { FC, useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  Slide,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ChevronRightRounded, Close, Search } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SEARCH_ROUTE } from "../config/consts";
import { useDebounce } from "../hooks/debounce";

type SearchFieldProps = {
  showMobileSearch: boolean;
  handleOpenMobile: () => void;
  handleCloseMobile: () => void;
};

const SearchField: FC<SearchFieldProps> = ({
  showMobileSearch,
  handleOpenMobile,
  handleCloseMobile,
}) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState<string>("");
  const [searchVisible, setSearchVisible] = useState<boolean>(showMobileSearch);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const debounced = useDebounce(search);
  const searchQuery = search || searchParams.get("query");

  const isSearchRoute =
    window.location.pathname === SEARCH_ROUTE ||
    window.location.pathname + "/" === SEARCH_ROUTE;

  const handleClean = () => {
    searchParams.delete("query");
    setSearchParams(searchParams);

    setSearch("");
  };

  const handleRoute = (value: string) => {
    if (value.length >= 3) {
      if (isSearchRoute) {
        searchParams.set("query", value);
        setSearchParams(searchParams);
      } else {
        navigate(SEARCH_ROUTE + "?query=" + value);
      }
    }
  };

  const handleOpenSearch = () => {
    handleOpenMobile();

    setSearchVisible(true);
  };

  const handleCloseSearch = () => {
    setSearchVisible(false);

    setTimeout(() => {
      handleCloseMobile();
    }, 250);
  };

  useEffect(() => {
    handleRoute(debounced);
  }, [debounced]);

  return (
    <>
      <Slide
        direction={searchVisible ? "right" : "left"}
        in={searchVisible}
        mountOnEnter
        unmountOnExit
      >
        <IconButton
          sx={{
            display: {
              xs: showMobileSearch ? "inline-flex" : "none",
              sm: "none",
            },
          }}
          onClick={handleCloseSearch}
        >
          <ChevronRightRounded />
        </IconButton>
      </Slide>

      <Slide
        direction={showMobileSearch ? "left" : "down"}
        in={isMobile ? searchVisible : true}
        appear={isMobile}
        mountOnEnter
        unmountOnExit
      >
        <Box
          sx={{
            display: { xs: showMobileSearch ? "block" : "none", sm: "block" },
            width: "100%",
          }}
        >
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            value={searchQuery || ""}
            placeholder="Поиск 3D моделей"
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {searchQuery && (
                    <Close onClick={handleClean} sx={{ cursor: "pointer" }} />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Slide>

      <IconButton
        sx={{
          display: {
            xs: showMobileSearch ? "none" : "inline-flex",
            sm: "none",
          },
        }}
        onClick={handleOpenSearch}
      >
        <Search />
      </IconButton>
    </>
  );
};

export default SearchField;
