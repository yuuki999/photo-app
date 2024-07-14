
import React from 'react';

const UploadGuidelines = () => (
  <div className="guidelines" style={{ backgroundColor: 'rgba(248, 179, 0, 0.05)', padding: "24px", margin: "24px 24px 40px", borderRadius: "16px"}}>
    <h2 style={{ color: '#F8B300', marginBottom: "16px", fontSize: "20px", fontWeight: "bold" }}>アップロードする動画の注意点</h2>
    <ul style={{ fontSize: "18px"}}>
      <li>・時間：動画の長さは1分以内である必要があります。1分を超えると、アップロード時にエラーが発生します。</li>
      <li>・人物：動画には1人の人物が映るようにしてください。</li>
      <li>・服装：体型がわかりやすい服装を選んでください。また、背景と同じ色の服は避けてください。</li>
      <li>・撮影範囲：体全体が画面内に収まるようにしてください。</li>
      <li>・セルフオクルージョン：自分の体の一部が他の部分を隠さないように注意してください。（例: 腕で顔が隠れないようにする）</li>
      <li>・照明：逆光や露出過多にならないように注意し、明るい場所で撮影してください。</li>
      <li>・フォーマット：動画は.mp4または.mov形式である必要があります。</li>
    </ul>

  </div>
);

export default UploadGuidelines;
