// ライブラリ。
import React from 'react'

// 定義。
import { TimeObj } from '../../util/types' // 型を取得
import { handleFocus, handleKeyDown, handleKeyUp } from '../../util/functions'; // 関数を取得。

type TimeFieldProps = {
    time: TimeObj;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    firstInputId: string;
};

const TimeField = ({ time, handleChange, firstInputId }: TimeFieldProps) => {
    return (
        <div className="field">
            <label htmlFor={firstInputId} className="field__heading">時間は・・・</label>

            <div className="field__inputs field__inputs--time">
                <label>
                    <input type="number" inputMode="numeric" id={firstInputId} maxLength={2} max="99" min="0" placeholder="0" value={time.h} data-category="time" data-unit="h" onFocus={handleFocus} onChange={handleChange} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
                    <span>時間</span>
                </label>
                <label>
                    <input type="number" inputMode="numeric" maxLength={2} max="60" min="-1" placeholder="0" value={time.m} data-category="time" data-unit="m" onFocus={handleFocus} onChange={handleChange} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
                    <span>分</span>
                </label>
                <label>
                    <input type="number" inputMode="numeric" maxLength={2} max="60" min="-1" placeholder="0" value={time.s} data-category="time" data-unit="s" onFocus={handleFocus} onChange={handleChange} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
                    <span>秒</span>
                </label>
            </div>
        </div>
    )
}

export default TimeField;