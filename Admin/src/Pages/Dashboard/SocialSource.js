import React, { useEffect } from "react";
import RadialChart from "./RadialChart";
import { Card, CardBody, Col, Row } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllChiffreDaffaireData } from "../../store/chiffredaffaire/gitChiffreDaffaireSlice";

const SocialSource = () => {
  const id = useSelector(state => state.login.user.id);

  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatchez l'action pour charger les données initiales
    dispatch(getAllChiffreDaffaireData(id)); // Remplacez yourUserId par l'ID approprié
  }, [dispatch,id]); // Utilisez dispatch comme dépendance pour éviter les avertissements du linter

  const {
    montant_total,
    chiffre_total,
    totalchargefix,
    totalchargevariable,
    benefice,
    loading,
    error,
  } = useSelector((state) => state.gitChiffreDaffaire);

  const SocialSourceData = [
    { title: " Charges Fixes", count: totalchargefix, bgcolor: "info", icon: "bx bx-money" },
    { title: " Charges Variables", count: totalchargevariable, bgcolor: "success", icon: "bx bx-money" },
    { title: " Total des ventes", count: chiffre_total, bgcolor: "warning", icon: "bx bx-line-chart" },
    { title: "Bénéfice", count: benefice, bgcolor: "dark", icon: "bx bx-dollar" },
  ];

  return (
    <React.Fragment>
      <Col xl={4}>
        <Card>
          <CardBody>
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
              </div>
              <div className="flex-shrink-0">
                
              </div>
            </div>
            {/* Pass data to RadialChart */}
            <RadialChart
              totalchargefix={totalchargefix}
              totalchargevariable={totalchargevariable}
              chiffre_total={chiffre_total}
              benefice={benefice}
            />
            <Row>
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error: {error}</div>
              ) : (
                SocialSourceData.map((item, key) => (
                  <div key={key} className="col-6">
                    <div className="social-source text-center mt-3">
                      <div className="avatar-xs mx-auto mb-3">
                        <span className={"avatar-title rounded-circle font-size-18 bg-" + item.bgcolor}>
                          <i className={item.icon + " text-white"}></i>
                        </span>
                      </div>
                      <h5 className="font-size-15">{item.title}</h5>
                      <p className="text-muted mb-0">{item.count}</p>
                    </div>
                  </div>
                ))
              )}
            </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default SocialSource;
