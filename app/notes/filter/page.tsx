import { redirect } from 'next/navigation';
export default function Index() {
  redirect('/notes/filter/All');
}
