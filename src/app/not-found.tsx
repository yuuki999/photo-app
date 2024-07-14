// 存在しないページにアクセスした時は、写真一覧ページにリダイレクトする
import { redirect } from 'next/navigation';

export default function NotFound() {
  redirect('/photo');
}
