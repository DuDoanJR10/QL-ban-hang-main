import { Button, Result } from 'antd';
import useRouter from 'hooks/useRouter';
import React from 'react';

const Page404 = () => {
  //Hook init
  const router = useRouter();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn tìm kiếm không tồn tại!"
      extra={
        <Button
          type="primary"
          onClick={() => router.history.replace({ pathname: '/' })}
        >
          Trở về trang chủ
        </Button>
      }
    />
  );
};

export default Page404;
