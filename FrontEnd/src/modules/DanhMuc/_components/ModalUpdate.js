import {
  DeleteOutlined,
  SaveOutlined,
  StopOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, Space, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setmodalUpdate, setListCategory } from '../_store/categorySlice';
import { openNotificationWithIcon } from '../../../helpers/funcs';
import { updateProduct } from '../_api';

const ModalUpdate = () => {
  const modalUpdate = useSelector((state) => state.category.modalUpdate);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [filePath, setFilePath] = useState();
  const [codeProductState, setCodeProductState] = useState();
  const [productNameState, setProductNameState] = useState(
    modalUpdate.productName
  );
  const [priceCapitalState, setPriceCapitalState] = useState(
    modalUpdate.priceCapital
  );
  const [priceSellState, setPriceSellState] = useState(modalUpdate.priceSell);
  const [inventoryState, setInventoryState] = useState(modalUpdate.inventory);
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const handelcancel = () => {
    dispatch(setmodalUpdate(false));
  };

  useEffect(() => {
    const {
      codeProduct,
      productName,
      priceCapital,
      priceSell,
      inventory,
      filePath,
    } = modalUpdate;
    setCodeProductState(codeProduct);
    setProductNameState(productName);
    setPriceCapitalState(priceCapital);
    setPriceSellState(priceSell);
    setInventoryState(inventory);
    setFilePath(filePath);

    form.setFieldsValue({
      codeProduct: codeProduct,
      productName: productName,
      priceCapital: priceCapital,
      priceSell: priceSell,
      inventory: inventory,
    });
  }, [modalUpdate]);

  // dữ liệu form
  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Click show modal ảnh
  const handleCancelImg = () => setPreviewVisible(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  // hiển thị dữ liệu modal ảnh
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList[0].status == 'done') {
      const link = newFileList[0].response.filePath.split('\\')[1];
      setFilePath(`http://localhost:3000/${link}`);
    } else if (newFileList[0].status == 'error') {
      openNotificationWithIcon(
        'error',
        'Upload ảnh thất bại, vui lòng thử lại!'
      );
    }
  };

  //xử lý sự kiện các btn ở modal
  const uploadButton = (
    <div>
      <div className="btn-upload">
        <UploadOutlined /> Cập nhật ảnh sản phẩm
      </div>
    </div>
  );

  const handleSubmitUpdate = () => {
    updateProduct({
      codeProduct: codeProductState,
      productName: productNameState,
      priceCapital: priceCapitalState,
      priceSell: priceSellState,
      inventory: inventoryState,
      filePath,
    })
      .then((res) => {
        if (res.data.success) {
          dispatch(setListCategory(res.data.listCategory));
          openNotificationWithIcon('success', res.data.message);
          handelcancel();
        } else {
          openNotificationWithIcon('error', res.data.message);
        }
      })
      .catch(() =>
        openNotificationWithIcon(
          'error',
          'Có lỗi xảy ra, xin vui lòng thử lại!'
        )
      );
  };

  return (
    <>
      <Modal
        width={800}
        visible={modalUpdate.view}
        footer={null}
        title="Cập nhật Sản phẩm"
        onCancel={handelcancel}
      >
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Row>
            <Col span={8}>
              <div
                style={{ width: '100%', height: '200px', marginBottom: '12px' }}
              >
                <img
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  src={filePath}
                />
              </div>
              <Upload
                action="http://localhost:3000/api/good/uploadIMG"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                maxCount={1}
                className="d-flex-center"
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancelImg}
              >
                <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  src={previewImage}
                />
              </Modal>
            </Col>

            <Col span={16}>
              <Form.Item
                name="productName"
                label="Tên sản phẩm"
                rules={[{ required: true, message: 'Tên sản phẩm bắt buộc' }]}
              >
                <Input onChange={(e) => setProductNameState(e.target.value)} />
              </Form.Item>
              <Form.Item
                name="priceCapital"
                label="Giá nhập"
                rules={[{ required: true, message: 'Giá nhập bắt buộc' }]}
              >
                <Input onChange={(e) => setPriceCapitalState(e.target.value)} />
              </Form.Item>
              <Form.Item
                name="priceSell"
                label="Giá bán"
                rules={[{ required: true, message: 'Giá bán bắt buộc' }]}
              >
                <Input onChange={(e) => setPriceSellState(e.target.value)} />
              </Form.Item>
              <Form.Item
                name="inventory"
                label="Số lượng"
                rules={[
                  { required: true, message: 'Số lượng sản phẩm bắt buộc' },
                ]}
              >
                <Input onChange={(e) => setInventoryState(e.target.value)} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item {...tailLayout}>
            <Space
              size="middle"
              className="d-flex"
              style={{ flexDirection: 'row-reverse' }}
            >
              <Button
                onClick={() => handelcancel()}
                className="font-weight-bold"
                style={{ padding: '0 32px' }}
                icon={<StopOutlined />}
              >
                Hủy
              </Button>

              <Button
                htmlType="button"
                onClick={onReset}
                icon={<DeleteOutlined />}
              >
                Reset
              </Button>
              <Button
                className="font-weight-bold"
                onClick={() => handleSubmitUpdate()}
                style={{
                  background: '#4bac4d',
                  border: 'none',
                  padding: '0 32px',
                }}
                htmlType="submit"
                type="primary"
                icon={<SaveOutlined />}
              >
                Cập nhật
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalUpdate;
