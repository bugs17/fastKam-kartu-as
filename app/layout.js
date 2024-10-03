import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./component/navbar";
import Provider from "./context/Provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "YOSFAN",
  description: "An app for safanpo",
  icons: {
    icon: '/favico.jpeg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="synthwave" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
      <Provider>
        <div className="px-8 py-8">
          <Navbar />
          {children}
        </div>
      </Provider>
      </body>
    </html>
  );
}
