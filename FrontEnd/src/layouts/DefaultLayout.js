import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { isLogin, verifyToken } from 'utils/jwt';
import Loadable from 'react-loadable';
import useRouter from 'hooks/useRouter';
import routes from 'src/routes';
import PermissionContent from 'middleware/PermissionContent';
import { Spin } from 'antd';

const Header = React.lazy(() => import('./Header'));
const Sidebar = React.lazy(() => import('./Sidebar'));

const { Content } = Layout;

const loading = () => (
  // <div className="animated fadeIn text-center">Loading 1...</div>
  <Spin></Spin>
);

const Page404 = Loadable({
  loader: () => import('modules/Commons/_views/Page404'),
  loading,
});

const DefaultLayout = () => {
  const router = useRouter();

  if (!isLogin()) {
    router.push('/login');
    return false;
  }

  // if (verifyToken()) {
  //   console.log('first')
  //   router.push('/sell');
  //   return false;
  // }

  verifyToken(boolean => {
    if (boolean) {
      router.push('/sell');
      return false;
    }
  })

  return (
    <Layout className="site-layout" style={{ minHeight: '100vh' }}>
      <Suspense fallback={loading()}>
        <Header />
      </Suspense>
      <Layout>
        <Suspense fallback={loading()}>
          <Sidebar />
        </Suspense>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="bg-main">
            <Suspense fallback={loading()}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <PermissionContent
                      key={idx}
                      path={route.path}
                      exact
                      name={route.name}
                      middle={route.middleware}
                      render={(props) => <route.component {...props} />}
                    />
                  ) : null;
                })}
                <Route component={Page404} />
              </Switch>
            </Suspense>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
