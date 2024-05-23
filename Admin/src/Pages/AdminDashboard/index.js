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
  document.title = "Bonotem";
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
          </Row>

          
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
