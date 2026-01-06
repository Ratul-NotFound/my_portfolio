import Portfolio from '../components/Portfolio';

export const metadata = {
  title: 'Mahmud Hasan Ratul | Full Stack & AI Engineer',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Portfolio />
    </main>
  );
}