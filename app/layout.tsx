import Link from 'next/link';
import './globals.css';

// Layout component which nests the page component as a child
// Great for a global nav bar
export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <main>
          <nav>
            <Link href="/">
              Home
            </Link>
            <Link href="/notes">
              Notes
            </Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
