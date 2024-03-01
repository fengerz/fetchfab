import { FC, ReactElement } from "react";
import { Grid } from "@mui/material";
import MenuLink from "../../../shared/ui/MenuLink";
import { ICategory } from "../../../shared/api/ICategory";
import { CATEGORY_ROUTE, PRODUCTS_ROUTE } from "../../../shared/config/consts";
import {
  AcUnit,
  AccountBalance,
  Apartment,
  BugReport,
  Diamond,
  DirectionsCar,
  Explore,
  Headphones,
  Light,
  LocalFlorist,
  LocalPizza,
  Memory,
  Newspaper,
  Radar,
  SportsBaseball,
  TagFaces,
  WbSunny,
  Woman,
} from "@mui/icons-material";

type CategoryMenuProps = {
  categories: ICategory[];
  columns?: number;
  onClick?: () => void;
};

export const CategoryMenu: FC<CategoryMenuProps> = ({
  categories,
  columns = 2,
  onClick,
}) => {
  const limit = categories?.length / columns;

  const categoryIcons: Record<string, ReactElement> = {
    "art-i-abstrakciya": <AcUnit fontSize="small" />,
    arhitektura: <Apartment fontSize="small" />,
    "eda-i-napitki": <LocalPizza fontSize="small" />,
    "zhivotnye-i-pitomcy": <BugReport fontSize="small" />,
    "kulturnoe-nasledie": <AccountBalance fontSize="small" />,
    lyudi: <TagFaces fontSize="small" />,
    mashiny: <DirectionsCar fontSize="small" />,
    "mebel-i-dom": <Light fontSize="small" />,
    "mesta-i-puteshestviya": <WbSunny fontSize="small" />,
    "moda-i-stil": <Diamond fontSize="small" />,
    muzyka: <Headphones fontSize="small" />,
    "nauka-i-tehnologii": <Explore fontSize="small" />,
    "novosti-i-politika": <Newspaper fontSize="small" />,
    "oruzhie-i-tehnika": <Radar fontSize="small" />,
    personazhi: <Woman fontSize="small" />,
    "priroda-i-rasteniya": <LocalFlorist fontSize="small" />,
    "sport-i-fitness": <SportsBaseball fontSize="small" />,
    "elektronika-i-gadzhety": <Memory fontSize="small" />,
  };

  return (
    <>
      <Grid container justifyContent={{ xs: "start", sm: "center" }}>
        {Array(columns)
          .fill(0)
          .map((_, i) => (
            <Grid
              item
              lg={12 / columns}
              key={i}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              {categories
                ?.slice((i + 1) * limit - limit, (i + 1) * limit)
                .map((category: ICategory) => (
                  <MenuLink
                    key={category?.slug}
                    onClick={onClick}
                    text={category?.title}
                    icon={categoryIcons[category.slug]}
                    link={
                      PRODUCTS_ROUTE + CATEGORY_ROUTE + "/" + category?.slug
                    }
                  />
                ))}
            </Grid>
          ))}
      </Grid>
    </>
  );
};
