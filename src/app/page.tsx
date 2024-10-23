// ライブラリ。
import React from 'react';

// コンポーネント。
import Accordion from '../component/Accordion';
import DistanceCalculator from '../component/calculator/DistanceCalculator';
import TimeCalculator from '../component/calculator/TimeCalculator';
import PaceCalculator from '../component/calculator/PaceCalculator';

// 各アコーディオンのタイトルと中身を定義。
const accordionItems = [
  {
    title: '距離を求める',
    content: <DistanceCalculator />
  },
  {
    title: '時間を求める',
    content: <TimeCalculator />
  },
  {
    title: 'ペースを求める',
    content: <PaceCalculator />
  },
];

const Page: React.FC = () => {
  return (
    <div className='w-[min(600px,_95%)] mx-auto'>
      <Accordion items={accordionItems} />
    </div>
  );
};

export default Page;