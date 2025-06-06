import './globals.css';

export const metadata = {
  title: 'Todo App',
  description: 'Todo application created with Next.js and MongoDB',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="logo">
            <svg viewBox="0 0 24 24">
              <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z" />
              <path d="M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
            </svg>
            <h1>TODO</h1>
          </div>
        </header>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}