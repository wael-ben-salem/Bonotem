import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardImg, CardTitle, CardText, Col, Row } from 'reactstrap';
import { getAllCarteStatiqueData } from '../../store/user/gitCarteStatiqueSlice';

const CarteRestaurant = () => {
  const dispatch = useDispatch();
  const { cartesDetails, loading, error } = useSelector(state => state.gitCarteStatique);
  const userId = useSelector(state => state.login.user.id);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4; // Réduisez le nombre d'éléments par page pour mieux s'adapter à la mise en page

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
    marginBottom: '20px', // Augmentez la marge inférieure pour l'espacement entre les cartes
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', // Ajoutez une ombre pour une apparence plus esthétique
    transition: '0.3s', // Ajoutez une transition pour une interaction plus douce
    borderRadius: '8px', // Arrondissez les coins de la carte
  };

  const cardImgStyle = {
    height: '150px', // Ajustez la hauteur de l'image
    objectFit: 'cover',
    borderTopLeftRadius: '8px', // Arrondissez uniquement les coins supérieurs
    borderTopRightRadius: '8px',
  };

  const cardBodyStyle = {
    padding: '10px', // Ajoutez un remplissage à l'intérieur du corps de la carte
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
