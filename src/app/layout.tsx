import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes, Alex_Brush } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const cursive = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cursive",
});

const signature = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-signature",
});

export const metadata: Metadata = {
  title: "Life in Percentages | Your Journey in Time",
  description: "A beautiful reflection on how you spend your days. Transform your habits into meaningful lifetime memories.",
  openGraph: {
    title: "Life in Percentages",
    description: "Your days are becoming years. See where your life goes.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${cursive.variable} ${signature.variable} font-sans bg-ivory text-taupe`}>
        <div className="grain" />
        <div className="fixed inset-0 pointer-events-none z-0">
           {/* Soft Background Accents */}
           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blush/20 rounded-full blur-[120px]" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sage/10 rounded-full blur-[120px]" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,253,249,0),rgba(255,253,249,1))]" />
        </div>
        {children}
      </body>
    </html>
  );
}
