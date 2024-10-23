// ライブラリ。
import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faClipboard, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

// 定義。
import { BTN_ANIMATION_DURATION } from '../../util/constants'; // 定数を取得。

type CopyBtnProps = {
    textToCopy: string | null;
};

const CopyBtn: React.FC<CopyBtnProps> = ({ textToCopy }) => {
    const [copyState, setCopyState] = useState<{
        text: string;
        icon: IconDefinition;
        isCopied: boolean;
    }>({
        text: "Copy",
        icon: faClipboard,
        isCopied: false,
    });

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(textToCopy || "")
            .then(() => {
                setCopyState({
                    text: "Copied",
                    icon: faCircleCheck,
                    isCopied: true,
                });

                // 以前のタイマーをクリア
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }

                // 新しいタイマーを設定
                timeoutRef.current = setTimeout(() => {
                    setCopyState({
                        text: "Copy",
                        icon: faClipboard,
                        isCopied: false,
                    });
                }, BTN_ANIMATION_DURATION);
            })
            .catch((error) => {
                console.error("コピーに失敗しました：", error);
            });
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <button onClick={copyToClipboard} className={`p-[0.5em] rounded-lg ${copyState.isCopied ? "text-green-500" : "hover:bg-gray-100"}`}>
            <FontAwesomeIcon icon={copyState.icon} className="mr-[0.25em]" />
            {copyState.text}
        </button>
    );
}

export default CopyBtn;