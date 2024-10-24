'use client';

// ライブラリ。
import React, { useState, useEffect, useCallback } from 'react';

// コンポーネント。
import DistanceField from '../field/Distance';
import PaceField from '../field/Pace';
import ResultField from '../field/Result';
import ClearBtn from '../button/ClearBtn';

// 定義。
import { MINUTE_IN_SECONDS } from '../../util/constants'; // 定数を取得。
import { formatTime, extractTimeByUnit } from '../../util/functions'; // 関数を取得。
import { TimeObj } from '../../util/types'; // 型を取得。

const TimeCalculator: React.FC = () => {
    const [pace, setPace] = useState<TimeObj>({ m: '', s: '' });
    const [distance, setDistance] = useState<number | ''>('');
    const [time, setTime] = useState<string | null>(null);

    // inputの値が変更された場合の処理。
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, dataset, maxLength } = e.target;
        const category = dataset.category;
        const limitedValue = value.slice(0, maxLength); // 値を最大桁数までに制限。
        const valueToSet = limitedValue ? Number(limitedValue) : 0;

        switch (category) {
            case 'distance':
                setDistance(valueToSet > 0 ? valueToSet : '');
                break;

            case 'pace':
                setPace((prevState) => {
                    const unit = dataset.unit as keyof typeof prevState;
                    return formatTime(unit, valueToSet, prevState);
                });
                break;
        }
    };

    // 時間を算出する関数（メモ化済み）。
    const calculateTime = useCallback(() => {
        const totalDistance = Number(distance);
        const paceInSeconds = (Number(pace.m) * MINUTE_IN_SECONDS) + Number(pace.s); // ペースを秒に換算。

        const calculatedTotalTime = totalDistance * paceInSeconds;
        const calculatedHours = extractTimeByUnit(calculatedTotalTime, 'h');
        const calculatedMinutes = extractTimeByUnit(calculatedTotalTime, 'm');
        const calculatedSeconds = extractTimeByUnit(calculatedTotalTime, 's');

        const timeParts = []; // 結果出力用の配列をセット。
        if (calculatedHours > 0) timeParts.push(`${calculatedHours}時間`); // 1時間以上の場合は出力。
        if (calculatedTotalTime >= MINUTE_IN_SECONDS) timeParts.push(`${calculatedMinutes}分`); // 1分以上の場合は出力。
        if (Math.round(calculatedTotalTime) > 0) timeParts.push(`${calculatedSeconds}秒`); // 四捨五入して1秒以上の場合は出力。

        setTime(timeParts.length > 0 ? timeParts.join(' ') : null);
    }, [distance, pace]); // distance若しくはpaceが更新された場合に再構築。

    useEffect(() => {
        calculateTime();
    }, [calculateTime]); // calculateTimeが変更された場合（distance, paceが更新された際）に関数を発火。

    return (
        <>
            <div className="field-container">
                <DistanceField
                    distance={distance}
                    handleChange={handleChange}
                    setDistance={setDistance}
                    firstInputId={'distance-for-time'}
                />
                <PaceField
                    pace={pace}
                    handleChange={handleChange}
                    firstInputId={'pace-for-time'}
                />
                <ResultField
                    label="時間"
                    result={time}
                />
            </div>

            <ClearBtn setStateFuncs={[setDistance, setPace]} />
        </>
    );
}

export default TimeCalculator;