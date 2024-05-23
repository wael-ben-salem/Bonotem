import React, { useEffect } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { GiMeal } from 'react-icons/gi';

import RadialChart1 from "./userpanelChart1";
import RadialChart2 from "./userpanelChart2";
import RadialChart3 from "./userpanelChart3";
import { getAllVenteStatiqueData } from "../../store/user/gitVenteStatiqueSlice";

const UserPanel = () => {
  const id = useSelector(state => state.login.user.id);

  const dispatch = useDispatch();

  // Accédez aux données du store Redux
  const meilleurProduit = useSelector(state => state.gitVenteStatique.meilleurProduit);
  const meilleurVenteIngProduit = useSelector(state => state.gitVenteStatique.meilleurVenteIngProduit);
  const meilleurtQuantiteIngProduit = useSelector(state => state.gitVenteStatique.meilleurtQuantiteIngProduit);
  const meilleurtPrixIngProduit = useSelector(state => state.gitVenteStatique.meilleurtPrixIngProduit);
  const totalPerte = useSelector(state => state.gitVenteStatique.totalPerte);
  const totalCout = useSelector(state => state.gitVenteStatique.totalCout);
  const totalMarchandise = useSelector(state => state.gitVenteStatique.totalMarchandise);

  // Utilisez useEffect pour charger les données initiales lorsque le composant est monté
  useEffect(() => {
    // Dispatchez l'action Redux pour charger les données initiales
    dispatch(getAllVenteStatiqueData(id)); // Assurez-vous de passer l'identifiant approprié si nécessaire
  }, [dispatch, id]); // Déclenchez l'effet lorsque le composant est monté

  return (
    <React.Fragment>
      <Row>
        <Col xl={3} sm={6}>
          <Card className="fixed-height-card">
          <CardBody style={{ backgroundColor: 'white', padding: '20px' }}>
          <br></br>

              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-1" className="apex-charts" dir="ltr">
                    <RadialChart1 value={totalPerte || 0} />
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Total des pertes </p>
                  <h5 className="mb-3">{(totalPerte || 0).toFixed(2)} £</h5>
                </div>
              </div>
              <br></br>

            </CardBody>
          </Card>
        </Col>
        <Col xl={3} sm={6}>
          <Card className="fixed-height-card">
          <CardBody style={{ backgroundColor: 'white', padding: '20px' }}>

              <div className="d-flex">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <RadialChart2 value={meilleurtQuantiteIngProduit} />
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Meilleur Vente :{meilleurVenteIngProduit || ''} </p>
                  <p className="mb-1"></p>
                  <h5 className="mb-3">{(meilleurtPrixIngProduit || 0).toFixed(2)} £</h5>
                  <h5 className="mb-2">
                    <GiMeal className="icon" /> {meilleurtQuantiteIngProduit || 0}
                  </h5>
                </div>
              </div>
              <br></br>
            </CardBody>
          </Card>
        </Col>
        <Col xl={3} sm={6}>
          <Card className="fixed-height-card">
          <CardBody style={{ backgroundColor: 'white', padding: '20px' }}>
          <br></br>

              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <RadialChart3 value={totalCout} />
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Total des dépenses et ventilations</p>
                  <h5 className="mb-3">{totalCout} £</h5>
                </div>
              </div>
              <br></br>

            </CardBody>
          </Card>
        </Col>
        <Col xl={3} sm={6}>
          <Card className="fixed-height-card">
          <CardBody style={{ backgroundColor: 'white', padding: '20px' }}>
          <br></br>

              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <RadialChart1 value={totalMarchandise} />
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Total des marchandises</p>
                  <h5 className="mb-3">{(totalMarchandise || 0).toFixed(2)} £</h5>
                </div>
              </div>
              <br></br>

            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default UserPanel;
