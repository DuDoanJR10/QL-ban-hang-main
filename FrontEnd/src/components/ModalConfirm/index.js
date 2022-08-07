import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

const ModalConfirm = (props) => {
  const { handleCancel, visible, title, width, handleOk, type } = props;

  return (
    <>
      <Modal
        onOk={handleOk}
        onCancel={handleCancel}
        title={title}
        visible={visible}
        className="order__modal-cancel"
        width={width} //400
        okText={'Đồng ý'}
        okType={type}
        cancelText={'Hủy'}
      >
        {props.children}
      </Modal>
    </>
  );
};

ModalConfirm.propTypes = {
  visible: PropTypes.bool,
  toggleModal: PropTypes.func,
  title: PropTypes.string,
  width: PropTypes.number,
  children: PropTypes.node.isRequired,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
  type: PropTypes.string,
};
ModalConfirm.defaultProps = {
  visible: false,
  toggleModal: () => {},
  title: '',
  width: 630,
  handleOk: () => {},
  type: 'primary',
};

export default React.memo(ModalConfirm);
