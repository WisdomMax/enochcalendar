import Calendar from "@/components/Calendar/Calendar";

export default function Home() {
  return (
    <main className="min-h-screen font-sans antialiased selection:bg-cyan-500/30 overflow-x-hidden relative flex flex-col items-center justify-start pt-4 md:pt-12 pb-20">
      {/* Original Image as Background (No filters/overlays) */}
      <div 
        className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/enoch_bg.webp')" }}
      />

      {/* Strong Vignette for Sidebar Readability */}
      <div className="fixed inset-0 z-[-1] bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none hidden lg:block" />
      <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none sm:hidden" />

      <Calendar />
    </main>
  );
}
