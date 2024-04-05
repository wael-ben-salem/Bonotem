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

import HorizontalLayout from "../Layout/HorizontalLayout/index";
import { AuthProtected } from "./AuthProtected";
import {AuthAdminProtected} from "./AuthAdminProtected";
import { authProtectedRoutes,authAdminProtectedRoutes, publicRoutes } from "./routes";

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



const Index = () => {

  const { layoutType } = useSelector((state) => ({
    layoutType: state.Layout.layoutType,
  }));
  const { AdminlayoutType } = useSelector((state) => ({
    AdminlayoutType: state.Layout.AdminlayoutType,
  }));

  const Layout = getLayout(layoutType);
  const AdminLayout = getAdminLayout(AdminlayoutType);


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
    </Routes>
  );
};

export default Index;
