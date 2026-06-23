import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'NGB Interiors - Handcrafted Furniture',
  description: 'Premium handcrafted furniture from Uganda. Beds, sofas, chairs and more.',
  keywords: 'furniture, handcrafted, Uganda, beds, sofas, chairs, interior design',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <footer style={footerStyle}>
          <div className="container" style={footerContentStyle}>
            <p style={footerTextStyle}>
              © 2026 NGB Interiors. All rights reserved.
            </p>
            <p style={footerSubtextStyle}>
              Handcrafted Excellence • Made in Uganda
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

const footerStyle = {
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
  padding: '2rem 0',
  marginTop: 'auto',
};

const footerContentStyle = {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const footerTextStyle = {
  fontFamily: 'var(--f-heading)',
  fontSize: 'var(--fs-sm)',
  fontWeight: '500',
  letterSpacing: '0.08em',
};

const footerSubtextStyle = {
  fontSize: 'var(--fs-xs)',
  fontWeight: '300',
  color: '#b8934a',
  letterSpacing: '0.12em',
};
