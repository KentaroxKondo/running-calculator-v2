import React from 'react';
import CopyBtn from '../button/CopyBtn';

type ResultFieldProps = {
    label: string;
    result: string | null;
};

const ResultField: React.FC<ResultFieldProps> = ({ label, result }) => {
    return (
        <div className="grid grid-cols-2 field">
            <p className="field__heading">{label}は・・・</p>
            <div className="result-container">
                {result && ( // 有効な結果が算出された場合のみ表示。
                    <>
                        <span className="text-red-500 font-bold text-[1.5em]">
                            {result}
                        </span>
                        <CopyBtn textToCopy={result} />
                    </>
                )}
            </div>
        </div>
    );
};

export default ResultField;