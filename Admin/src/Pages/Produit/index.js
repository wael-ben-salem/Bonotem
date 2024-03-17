import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {   AlternativePagination } from './datatableCom';

const DataTables = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Datatables" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h5 className="card-title mb-0">Gestion Produit</h5>
                                </CardHeader>
                                <CardBody>

                                    <AlternativePagination />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>




                </Container>
            </div>
        </React.Fragment>
    );
};

export default DataTables;
