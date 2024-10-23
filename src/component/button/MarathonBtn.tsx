// ライブラリ。
import React from 'react';

type MarathonBtnProps = {
    distance: number;
    text: string;
    setDistance: React.Dispatch<React.SetStateAction<number | ''>>;
};

const MarathonBtn: React.FC<MarathonBtnProps> = ({ distance, text, setDistance }) => {
    return (
        <button
            className='p-[0.25em] rounded-md border-[1px] text-nowrap bg-white border-gray-800 hover:bg-blue-100  active:bg-blue-200 transition duration-200 ease-in-out'
            onClick={() => setDistance(distance)}>
            {text}
        </button>
    );
};

export default MarathonBtn;