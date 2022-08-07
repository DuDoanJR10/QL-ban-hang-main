import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { GetInvoiceChart } from '../_api/';
import { openNotificationWithIcon, handleTotal } from '../../../helpers/funcs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { useTranslation } from 'react-i18next';

const DashboardChart = () => {
  const { t } = useTranslation();

  const [t1, setT1] = useState([0, 0]);
  const [t2, setT2] = useState([0, 0]);
  const [t3, setT3] = useState([0, 0]);
  const [t4, setT4] = useState([0, 0]);
  const [t5, setT5] = useState([0, 0]);
  const [t6, setT6] = useState([0, 0]);
  const [t7, setT7] = useState([0, 0]);
  const [t8, setT8] = useState([0, 0]);
  const [t9, setT9] = useState([0, 0]);
  const [t10, setT10] = useState([0, 0]);
  const [t11, setT11] = useState([0, 0]);
  const [t12, setT12] = useState([0, 0]);

  useEffect(() => {
    GetInvoiceChart()
      .then((res) => {
        if (res.data.success) {
          setT1(handleTotal(res.data.invoiceT1));
          setT2(handleTotal(res.data.invoiceT2));
          setT3(handleTotal(res.data.invoiceT3));
          setT4(handleTotal(res.data.invoiceT4));
          setT5(handleTotal(res.data.invoiceT5));
          setT6(handleTotal(res.data.invoiceT6));
          setT7(handleTotal(res.data.invoiceT7));
          setT8(handleTotal(res.data.invoiceT8));
          setT9(handleTotal(res.data.invoiceT9));
          setT10(handleTotal(res.data.invoiceT10));
          setT11(handleTotal(res.data.invoiceT11));
          setT12(handleTotal(res.data.invoiceT12));
        } else openNotificationWithIcon('error', res.data.message);
      })
      .catch(() =>
        openNotificationWithIcon('error', 'Có lỗi xảy ra xin vui lòng thử lại!')
      );
  }, []);

  return (
    <>
      <Bar
        data={{
          labels: [
            `${t('home.month')} ${1}`,
            `${t('home.month')} ${2}`,
            `${t('home.month')} ${3}`,
            `${t('home.month')} ${4}`,
            `${t('home.month')} ${5}`,
            `${t('home.month')} ${6}`,
            `${t('home.month')} ${7}`,
            `${t('home.month')} ${8}`,
            `${t('home.month')} ${9}`,
            `${t('home.month')} ${10}`,
            `${t('home.month')} ${11}`,
            `${t('home.month')} ${12}`,
          ],
          datasets: [
            {
              label: t('home.totalRevenue'),
              backgroundColor: [
                'rgba(255, 118, 0, 0.7)',
                'rgba(255, 118, 0, 0.7)',
                'rgba(255, 118, 0, 0.7)',
                'rgba(255, 118, 0, 0.7)',
                'rgba(255, 118, 0, 0.7)',
                'rgba(255, 118, 0, 0.7)',
                'rgba(255, 118, 0, 0.7)',
                'rgba(255, 118, 0, 0.7)',
                'rgba(255, 118, 0, 0.7)',
                'rgba(255, 118, 0, 0.7)',
                'rgba(255, 118, 0, 0.7)',
                'rgba(255, 118, 0, 0.7)',
              ],
              data: [
                t1[0],
                t2[0],
                t3[0],
                t4[0],
                t5[0],
                t6[0],
                t7[0],
                t8[0],
                t9[0],
                t10[0],
                t11[0],
                t12[0],
              ],
            },
            {
              label: t('home.totalProfit'),
              backgroundColor: [
                'rgba(1, 145, 180, 0.7)',
                'rgba(1, 145, 180, 0.7)',
                'rgba(1, 145, 180, 0.7)',
                'rgba(1, 145, 180, 0.7)',
                'rgba(1, 145, 180, 0.7)',
                'rgba(1, 145, 180, 0.7)',
                'rgba(1, 145, 180, 0.7)',
                'rgba(1, 145, 180, 0.7)',
                'rgba(1, 145, 180, 0.7)',
                'rgba(1, 145, 180, 0.7)',
                'rgba(1, 145, 180, 0.7)',
                'rgba(1, 145, 180, 0.7)',
              ],
              data: [
                t1[1],
                t2[1],
                t3[1],
                t4[1],
                t5[1],
                t6[1],
                t7[1],
                t8[1],
                t9[1],
                t10[1],
                t11[1],
                t12[1],
              ],
            },
          ],
        }}
        options={{
          legend: { display: false },
          // maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Tổng doanh thu (VND)',
          },
        }}
        height={100}
      />
    </>
  );
};

export default DashboardChart;
