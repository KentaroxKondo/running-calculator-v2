// ライブラリ。
import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

// 定義。
import { BTN_ANIMATION_DURATION } from '../../util/constants'; // 定数を取得。

type ClearBtnProps = {
    setStateFuncs: Array<Dispatch<SetStateAction<any>>>; // TimeObjやnumber、nullなど、様々な型を動的に扱うためanyを許容します。
};

const ClearBtn = ({ setStateFuncs }: ClearBtnProps) => {
    const [btnText, setBtnText] = useState('Clear');
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearInputs = () => {
        setStateFuncs.forEach((setStateFunc) =>
            setStateFunc((prevState: any) =>
                typeof prevState === 'object'
                    ? Object.fromEntries(Object.keys(prevState).map(key => [key, ''])) // オブジェクトの場合は、各キーの値を空文字列に更新。
                    : '' // オブジェクト以外の場合は空文字列に更新。
            )
        );

        setBtnText('Cleared');

        // 以前のタイマーをクリア。
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // 新しいタイマーを設定。
        timeoutRef.current = setTimeout(() => {
            setBtnText('Clear');
        }, BTN_ANIMATION_DURATION);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <button
            className="block w-[min(350px,_100%)] mx-auto py-3 border-[1px] border-gray-800 bg-white hover:bg-gray-800 hover:text-white active:bg-gray-600 transition duration-200 ease-in-out"
            onClick={clearInputs}
        >
            <FontAwesomeIcon icon={faTrashCan} className="mr-[0.25em]" />
            {btnText}
        </button >
    );
};

export default ClearBtn;