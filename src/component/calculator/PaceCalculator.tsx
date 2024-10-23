'use client';

// ライブラリ。
import React, { useState, useEffect, useCallback } from 'react';

// コンポーネント。
import DistanceField from '../field/Distance';
import TimeField from '../field/Time';
import ResultField from '../field/Result';
import ClearBtn from '../button/ClearBtn';

// 定義。
import { HOUR_IN_SECONDS, MINUTE_IN_SECONDS } from '../../util/constants'; // 定数を取得。
import { formatTime, extractTimeByUnit } from '../../util/functions'; // 関数を取得。
import { TimeObj } from '../../util/types'; // 型を取得。

const TimeCalculator: React.FC = () => {
    const [distance, setDistance] = useState<number | ''>('');
    const [time, setTime] = useState<TimeObj>({ h: '', m: '', s: '' });
    const [pace, setPace] = useState<string | null>(null);

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

            case 'time':
                setTime((prevState) => {
                    const unit = dataset.unit as keyof typeof prevState;
                    return formatTime(unit, valueToSet, prevState);
                });
                break;
        }
    };

    // 時間を算出する関数（メモ化済み）。
    const calculatePace = useCallback(() => {
        const totalDistance = Number(distance);
        const totalTimeInSeconds = (Number(time.h) * HOUR_IN_SECONDS) + (Number(time.m) * MINUTE_IN_SECONDS) + Number(time.s); // 合計時間を秒に換算。

        const calculatedPace = totalTimeInSeconds / totalDistance;
        if (!isFinite(calculatedPace)) return setPace(null); // 結果が無限の場合は、出力せずに早期リターン。

        const calculatedHours = extractTimeByUnit(calculatedPace, 'h');
        const calculatedMinutes = extractTimeByUnit(calculatedPace, 'm');
        const calculatedSeconds = extractTimeByUnit(calculatedPace, 's');

        const paceParts = []; // 結果出力用の配列をセット。
        if (calculatedHours > 0) paceParts.push(`${calculatedHours}時間`); // 1時間以上の場合は出力。
        if (calculatedPace >= MINUTE_IN_SECONDS) paceParts.push(`${calculatedMinutes}分`); // 1分以上の場合は出力。
        if (Math.round(calculatedPace) > 0) paceParts.push(`${calculatedSeconds}秒`); // 四捨五入して1秒以上の場合は出力。

        setPace(paceParts.length > 0 ? paceParts.join(' ') + ' / KM' : null);
    }, [distance, time]); // distance若しくはtimeが更新された場合に再構築。

    useEffect(() => {
        calculatePace();
    }, [calculatePace]); // calculatePaceが変更された場合（distance, timeが更新された際）に関数を発火。

    return (
        <>
            <div className="field-container">
                <DistanceField
                    distance={distance}
                    handleChange={handleChange}
                    setDistance={setDistance}
                    firstInputId={'distance-for-pace'}
                />
                <TimeField
                    time={time}
                    handleChange={handleChange}
                    firstInputId={'time-for-pace'}
                />
                <ResultField
                    label='ペース'
                    result={pace}
                />
            </div>

            <ClearBtn setStateFuncs={[setDistance, setTime]} />
        </>
    );
}

export default TimeCalculator;