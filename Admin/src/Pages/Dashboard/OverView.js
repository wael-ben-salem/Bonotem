import React from 'react';
import LineColumnArea from './LineColumnArea';
import { useSelector } from "react-redux";
import { Card, CardBody, Col, Row } from "reactstrap";

const OverView = () => {
    const id = useSelector(state => state.login.user.id);
    const totalAchat = useSelector(state => state.gitVenteStatique.totalAchat);
    const totalVentes = useSelector(state => state.gitVenteStatique.totalVentes);

    return (
        <Col xl={8}>
            <Card>
                <CardBody>
                    <div>
                    <h5 className="card-title mb-3">Ventes</h5>

                        <LineColumnArea id={id} />
                    </div>
                </CardBody>
                <CardBody className="border-top">
                    <div className="text-center">
                        <h5 className="mb-4">Résumé des Ventes</h5>
                        <Row className="mb-3">
                            <Col md={6} className="border-end">
                                <div>
                                    <p className="mb-2 text-danger">Total des ventes</p>
                                    <h5 className="font-size-16 mb-0">{(totalAchat || 0).toFixed(2)} TND</h5>

                                </div>
                            </Col>
                            <Col md={6}>
                                <div>
                                    <p className="mb-2 text-primary">Quantité Total des Ventes</p>
                                    <h5 className="font-size-16 mb-0">{totalVentes ||0}</h5>
                                </div>
                            </Col>
                        </Row>
                        {/* Ajoutez ici d'autres informations si nécessaire */}
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default OverView;
