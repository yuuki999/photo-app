// TODO: 解析失敗だが、再リトライできるステータスは再リトライしたい。

export const getStatusDisplay = (status: string) => {
  // 解析成功
  if (status === 'all_success') {
    return { text: '解析成功', className: 'success' };
  }

  // 解析中
  if (status === 'fujitsu_analysis_success') {
    return { text: '解析中', className: 'processing' };
  }

  // 解析失敗
  return { text: '解析失敗', className: 'failure' };
};
