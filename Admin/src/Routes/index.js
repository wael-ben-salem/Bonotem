import React from "react";
import { Routes, Route } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

//constants
import { layoutTypes } from "../constants/layout";

// layouts
import NonAuthLayout from "../Layout/NonAuthLayout";
import VerticalLayout from "../Layout/VerticalLayout/index";
import AdminHorizontalLayout from "../AdminLayout/HorizontalAdminLayout/index";
import AdminVerticalLayout from "../AdminLayout/VerticalAdminLayout/index";
import ManagerVerticalLayout from "../ManagerLayout/VerticalManagerLayout/index";
import ManagerHorizontalLayout from "../ManagerLayout/HorizontalManagerLayout/index";


import HorizontalLayout from "../Layout/HorizontalLayout/index";
import { AuthProtected ,AuthAdminProtected, AuthManagerProtected } from "./AuthProtected";
import { authProtectedRoutes,authAdminProtectedRoutes, publicRoutes, authManagerProtectedRoutes } from "./routes";

const getLayout = (layoutType) => {
  let Layout = VerticalLayout;
  switch (layoutType) {
    case layoutTypes.VERTICAL:
      Layout = VerticalLayout;
      break;
    case layoutTypes.HORIZONTAL:
      Layout = HorizontalLayout;
      break;
      case layoutTypes.ADMINVERTICAL:
      Layout = AdminVerticalLayout;
      break;
      case layoutTypes.ADMINHORIZONTAL:
      Layout = AdminHorizontalLayout ;
      break;
    default:
      break;
  }
  return Layout;
};


const getAdminLayout = (AdminlayoutType) => {
  let AdminLayout = AdminVerticalLayout;
  switch (AdminlayoutType) {
      case layoutTypes.ADMINVERTICAL:
        AdminLayout = AdminVerticalLayout;
      break;
      case layoutTypes.ADMINHORIZONTAL:
        AdminLayout = AdminHorizontalLayout ;
      break;
    default:
      break;
  }
  return AdminLayout;
};



const getManagerLayout = (ManagerLayoutType) => {
  let ManagerLayout = ManagerVerticalLayout;
  switch (ManagerLayoutType) {
      case layoutTypes.MANAGERVERTICAL:
        ManagerLayout = AdminVerticalLayout;
      break;
      case layoutTypes.MANAGERHORIZONTAL:
        ManagerLayout = ManagerHorizontalLayout ;
      break;
    default:
      break;
  }
  return ManagerLayout;
};



const Index = () => {

  const { layoutType } = useSelector((state) => ({
    layoutType: state.Layout.layoutType,
  }));
  const { AdminlayoutType } = useSelector((state) => ({
    AdminlayoutType: state.Layout.AdminlayoutType,
  }));
  const { ManagerLayoutType } = useSelector((state) => ({
    ManagerLayoutType: state.Layout.ManagerLayoutType,
  }));

  const Layout = getLayout(layoutType);
  const AdminLayout = getAdminLayout(AdminlayoutType);
  const ManagerLayout = getManagerLayout(ManagerLayoutType);



  return (
    <Routes>
      <Route>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <NonAuthLayout>
                  {route.component}
              </NonAuthLayout>
          }
            key={idx}
            exact={true}
          />
        ))}
      </Route>

      <Route>
          {authProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <AuthProtected>
                    <Layout>{route.component}</Layout>
                </AuthProtected>}
              key={idx}
              exact={true}
            />
            
          ))}
      </Route>
      <Route>
          {authAdminProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <AuthAdminProtected>
                    <AdminLayout>{route.component}</AdminLayout>
                </AuthAdminProtected>}
              key={idx}
              exact={true}
            />
            
          ))}
      </Route>
      <Route>
          {authManagerProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <AuthManagerProtected>
                    <ManagerLayout>{route.component}</ManagerLayout>
                </AuthManagerProtected>}
              key={idx}
              exact={true}
            />
            
          ))}
      </Route>
    </Routes>
  );
};

export default Index;
