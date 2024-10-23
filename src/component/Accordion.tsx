'use client';

// ライブラリ。
import React, { useState } from 'react';

type AccordionItem = {
    title: string;
    content: React.ReactNode;
};

type AccordionProps = {
    items: AccordionItem[];
};

const Accordion: React.FC<AccordionProps> = ({ items }) => {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggleAccordion = (index: number) => {
        setOpenIndexes(prevState =>
            prevState.includes(index)
                ? prevState.filter(i => i !== index) // クリックされたindex以外をopenIndexesに残す。
                : [...prevState, index] // openIndexesにない場合は追加する。
        );
    };

    return (
        <div className="accordion grid gap-y-2">
            {items.map((item, index) => (
                <div key={index} className='border border-gray-400 shadow-[2px_2px_8px_rgba(0,0,0,0.2)]'>
                    <h2
                        className="bg-gray-800 hover:bg-gray-700 text-white select-none transition duration-200 ease-in-out"
                        onClick={() => toggleAccordion(index)}
                    >
                        {item.title}
                    </h2>

                    {openIndexes.includes(index) &&
                        <div className="py-5 px-[5%] bg-white">
                            {item.content}
                        </div>
                    }
                </div>
            ))}
        </div>
    );
};

export default Accordion;