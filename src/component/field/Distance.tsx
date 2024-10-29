// ライブラリ。
import React from 'react'

// コンポーネント。
import MarathonBtn from '../button/MarathonBtn';

// 定義。
import { handleFocus, handleKeyDown, handleKeyUp } from '../../util/functions'; // 関数を取得。
import { MARATHON_DISTANCE, HALF_MARATHON_DISTANCE } from '../../util/constants'; // 定数を取得。

type DistanceFieldProps = {
    distance: number | '';
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setDistance: React.Dispatch<React.SetStateAction<number | ''>>;
    firstInputId: string;
};

const DistanceField = ({ distance, handleChange, setDistance, firstInputId }: DistanceFieldProps) => {
    return (
        <div className="field">
            <label htmlFor={firstInputId} className="field__heading">距離は・・・</label>

            <div className="field__inputs field__inputs--distance">
                <label>
                    <input type="number" id={firstInputId} maxLength={6} max="9999.9" min="0" step={0.1} placeholder="0" value={distance} data-category="distance" onFocus={handleFocus} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, { allowDecimal: true })} onKeyUp={handleKeyUp} className="large" />
                    <span>KM</span>
                </label>

                <div className="flex flex-wrap gap-x-[0.5em] gap-y-[0.25em]">
                    <MarathonBtn distance={MARATHON_DISTANCE} text="マラソン" setDistance={setDistance} />
                    <MarathonBtn distance={HALF_MARATHON_DISTANCE} text="ハーフマラソン" setDistance={setDistance} />
                </div>
            </div>
        </div>
    )
}

export default DistanceField;