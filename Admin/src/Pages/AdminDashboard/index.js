import React from "react";
import AdminPanel from "./AdminPanel";
import AdminOrderStatus from "./AdminOrderStatus";
import AdminNotifications from "./AdminNotifications";
import AdminSocialSource from "./AdminSocialSource";
import AdminOverView from "./AdminOverView";
import AdminRevenueByLocation from "./AdminRevenueByLocation";
import AdminLatestTransation from "./AdminLatestTransation";

import { Row, Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const Dashboard = () => {
  document.title = "Dashboard | Upzet - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Upzet" breadcrumbItem="Dashboard" />
          {/* User Panel Charts */}
          <AdminPanel />

          <Row>
            {/* Overview Chart */}
            <AdminOverView />
            {/* Social Source Chart */}
            <AdminSocialSource />
          </Row>

          <Row>
            {/* Order Stats */}
            <AdminOrderStatus />
            {/* Notifications */}
            <AdminNotifications />
            {/* Revenue by Location Vector Map */}
            <AdminRevenueByLocation />
          </Row>

          {/* Latest Transaction Table */}
          <AdminLatestTransation />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
