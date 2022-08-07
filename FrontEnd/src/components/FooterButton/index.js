import React from 'react';
import {  Space , Divider, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { KEY } from 'modules/Commons/_store/constants';
import PropTypes from 'prop-types';
// const { Text } = Typography;
const FooterButton = (props) => {
  const { t } = useTranslation();
  const {
    handleClickBtn,
    isBtnSave,
    isBtnClose,
    loadingBtn
  } = props;

  return (
    <>
      <Divider />
      <div className="d-flex justify-content-end">
        <Space size={20}>
          {isBtnSave && (
            <>
              <Button
                onClick={handleClickBtn(KEY.SAVE)}
                className="btn btn-blue"
                loading={loadingBtn}
              >
                {t('common.save')}
              </Button>
            </>
          )}
          {isBtnClose && (
            <>
              <Button
                className="btn"
                onClick={handleClickBtn(KEY.CLOSE)}
              >
                {t('common.close')}
              </Button>
            </>
          )}
        </Space>
      </div>
    </>
  
  );
};

FooterButton.propTypes = {
  handleClickBtn: PropTypes.func,
  isBtnSave: PropTypes.bool,
  isBtnClose: PropTypes.bool,
  loadingBtn: PropTypes.bool,
};
FooterButton.defaultProps = {
};

export default React.memo(FooterButton);
