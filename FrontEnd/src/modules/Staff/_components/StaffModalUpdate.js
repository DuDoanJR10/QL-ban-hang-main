import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Space } from 'antd';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setModalUpdate, setListStaff } from '../_store/staffSlice';
import { updateStaff } from '../_api';
import { openNotificationWithIcon } from '../../../helpers/funcs';

const StaffModalUpdate = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const modalUpdate = useSelector(state => state.staff.modalUpdate)

  console.log('modalUpdate: ', modalUpdate);

  const [inputNameStaff, setInputNameStaff] = useState(modalUpdate.nameStaff)
  console.log('Hello inputNameStaff: ', inputNameStaff);
  const [inputPhoneStaff, setInputPhoneStaff] = useState(modalUpdate.phoneStaff)
  const [inputPassword, setInputPassword] = useState(modalUpdate.password)

  useEffect(() => {
    const { codeStaff, nameStaff, phoneStaff, username, password } = modalUpdate
    form.setFieldsValue({ codeStaff, nameStaff, phoneStaff, username, password })
  }, [modalUpdate])


  const handleSubmit = () => {
    console.log('inputNameStaff: ', inputNameStaff)
    if (inputNameStaff != '') {
      updateStaff({
        codeStaff: modalUpdate.codeStaff,
        nameStaff: inputNameStaff,
        phoneStaff: inputPhoneStaff,
        password: inputPassword
      })
        .then(res => {
          if (res.data.success) {
            console.log('res: ', res);
            dispatch(setListStaff(res.data.listStaff))
            openNotificationWithIcon('success', res.data.message)
            handleCancel()
          } else {
            openNotificationWithIcon('error', res.data.message)
          }
        })
        .catch(() => openNotificationWithIcon('error', 'Có lỗi xảy ra, xin vui lòng thử lại!'))
    }
  };

  const handleCancel = () => {
    dispatch(setModalUpdate({ ...modalUpdate, view: false }))
  };

  return (
    <>
      <Modal width={800} footer={null} title="Cập nhật thông tin nhân viên" visible={modalUpdate.view} onCancel={handleCancel}>
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
            label="Mã nhân viên"
            name="codeStaff"
            rules={[{ required: true, message: 'Vui lòng nhập mã nhân viên!' }]}
            hasFeedback
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            className='font-weight-bold'
            label="Tên nhân viên"
            name="nameStaff"
            rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]}
            hasFeedback
          >
            <Input value={inputNameStaff} onChange={e => setInputNameStaff(e.target.value)} />
          </Form.Item>

          <Form.Item
            className='font-weight-bold'
            label="Số điện thoại"
            name="phoneStaff"
            hasFeedback
          >
            <Input type='number' value={inputPhoneStaff} onChange={e => setInputPhoneStaff(e.target.value)} />
          </Form.Item>
          <Form.Item
            className='font-weight-bold'
            label="Tài khoản"
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
            hasFeedback
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            className='font-weight-bold'
            label="Mật khẩu"
            name="password"
            hasFeedback
          >
            <Input.Password value={inputPassword} onChange={e => setInputPassword(e.target.value)} />
            <p style={{ fontStyle: 'italic', fontSize: '12px' }} >*Để trống nếu không muốn thay đổi mật khẩu</p>
          </Form.Item>
          <Space size="middle" className='d-flex' style={{ flexDirection: 'row-reverse' }}>
            <Button onClick={() => handleCancel()} className='font-weight-bold' style={{ padding: '0 32px' }} icon={<StopOutlined />} >Hủy</Button>
            <Button onClick={() => handleSubmit()} className='font-weight-bold' style={{ background: '#4bac4d', border: 'none', padding: '0 32px' }} htmlType="submit" type="primary" icon={<SaveOutlined />}>
              Lưu
            </Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default StaffModalUpdate;