import { Nunito } from "next/font/google";
import "./globals.css";

const roundedFont = Nunito({ 
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"] 
});

export const metadata = {
  title: "StyleCue",
  description: "Find your perfect style powered by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roundedFont.className} suppressHydrationWarning>
  {children}
</body>
    </html>
  );
}