// Default routes for the application

const routes = {
  home: "/",
  about: "/about",
  contact: "/contact",
  dashboard: "/dashboard",
  login: "/login",
  register: "/register",
  products: "/products",
  productDetail: (id: string | number) => `/products/${id}`,
};

export default routes;
