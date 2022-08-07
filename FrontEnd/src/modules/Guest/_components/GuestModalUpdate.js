import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Space } from 'antd';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setModalUpdate, setFillUpdate, setListGuest } from '../_store/guestSlice';
import { updateGuest } from '../_api';
import { openNotificationWithIcon } from '../../../helpers/funcs'

const GuestModalUpdate = () => {
  const fillterUpdate = useSelector(state => state.guest.fillterUpdate)
  // const listGuest = useSelector(state => state.guest.listGuest)
  
  const modalUpdate = useSelector(state => state.guest.modalUpdate)
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  
  useEffect(() => {
    const { codeGust, nameGust, phoneGust, addressGust } = fillterUpdate
    form.setFieldsValue({ codeGust: codeGust, nameGust: nameGust, phoneGust: phoneGust, addressGust: addressGust })
  }, [fillterUpdate])

  const hanldChangeNameGust = (nameGust) => {
    dispatch(setFillUpdate({ ...fillterUpdate, nameGust }))
  }

  const hanldChangePhoneGust = (phoneGust) => {
    dispatch(setFillUpdate({ ...fillterUpdate, phoneGust }))
  }

  const hanldChangeAddressGust = (addressGust) => {
    dispatch(setFillUpdate({ ...fillterUpdate, addressGust }))
  }

  const handleSubmit = () => {
    updateGuest(fillterUpdate)
      .then(res => {
        if (res.data.success) {
          openNotificationWithIcon('success', res.data.message)
          dispatch(setListGuest(res.data.listGuest))
          dispatch(setModalUpdate(false))
        } else {
          openNotificationWithIcon('error', res.data.message)
        }
      })
      .catch(() => {
        openNotificationWithIcon('error', 'Có lỗi xảy ra, xin vui lòng thử lại!')
      })
  };

  const handleCancel = () => {
    dispatch(setModalUpdate(false))
  };

  return (
    <>
      <Modal width={800} footer={null} title="Cập nhật thông tin khách hàng" visible={modalUpdate} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            className='font-weight-bold'
            label="Mã Khách Hàng"
            name="codeGust"
            rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
            hasFeedback
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            className='font-weight-bold'
            label="Tên khách hàng"
            name="nameGust"
            rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
            hasFeedback
          >
            <Input  onChange={e => hanldChangeNameGust(e.target.value)} />
          </Form.Item>

          <Form.Item
            className='font-weight-bold'
            label="Số điện thoại"
            name="phoneGust"
          >
            <Input type='number' onChange={e => hanldChangePhoneGust(e.target.value)} />
          </Form.Item>
          <Form.Item
            className='font-weight-bold'
            label="Địa chỉ"
            name="addressGust"
          >
            <Input onChange={e => hanldChangeAddressGust(e.target.value)} />
          </Form.Item>
          <Space size="middle" className='d-flex' style={{ flexDirection: 'row-reverse' }}>
            <Button onClick={() => handleCancel()} className='font-weight-bold' style={{ padding: '0 32px' }} icon={<StopOutlined />} >
              Hủy
            </Button>

            <Button onClick={() => handleSubmit()} className='font-weight-bold' style={{ background: '#4bac4d', border: 'none', padding: '0 32px' }} htmlType="submit" type="primary" icon={<SaveOutlined />}>
              Lưu
            </Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default GuestModalUpdate;