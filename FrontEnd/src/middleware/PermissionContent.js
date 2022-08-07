import React from 'react';
import { Route } from 'react-router-dom';
import * as AUTH from 'auth/_store/constants'
import { Redirect } from 'react-router-dom'
import { isEmpty } from 'helpers/funcs'
import PropTypes from 'prop-types';

import { getAuth } from 'utils/jwt'
import { openNotificationWithIcon } from 'helpers/funcs.js';
// import { secretKey } from './../config/config';
// import * as jwt from 'jsonwebtoken';


const allowedUserChecker = (roles, module , middleware) => {
  if (isEmpty(roles)) {
    return false
  }
  let isAdmin = roles.name.toLowerCase() == AUTH.ADMIN_NAME.toLowerCase() || roles.roleId == 1;
  if (!isAdmin) {
    let moduleCheck = roles.modulePermissions.find(roleModule => roleModule.moduleFunctionId === module.moduleFunctionId);
    if (isEmpty(moduleCheck)) return false
    if (isEmpty(middleware)) return true
    return moduleCheck[middleware];
  }
  return true
}

const PermissionContent = (props) => {
  const authInfo = getAuth();
  const userRoles = authInfo && authInfo.roles ? authInfo.roles[0] : {};
  
  let access = false;
  if (props.name === AUTH.MODULE_DASHBOARD ||  props.name === 'ChatWidget') {
    access = true;
  }
  else {
    const module = AUTH.ALL_MODULES.find(module => module.key == props.name);
    access = allowedUserChecker(userRoles , module , props.middle);
  }
  if (!access) openNotificationWithIcon('error', 'Bạn không có quyền truy cập');

  return access ? (
    <Route {...props} />
  ) : (
    <Redirect  to="/" />
  )
  // let token = localStorage.getItem('utk');
  // if (token !== '' && token !== undefined && token !== null) {
  // const decoded = jwt.verify(token, secretKey);
  // let pageCurrent = props.middle;
  // let indexPer = decoded.permissions.findIndex(
  //   per => per.path === pageCurrent.url && per.method === pageCurrent.method
  // );
  // return indexPer > -1 ? (
  // 	<Route {...props} />
  // ) : (
  // 	<Redirect from="/" to="/Dashboard" />
  // );
  // return <Route {...props} />;
  // } else {
  //   return false;
  // }
  
};

PermissionContent.propTypes = {
  name: PropTypes.string,
  middle: PropTypes.string,
};

export default PermissionContent;
