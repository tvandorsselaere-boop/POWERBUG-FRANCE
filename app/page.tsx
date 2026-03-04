const badges = [
  { icon: "\u{1F3C6}", text: "20+ ans d'excellence" },
  { icon: "\u2B50", text: "8 400+ avis clients" },
  { icon: "\u{1F50B}", text: "Batterie 36 trous" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0A0A0A] to-[#0D1F13] px-6 py-16 text-white">
      <main className="flex max-w-2xl flex-col items-center gap-10 text-center">
        {/* Logo text */}
        <div className="animate-fade-in">
          <h2 className="text-lg font-bold tracking-[0.3em] text-[#00A651] uppercase">
            PowerBug
          </h2>
        </div>

        {/* Title */}
        <h1 className="animate-fade-in-delay-1 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          PowerBug arrive en{" "}
          <span className="text-[#00A651]">France</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-delay-2 max-w-lg text-lg text-zinc-400 sm:text-xl">
          Le chariot électrique de golf n°1 au Royaume-Uni, bientôt
          disponible pour les golfeurs français.
        </p>

        {/* Badges */}
        <div className="animate-fade-in-delay-3 flex flex-col gap-4 sm:flex-row sm:gap-6">
          {badges.map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/60 px-5 py-2.5 text-sm font-medium text-zinc-200 backdrop-blur-sm"
            >
              <span className="text-lg">{badge.icon}</span>
              {badge.text}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="animate-fade-in-delay-4 mt-16 text-center text-xs text-zinc-600">
        Distributeur exclusif France | Site réalisé par Facile-IA
      </footer>
    </div>
  );
}
