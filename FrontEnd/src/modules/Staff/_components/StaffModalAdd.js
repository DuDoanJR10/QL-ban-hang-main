import React, { useState } from 'react';
import { Modal, Form, Input, Button, Space } from 'antd';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setModalAdd, setListStaff } from '../_store/staffSlice';
import { addStaff } from '../_api';
import { openNotificationWithIcon } from '../../../helpers/funcs';

const StaffModalAdd = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const modalAdd = useSelector(state => state.staff.modalAdd)
  const listStaff = useSelector(state => state.staff.listStaff)

  const [nameStaff, setNameStaff] = useState('')
  const [phoneStaff, setPhoneStaff] = useState('')
  const [usernameStaff, setUsernameStaff] = useState('')
  const [passwordStaff, setPasswordStaff] = useState('')

  const handleSubmit = () => {
    if (nameStaff != '' && usernameStaff != '' && passwordStaff != '') {
      addStaff({ nameStaff, phoneStaff, username: usernameStaff, password: passwordStaff })
        .then(res => {
          if (res.data.success) {
            openNotificationWithIcon('success', res.data.message)
            form.setFieldsValue({ nameStaff: '', phoneStaff: '', username: '', password: '' })
            dispatch(setListStaff([ ...listStaff, res.data.newUser ]))
            handleCancel()
          } else {
            openNotificationWithIcon('error', res.data.message)
          }
        })
        .catch(() => openNotificationWithIcon('error', 'Có lỗi xảy ra, xin vui lòng thử lại!'))
    }
  };

  const handleCancel = () => {
    dispatch(setModalAdd(false))
  };

  return (
    <>
      <Modal width={800} footer={null} title="Thêm nhân viên" visible={modalAdd} onCancel={handleCancel}>
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
            label="Tên nhân viên"
            name="nameStaff"
            rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]}
            hasFeedback
          >
            <Input value={nameStaff} onChange={e => setNameStaff(e.target.value)} />
          </Form.Item>

          <Form.Item
            className='font-weight-bold'
            label="Số điện thoại"
            name="phoneStaff"
          >
            <Input type='number' value={phoneStaff} onChange={e => setPhoneStaff(e.target.value)} />
          </Form.Item>
          <Form.Item
            className='font-weight-bold'
            label="Tài khoản"
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
            hasFeedback
          >
            <Input value={usernameStaff} onChange={e => setUsernameStaff(e.target.value)} />
          </Form.Item>
          <Form.Item
            className='font-weight-bold'
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            hasFeedback
          >
            <Input.Password value={passwordStaff} onChange={e => setPasswordStaff(e.target.value)} />
          </Form.Item>
          <Space size="middle" className='d-flex' style={{ flexDirection: 'row-reverse' }}>
            <Button onClick={() => handleCancel()} className='font-weight-bold' style={{ padding: '0 32px' }} icon={<StopOutlined />} >Hủy</Button>
            <Button onClick={() => handleSubmit()} className='font-weight-bold' style={{ background: '#4bac4d', border: 'none', padding: '0 32px' }} htmlType="submit" type="primary" icon={<SaveOutlined />}>
            Tạo
            </Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default StaffModalAdd;