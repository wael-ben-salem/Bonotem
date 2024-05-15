import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllUserStatiqueData } from '../../store/user/gitUserStatitqueSlice';
import { Card, CardBody, Col, Row } from 'reactstrap';
import RadialChart1 from './AdminpanelChart1';
import RadialChart2 from './AdminpanelChart2';
import RadialChart3 from './AdminpanelChart3';

const UserPanel = ({ userStatistics, fetchUserStatistics }) => {
  useEffect(() => {
    fetchUserStatistics();
  }, [fetchUserStatistics]);

  const { totalRestaurateurs, totalManagers, totalAmountManagers, best_manager_name, num_users_by_best_manager } = userStatistics;

  return (
    <React.Fragment>
      <Row>
        <Col xl={3} sm={6}>
          <Card>
            <CardBody style={{ backgroundColor: 'white', padding: '20px' }}>
            <br></br>

              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-1" className="apex-charts" dir="ltr">
                    <RadialChart1 value={totalRestaurateurs} />
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Nombre Total des Restaurateurs</p>
                  <h5 className="mb-3">{totalRestaurateurs}<i className="ri-group-line" ></i></h5>
                  {/* Additional statistics */}
                </div>
              </div>
              <br></br>
              
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
          <Card>
            <CardBody style={{ backgroundColor: 'white', padding: '20px' }}>
            <br></br>

              <div className="d-flex">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <RadialChart2 value={totalManagers} className="apex-charts" dir="ltr" />
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Nombre Total des Managers</p>
                  <h5 className="mb-3">{totalManagers}<i className="ri-group-line" ></i></h5>
                  {/* Additional statistics */}
                </div>
              </div>
              <br></br>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
          <Card>
            <CardBody style={{ backgroundColor: 'white', padding: '20px' }}>
            <br></br>

              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <RadialChart3 value={totalAmountManagers} className="apex-charts" dir="ltr" />
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Gestionnaires du montant total</p>
                  <h5 className="mb-3">{totalAmountManagers.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</h5>
                  {/* Additional statistics */}
                </div>
              </div>
              <br></br>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
          <Card>
            <CardBody style={{ backgroundColor: 'white',marginTop:'-3px'}}>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div className="avatar-sm">
                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                      <i className="ri-group-line"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1"> Le Manager le plus Actif</p>
                  <h5 className="mb-3">{best_manager_name}</h5>
                  <p className="mb-1">Nombre de Restaurateurs de {best_manager_name} </p>
                  <h5 className="mb-3">{num_users_by_best_manager}</h5>
                  {/* Additional statistics */}
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  userStatistics: state.gitUserStatique // Assuming the slice is named gitUserStatique
});

const mapDispatchToProps = {
  fetchUserStatistics: getAllUserStatiqueData
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);
