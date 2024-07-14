import React from 'react';

const Guidelines = () => (
  <div className="guidelines" style={{ backgroundColor: 'rgba(248, 179, 0, 0.05)', padding: "24px", margin: "64px 104px 40px", borderRadius: "16px"}}>
    <h2 style={{ color: '#F8B300', marginBottom: "16px", fontSize: "20px", fontWeight: "bold" }}>撮影・アップロードする動画の注意点</h2>
    <ul style={{ fontSize: "18px"}}>
      <li>スマホ、タブレットで使用することを前提としています。PCでは前面カメラになってしまいます。</li>
      <li>撮影ボタンをクリックすると、音声ガイドが流れます。その後撮影が開始します。</li>
    </ul>
  </div>
);

export default Guidelines;
