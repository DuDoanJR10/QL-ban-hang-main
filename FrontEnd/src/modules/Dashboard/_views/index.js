import React from 'react';
import '../_styles/style.scss';
import { Divider } from 'antd'
import DashboardOverview from '../_components/DashboardOverview';
import DashboardChart from '../_components/DashboardChart';
const Dashboard = () => {
  return (
    <div className="dashboard">
      <DashboardOverview />
      <Divider />
      <DashboardChart />
    </div>
  );
};

export default Dashboard;
