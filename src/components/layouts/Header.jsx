import React from 'react';
import { Row } from "reactstrap";

import HeaderRight from './Header/HeaderRight';

export const Header = () => {
  return (
    <header className='page-header'>
      <Row className='header-wrapper m-0'>
        <HeaderRight />
      </Row>
    </header>
  );
}
