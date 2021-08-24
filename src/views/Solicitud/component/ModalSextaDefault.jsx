import React, { memo } from "react";
import PropType from "prop-types";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalSexta = memo(
  ({ isOpen, title, children, componentFooter, ...rest }) => {
    return (
      <Modal isOpen={isOpen} {...rest}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        {componentFooter && (
          <ModalFooter className="justify-content-between">
            {componentFooter}
          </ModalFooter>
        )}
      </Modal>
    );
  }
);

ModalSexta.propType = {
  isOpen: PropType.bool.isRequired,
  title: PropType.string.isRequired,
  children: PropType.node,
};

export default ModalSexta;
