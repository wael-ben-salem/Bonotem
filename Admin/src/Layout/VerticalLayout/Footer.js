import React from "react";
import { Container, Row, Col } from "reactstrap";

const Footer = () => {
  const iconStyle = {
    fontSize: '16px', // Smaller size for more subtle icons
    color: 'inherit', // Inherits the color from parent elements, or set specific color
    marginRight: '15px', // Space between icons for better separation
    textDecoration: 'none' // Removes underline from icons
  };

  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col sm={6}>
              {new Date().getFullYear()} © SITEM PARIS.
            </Col>
            <Col sm={6}>
              <div className="text-sm-end d-none d-sm-block">
                <a href="mailto:Contact@ste-sitem.com" style={iconStyle} aria-label="Send email to Contact@ste-sitem">
                  <i className="mdi mdi-email"></i>
                </a>
                <a href="https://www.facebook.com/ste.sitem" style={iconStyle} aria-label="Visit Facebook page">
                  <i className="mdi mdi-facebook"></i>
                </a>
                <a href="https://www.instagram.com/sitem.paris/" style={iconStyle} aria-label="Visit Instagram profile">
                  <i className="mdi mdi-instagram"></i>
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
}

export default Footer;
