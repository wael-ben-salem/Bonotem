import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, ListGroup, ListGroupItem, Col, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFournisseur } from '../../store/fournisseur/gitFournisseurSlice';

const Notifications = () => {
  const dispatch = useDispatch();
  const fournisseurs = useSelector(state => state.gitFournisseur.fournisseurs);
  const id = useSelector(state => state.login.user.id);

  const [currentPage, setCurrentPage] = useState(0);
  const [visiblePhoneIndex, setVisiblePhoneIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 4;

  const filteredFournisseurs = fournisseurs.filter(fournisseur =>
    fournisseur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fournisseur.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredFournisseurs.length / itemsPerPage);

  const paginateFournisseur = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredFournisseurs.slice(startIndex, endIndex);
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (id) {
      dispatch(getAllFournisseur(id));
    }
  }, [dispatch, id]);

  return (
    <React.Fragment>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-390px' }}>

      <Col xl={4}>
        <Card>
          <CardBody>
            <h5 className="card-title mb-3">Fournisseurs</h5>
            <div>
              <div className="mb-2">
                <input
                  className="search form-control"
                  placeholder="Rechercher"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="mx-n3">
                <ListGroup className="list mb-0" flush>
                  {paginateFournisseur().map((fournisseur, index) => (
                    <ListGroupItem key={fournisseur.id}>
                      <div className="d-flex align-items-center pagi-list">
                        <div className="flex-shrink-0 me-3">
                          <div>
                            {fournisseur.photo ? (
                              <img
                                className="avatar-xs rounded-circle"
                                alt={fournisseur.nom}
                                src={`${fournisseur.photo.replace('fournisseurs', '')}`}
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              "Pas de photo"
                            )}
                          </div>
                        </div>
                        <div className="flex-grow-1 overflow-hidden">
                          <h5 className="fs-14 mb-1">
                            <Link to="#" className="link text-dark">{fournisseur.nom}</Link>
                          </h5>
                          <p className="born timestamp text-muted mb-0">{fournisseur.email}</p>
                          {visiblePhoneIndex === index && (
                            <div className="mt-2">
                              <span className="badge bg-light">{fournisseur.num_telephone && `+216 ${fournisseur.num_telephone}`}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-shrink-0 ms-2">
                          <Button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => setVisiblePhoneIndex(visiblePhoneIndex === index ? null : index)}
                          >
                            <i className="ri-phone-line align-bottom"></i>
                          </Button>
                        </div>
                      </div>
                    </ListGroupItem>
                  ))}
                </ListGroup>
                <div className="d-flex justify-content-center">
                  <ul className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li key={index} className={`page-item ${currentPage === index ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => changePage(index)}>{index + 1}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
      </div>
    </React.Fragment>
  );
};

export default Notifications;
