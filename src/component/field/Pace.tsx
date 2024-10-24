// ライブラリ。
import React from 'react'

// 定義。
import { TimeObj } from '../../util/types' // 型を取得。
import { handleFocus, handleKeyDown } from '../../util/functions'; // 関数を取得。

type PaceFieldProps = {
    pace: TimeObj;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    firstInputId: string;
};

const PaceField = ({ pace, handleChange, firstInputId }: PaceFieldProps) => {
    return (
        <div className="field">
            <label htmlFor={firstInputId} className="field__heading">ペースは・・・</label>

            <div className="field__inputs field__inputs--pace">
                <label>
                    <input type="number" id={firstInputId} maxLength={2} max="59" min="0" placeholder="0" value={pace.m} data-category="pace" data-unit="m" onFocus={handleFocus} onChange={handleChange} onKeyDown={handleKeyDown} />
                    <span>分</span>
                </label>
                <label>
                    <input type="number" maxLength={2} max="60" min="-1" placeholder="0" value={pace.s} data-category="pace" data-unit="s" onFocus={handleFocus} onChange={handleChange} onKeyDown={handleKeyDown} />
                    <span>秒 / KM</span>
                </label>
            </div>
        </div>
    )
}

export default PaceField;