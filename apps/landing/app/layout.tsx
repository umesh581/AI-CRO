import "./globals.css";
import type { ReactNode } from "react";
import Script from "next/script";

export const metadata = {
  title: "AI CRO Landing",
  description: "CRO landing page template"
};

const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script id="clarity-placeholder" strategy="afterInteractive">
          {clarityId
            ? `// Microsoft Clarity placeholder. Replace with official snippet as needed.\nconsole.info('Clarity placeholder loaded: ${clarityId}');`
            : "// Microsoft Clarity placeholder: set NEXT_PUBLIC_CLARITY_ID to enable."}
        </Script>
      </body>
    </html>
  );
}
