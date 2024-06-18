import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardImg, CardTitle, CardText, Col, Row } from 'reactstrap';
import { getAllCarteStatiqueData } from '../../store/user/gitCarteStatiqueSlice';

const CarteRestaurant = () => {
  const dispatch = useDispatch();
  const { cartesDetails, loading, error } = useSelector(state => state.gitCarteStatique);
  const userId = useSelector(state => state.login.user.id);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4; 

  useEffect(() => {
    if (userId) {
      dispatch(getAllCarteStatiqueData(userId));
    }
  }, [dispatch, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(Object.keys(cartesDetails).length / itemsPerPage);

  // Fonction pour diviser les éléments en pages
  const paginateCategories = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return Object.entries(cartesDetails).slice(startIndex, endIndex);
  };

  // Fonction pour changer de page
  const changePage = (page) => {
    setCurrentPage(page);
  };

  const paginatedCategories = paginateCategories();

  // Styles en ligne
  const cardStyle = {
    marginBottom: '20px', 
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', 
    transition: '0.3s', 
    borderRadius: '8px', 
  };

  const cardImgStyle = {
    height: '150px', 
    objectFit: 'cover',
    borderTopLeftRadius: '8px', 
    borderTopRightRadius: '8px',
  };

  const cardBodyStyle = {
    padding: '10px', 
  };

  return (
    <>
      <Row>
        {paginatedCategories.map(([nom, details]) => (
          <Col md={3} key={details.nom}>
            <Card style={cardStyle}>
              <CardImg top src={details.photo.replace('categories', '')} alt={details.nom} style={cardImgStyle} />
              <CardBody style={cardBodyStyle}>
                <CardTitle tag="h5">{details.nom||''}</CardTitle>
                <CardText><strong>Prix TTC:</strong> ${details.prixTTc.toFixed(2)}</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      {/* Pagination */}
      <Row>
        <Col>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index ? 'active' : ''}`}>
                <button className="page-link" onClick={() => changePage(index)}>{index + 1}</button>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </>
  );
};

export default CarteRestaurant;
