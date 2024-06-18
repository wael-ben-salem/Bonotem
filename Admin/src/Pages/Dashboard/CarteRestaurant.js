import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardImg, CardTitle, CardText, Col, Row, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
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

  const totalPages = Math.ceil(Object.keys(cartesDetails).length / itemsPerPage);

  const paginateCategories = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return Object.entries(cartesDetails).slice(startIndex, endIndex);
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const paginatedCategories = paginateCategories();

  const cardStyle = {

    marginBottom: '20px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    borderRadius: '8px',
    overflow: 'hidden',
    transform: 'scale(1)',
    transition: 'transform 0.3s ease-in-out',
  };

  const cardHoverStyle = {
    transform: 'scale(1.05)',
  };

  const cardImgStyle = {
    height: '200px',
    objectFit: 'cover',
    borderTopLeftRadius: '8px',

    borderTopRightRadius: '8px',
  };

  const cardBodyStyle = {

    padding: '15px',
    textAlign: 'center',

  };

  const renderPagination = () => (
    <Pagination>
      <PaginationItem disabled={currentPage <= 0}>
        <PaginationLink onClick={() => changePage(currentPage - 1)} previous />
      </PaginationItem>
      {Array.from({ length: totalPages }, (_, index) => (
        <PaginationItem key={index} active={index === currentPage}>
          <PaginationLink onClick={() => changePage(index)}>
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={currentPage >= totalPages - 1}>
        <PaginationLink onClick={() => changePage(currentPage + 1)} next />
      </PaginationItem>
    </Pagination>
  );

  return (
    <>
      <Row>
        {paginatedCategories.map(([nom, details]) => (
          <Col md={3} key={details.nom} className="d-flex align-items-stretch">
            <Card style={{ ...cardStyle, ...(cardHoverStyle) }}>
              <CardImg top src={details.photo.replace('categories', '')} alt={details.nom} style={cardImgStyle} />
              <CardBody style={cardBodyStyle}>
                <CardTitle tag="h5">{details.nom || ''}</CardTitle>
                <CardText><strong>Prix TTC:</strong> {details.prixTTc.toFixed(2)}TND</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="mt-4">
        <Col className="d-flex justify-content-center">
          {renderPagination()}
        </Col>
      </Row>
    </>
  );
};

export default CarteRestaurant;
