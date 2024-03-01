import {
  CATEGORY_ROUTE,
  COLLECTIONS_ROUTE,
  LANDING_ROUTE,
  LIKES_ROUTE,
  LOGIN_ROUTE,
  MODELS_ROUTE,
  NOT_FOUND_ROUTE,
  POPULAR_ROUTE,
  PRODUCTS_ROUTE,
  REGISTRATION_ROUTE,
  SEARCH_ROUTE,
  TAG_ROUTE,
} from "./consts";
import LandingPage from "../../pages/home/LandingPage";
import AuthPage from "../../pages/auth/AuthPage";
import ProductPage from "../../pages/product/ProductPage";
import ProductsPage from "../../pages/product/ProductsPage";
import UserPage from "../../pages/user/UserPage";
import NotFoundPage from "../../pages/home/NotFoundPage";

export const PUBLIC_ROUTES = [
  {
    path: LANDING_ROUTE,
    Component: LandingPage,
  },
  {
    path: LOGIN_ROUTE,
    Component: AuthPage,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: AuthPage,
  },
  {
    path: SEARCH_ROUTE,
    Component: ProductsPage,
  },
  {
    path: PRODUCTS_ROUTE,
    Component: ProductsPage,
  },
  {
    path: PRODUCTS_ROUTE + POPULAR_ROUTE,
    Component: ProductsPage,
  },
  {
    path: PRODUCTS_ROUTE + "/:slug",
    Component: ProductPage,
  },
  {
    path: PRODUCTS_ROUTE + CATEGORY_ROUTE + "/:slug",
    Component: ProductsPage,
  },
  {
    path: TAG_ROUTE + "/:tag",
    Component: ProductsPage,
  },
  {
    path: "/:username",
    Component: UserPage,
  },
  {
    path: "/:username" + MODELS_ROUTE,
    Component: UserPage,
  },
  {
    path: "/:username" + COLLECTIONS_ROUTE,
    Component: UserPage,
  },
  {
    path: "/:username" + COLLECTIONS_ROUTE + "/:slug",
    Component: UserPage,
  },
  {
    path: "/:username" + LIKES_ROUTE,
    Component: UserPage,
  },
  {
    path: NOT_FOUND_ROUTE,
    Component: NotFoundPage,
  },
];
