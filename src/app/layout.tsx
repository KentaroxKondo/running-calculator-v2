// ライブラリ。
import type { Metadata } from 'next';

// スタイル。
import '../style/style.scss';

export const metadata: Metadata = {
  title: 'ランニング・カリキュレーター｜ランナーに捧げる計算機',
  description: 'ランニングの「距離」や「時間」、「ペース」を計算してくれる、シンプルで直感的なツールです。',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="jp">
      <body className='pb-3 bg-gray-50'>

        <header>
          <h1 className="font-bold text-4xl text-center py-[0.5em] select-none helper__word-break--keep-all">ランニング・<wbr />カリキュレーター</h1>
        </header>

        <main>
          {children}
        </main>

      </body>
    </html>
  );
}