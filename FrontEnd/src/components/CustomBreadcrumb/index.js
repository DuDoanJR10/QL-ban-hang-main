import React from 'react'
import PropTypes from 'prop-types'
import {  Link } from 'react-router-dom';
import { Breadcrumb , Typography } from 'antd';
const { Text } = Typography;

function CustomBreadcrumb(props) {
  const {breadcrumbNameMap} = props;
  const extraBreadcrumbItems =  breadcrumbNameMap.map((_, index) => {
    return (
      <Breadcrumb.Item key={index}>
        {
          index < breadcrumbNameMap.length - 1 && _.url ? (
            <Link to={_.url}>{_.name}</Link>
          ) : (<Text strong={ index === breadcrumbNameMap.length - 1 }>{_.name}</Text>)
        }
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/" className='font-weight-bold'>ROHTO</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return (
    <>
      <Breadcrumb className='font-weight-bold' separator=">">{breadcrumbItems}</Breadcrumb>
    </>
  )
}

CustomBreadcrumb.propTypes = {
  breadcrumbNameMap: PropTypes.any.isRequired,
}
CustomBreadcrumb.defaultProps = {
 
}

export default CustomBreadcrumb


