import './globals.css';

export const metadata = {
  title: 'DevUtil',
  description: 'Essential developer tools and utilities'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
