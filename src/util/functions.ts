// 定義。
import { TimeObj } from './types' // 型を取得。
import { HOUR_IN_SECONDS, MINUTE_IN_SECONDS } from './constants';

// 時間を単位ごとに抽出する関数。
export const extractTimeByUnit = (totalSeconds: number, unit: 'h' | 'm' | 's'): number => {
    switch (unit) {
        case 'h':
            return Math.floor(totalSeconds / HOUR_IN_SECONDS);

        case 'm':
            return Math.floor((totalSeconds % HOUR_IN_SECONDS) / MINUTE_IN_SECONDS);

        case 's':
            return Math.round(totalSeconds % MINUTE_IN_SECONDS); // 小数点以下は四捨五入。

        default:
            return 0;
    }
};

// 時・分・秒から成る時間オブジェクトをフォーマットする関数。
export const formatTime = (unit: 'h' | 'm' | 's', valueToSet: number, prevState: TimeObj): TimeObj => {
    const newTime = { ...prevState, [unit]: valueToSet };
    const { h = 0, m = 0, s = 0 } = newTime;

    // 時間を秒に変換。
    const totalTimeInSeconds = Math.max(Number(h) * 3600 + Number(m) * 60 + Number(s), 0);

    // 60進法に基づく正確な時間・分・秒を抽出。
    const extractedHours = Math.floor(totalTimeInSeconds / 3600);
    const extractedMinutes = Math.floor((totalTimeInSeconds % 3600) / 60);
    const extractedSeconds = totalTimeInSeconds % 60;

    // 更新用の値をセット。バックスペースによるinput値の削除と編集に対応するため、空文字列も許容。
    const updatedH = extractedHours || '';
    const updatedM = extractedMinutes === 0 ? '' : extractedMinutes;
    const updatedS = extractedSeconds === 0 ? '' : extractedSeconds;

    // prevStateを上書きするためのオブジェクトを生成。元々キーが存在しない場合は、新たなキーを挿入しないように調整。
    const updatedObject = {
        ...(prevState.h !== undefined && { h: updatedH }),
        ...(prevState.m !== undefined && { m: updatedM }),
        ...(prevState.s !== undefined && { s: updatedS }),
    };

    return { ...newTime, ...updatedObject };
};

export const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select(); // キーボード入力高速化のため、inputフォーカス時に値を全選択状態にする（打ち消しと入力を一度に行えるため）。
}

export const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = e.key;

    // 数字、Backspace、Tab、Arrowキー、Command/Ctrl+Aを許可
    if (
        !/[0-9]/.test(charCode) && // 数字以外のキー
        charCode !== 'Backspace' && // バックスペース
        charCode !== 'Tab' && // タブ
        charCode !== 'ArrowUp' && // 上矢印
        charCode !== 'ArrowDown' && // 下矢印
        charCode !== 'ArrowLeft' && // 左矢印
        charCode !== 'ArrowRight' && // 右矢印
        !(e.ctrlKey || e.metaKey) // CtrlまたはCmdが押されている場合
    ) {
        e.preventDefault(); // デフォルトの動作をキャンセル
        console.log("入力キャンセル！");
    }
};