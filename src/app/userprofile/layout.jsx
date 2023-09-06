export default function RootLayout({ children }) {
  return (
    <main className="w-full h-screen pt-20 px-3 flex justify-center items-center">
      {children}
    </main>
  );
}
