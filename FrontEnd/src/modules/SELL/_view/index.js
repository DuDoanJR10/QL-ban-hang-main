import React from 'react';
import SellContent from '../_components/SellContent/SellContent';
import SellFooter from '../_components/SellFooter/SellFooter';
import SellHeader from '../_components/SellHeader/SellHeader';
import '../_style/style.scss';

const Sell = () => {
  return (
    <div className="sell">
      <SellHeader />
      <SellContent />
      <SellFooter />
    </div>
  );
};

export default Sell;
