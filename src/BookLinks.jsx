
function BookLinks() {
   




  const novels = [
    {
      title: "Crime and Punishment",
      year: "1866",
      description: "Follows Rodion Raskolnikov, an impoverished former law student in St. Petersburg who formulates a theory that extraordinary men are above the moral law. He murders a corrupt pawnbroker to test his theory, triggering a profound mental breakdown and psychological battle with guilt, law, and redemption.",
      themes: ["Guilt and Redemption", "The Extraordinary Man Theory", "Morality", "Suffering"]
    },
    {
      title: "The Idiot",
      year: "1869",
      description: "Dostoevsky attempts to portray a truly good and innocent man—Prince Lev Nikolayevich Myshkin. Upon returning to corrupt high-society St. Petersburg, Myshkin’s open-heartedness, simplicity, and lack of cynicism lead many to foolishly dismiss him as an 'idiot,' ultimately drawing him into tragic love affairs and social catastrophe.",
      themes: ["Innocence vs. Corruption", "Christian Love", "Human Goodness", "Idealism"]
    },
    {
      title: "Demons",
      year: "1872",
      description: "A dark political satire and psychological tragedy depicting the rise of radical ideology and nihilism in a provincial Russian town. A group of revolutionaries led by Pyotr Verkhovensky and influenced by Nikolai Stavrogin instigate chaos, morality decay, and violence, predicting the revolutionary turmoils of 20th-century history.",
      themes: ["Political Extremism", "Nihilism", "Morality", "Destructive Ideology"]
    },
    {
      title: "The Brothers Karamazov",
      year: "1880",
      description: "Dostoevsky’s final masterpiece centers on the patricide of Fyodor Karamazov and the distinct philosophies of his three sons: Dmitri (the passionate sensualist), Ivan (the rational intellectual), and Alyosha (the spiritual novice). It features famous standalone sequences like 'The Grand Inquisitor' and delves deeply into theological, ethical, and existential questions.",
      themes: ["Faith vs. Doubt", "Free Will", "Morality", "Family Dynamics", "Theological Debate"]
    },
    {
      title: "Notes from Underground",
      year: "1864",
      description: "Widely considered one of the first existentialist novels, this novella is written as the bitter, rambling diary of an alienated, unnamed former civil servant living in St. Petersburg. The 'Underground Man' attacks Western rationalism, utopianism, and deterministic views of human nature.",
      themes: ["Existentialism", "Free Will vs. Rational Determinism", "Isolation", "Self-Sabotage"]
    }
  ];

  return (
    <>
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      {/* Header Section */}
      <header className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center border-b border-slate-800">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-amber-400 mb-4">
          Fyodor Dostoevsky
        </h1>
        <p className="text-lg text-slate-400 italic max-w-2xl mx-auto leading-relaxed">
          "To study the man and the life — that is what I am mainly concerned with."
          <span className="block text-sm font-semibold tracking-wider uppercase text-slate-500 mt-2 not-italic">
            — Major Literary Works
          </span>
        </p>
      </header>

      {/* Grid Layout Container */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {novels.map((novel, index) => (
            <article 
              key={index} 
              className="flex flex-col justify-between bg-slate-800/50 border border-slate-800 rounded-xl p-6 transition-all duration-300 hover:border-amber-500/40 hover:bg-slate-800"
            >
              <div>
                {/* Title & Meta Info */}
                <div className="mb-4">
                  <h2 className="text-xl font-serif font-semibold text-slate-200 group-hover:text-amber-400 line-clamp-2">
                    {novel.title}
                  </h2>
                  <div className="text-xs font-mono tracking-wider text-amber-500/80 mt-1">
                    Published: {novel.year}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {novel.description}
                </p>
              </div>

              {/* Badges / Key Themes */}
              <div className="pt-4 border-t border-slate-800/80">
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Key Themes:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {novel.themes.map((theme, idx) => (
                    <span 
                      key={idx} 
                      className="inline-block text-[11px] font-medium bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-700/60"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Footer Section */}
      <footer className="max-w-4xl mx-auto px-6 py-8 text-center border-t border-slate-800 text-xs tracking-wide text-slate-500">
        <p>A curated overview of Fyodor Dostoevsky's major novels.</p>
      </footer>
    </div>
  );

</>
)}
export default BookLinks