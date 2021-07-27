import React from 'react';

import { Container, Row, Col } from "reactstrap";

import PortadaImageFile from "../../assets/images/login/portada.jpg";

export const LoginPage = () => {
  return (
    <>
      <Container fluid={true}>
        <Row>
          <Col xl="7" className='b-center bg-size'
            style={{
              backgroundImage:`url(${PortadaImageFile})`,
              backgroundSize:"cover",
              backgroundPosition:"center",
              display: "block"
            }}
          >
            <img className='bg-img-cover bg-center'
              src={PortadaImageFile} alt='loginPage'
              style={{
                display:"none"
              }}
            />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}