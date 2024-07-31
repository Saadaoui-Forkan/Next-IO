import "@/assets/globals.css";

export const metadata = {
  title: "Request&Response",
  description: "Q&A question answer application using Next.js",
  keywords: "question, answer, request, response",
  icons: {
    icon: "/q-a.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="g-zinc-100">{children}</body>
    </html>
  );
}
