import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";

const outfit = Outfit({subsets:['latin']});

export const metadata = {
  title: "QuickVid",
  description: "From Concept to Video—Seamlessly Crafted by Advanced AI",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={outfit.className}
      >
        <Provider>
          {children}
        </Provider>
        
      </body>
    </html>
    </ClerkProvider>
  );
}
