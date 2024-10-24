'use client';

// ライブラリ。
import React, { useState, useEffect, useCallback } from 'react';

// コンポーネント。
import TimeField from '../field/Time';
import PaceField from '../field/Pace';
import ResultField from '../field/Result';
import ClearBtn from '../button/ClearBtn';

// 定義。
import { HOUR_IN_SECONDS, MINUTE_IN_SECONDS } from '../../util/constants'; // 定数を取得。
import { formatTime } from '../../util/functions'; // 関数を取得。
import { TimeObj } from '../../util/types'; // 型を取得。

const DistanceCalculator: React.FC = () => {
    const [time, setTime] = useState<TimeObj>({ h: '', m: '', s: '' });
    const [pace, setPace] = useState<TimeObj>({ m: '', s: '' });
    const [distance, setDistance] = useState<string | null>(null);

    // inputの値が変更された場合の処理。
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, dataset, maxLength } = e.target;
        const category = dataset.category;
        const limitedValue = value.slice(0, maxLength); // 値を最大桁数までに制限。
        const valueToSet = limitedValue ? Number(limitedValue) : 0;

        switch (category) {
            case 'time':
                setTime((prevState) => {
                    const unit = dataset.unit as keyof typeof prevState;
                    return formatTime(unit, valueToSet, prevState);
                });
                break;

            case 'pace':
                setPace((prevState) => {
                    const unit = dataset.unit as keyof typeof prevState;
                    return formatTime(unit, valueToSet, prevState);
                });
                break;
        }
    };

    // 距離を算出する関数（メモ化済み）。
    const calculateDistance = useCallback(() => {
        const totalTimeInSeconds = (Number(time.h) * HOUR_IN_SECONDS) + (Number(time.m) * MINUTE_IN_SECONDS) + Number(time.s); // 合計時間を秒に換算。
        const paceInSeconds = (Number(pace.m) * MINUTE_IN_SECONDS) + Number(pace.s); // ペースを秒に換算。
        const calculatedDistance = totalTimeInSeconds / paceInSeconds; // 距離を計算。

        // 0未満、もしくは無限な結果となれば、出力をスキップ。
        if (calculatedDistance <= 0 || !isFinite(calculatedDistance)) return setDistance('');

        // 小数が発生する場合は、小数点以下第四位を四捨五入。不要なゼロも除去。
        const formattedDistance = Number.isInteger(calculatedDistance)
            ? `${calculatedDistance} KM`
            : `${parseFloat(calculatedDistance.toFixed(3))} KM`;

        setDistance(formattedDistance);
    }, [time, pace]); // time若しくはpaceが更新された場合に再構築。

    useEffect(() => {
        calculateDistance();
    }, [calculateDistance]); // calculateDistanceが変更された場合（time, paceが更新された際）に関数を発火。

    return (
        <>
            <div className="field-container">
                <TimeField
                    time={time}
                    handleChange={handleChange}
                    firstInputId={'time-for-distance'}
                />
                <PaceField
                    pace={pace}
                    handleChange={handleChange}
                    firstInputId={'pace-for-distance'}
                />
                <ResultField
                    label="距離"
                    result={distance}
                />
            </div>

            <ClearBtn setStateFuncs={[setTime, setPace]} />
        </>
    );
}

export default DistanceCalculator;