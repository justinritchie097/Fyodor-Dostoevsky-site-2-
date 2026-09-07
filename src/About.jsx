import React from 'react';

export default function DostoevskyProfile() {
  const timelineEvents = [
    {
      year: "1821",
      title: "Born in Moscow",
      description: "Born into a strict household; his father was a military surgeon at a charity hospital, exposing young Fyodor to the depths of human poverty early on."
    },
    {
      year: "1846",
      title: "Literary Debut",
      description: "Published his first novella, 'Poor Folk', which was hailed by critics as Russia's first social novel and earned him instant literary fame."
    },
    {
      year: "1849",
      title: "Mock Execution & Siberia",
      description: "Arrested for participating in the Petrashevsky Circle (a secret intellectual group). He faced a firing squad, only to be reprieved at the absolute last second and sentenced to 4 years of hard labor in a Siberian prison camp."
    },
    {
      year: "1860s",
      title: "The Golden Era",
      description: "Returned to St. Petersburg. Despite heavy gambling debts, epilepsy, and immense personal grief, he authored his monumental masterworks: 'Crime and Punishment' and 'The Idiot'."
    },
    {
      year: "1880",
      title: "The Karamazov Peak",
      description: "Delivered his famous Pushkin Speech and completed 'The Brothers Karamazov', cementing his legacy as a titan of Russian literature just months before his death in 1881."
    }
  ];

  const masterpieces = [
    {
      title: "Crime and Punishment",
      year: "1866",
      quote: "Extraordinary men have a right to commit any crime...",
      description: "Follows Rodion Raskolnikov, an impoverished former student who tests a self-styled 'extraordinary man' theory by murdering a pawnbroker, sparking a psychological nightmare of guilt and redemption.",
      themes: ["Guilt", "Morality", "Siberia", "Redemption"]
    },
    {
      title: "The Brothers Karamazov",
      year: "1880",
      quote: "If God does not exist, everything is permitted.",
      description: "A deeply philosophical courtroom drama centering on patricide. It explores faith, free will, and morality through three brothers representing the spirit, the intellect, and the flesh.",
      themes: ["Faith vs Doubt", "Free Will", "Patricide", "Ethics"]
    },
    {
      title: "Notes from Underground",
      year: "1864",
      quote: "I am a sick man... I am a spiteful man.",
      description: "Widely regarded as the world's first existentialist novella. A bitter, alienated former civil servant rails against Western rationalism, utopianism, and deterministic logic.",
      themes: ["Existentialism", "Isolation", "Free Will", "Nihilism"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Hero Section */}
      <header className="relative bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800/60 py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500">1821 – 1881</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-slate-100 mt-2 mb-6">
            Fyodor Dostoevsky
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-serif italic leading-relaxed max-w-2xl mx-auto">
            "To study the man and the life — that is what I am mainly concerned with."
          </p>
          <div className="w-16 h-0.5 bg-amber-500/60 mx-auto mt-8"></div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-6xl mx-auto px-6 py-16 grid gap-16 lg:grid-cols-3 items-start">
        
        {/* Left column: Biography & Philosophical Core */}
        <div className="lg:col-span-1 space-y-10">
          <section className="bg-slate-900/40 border border-slate-900 rounded-xl p-6">
            <h2 className="text-lg font-serif font-semibold text-amber-400 mb-4 tracking-wide uppercase text-xs">
              Philosophical Core
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Dostoevsky's literary works explore human psychology in the troubled political, social, and spiritual atmospheres of 19th-century Russia. 
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              His writings engage heavily with **existentialism**, the psychological roots of crime, theological debates regarding suffering, and dangerous political ideologies like radical nihilism.
            </p>
          </section>

          {/* Life Timeline */}
          <section>
            <h2 className="text-xl font-serif font-bold text-slate-200 mb-6 flex items-center gap-2">
              <span>Timeline of a Stormy Life</span>
            </h2>
            <div className="relative border-l border-slate-800 ml-2 space-y-8">
              {timelineEvents.map((event, index) => (
                <div key={index} className="relative pl-6">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-amber-500 border border-slate-950"></div>
                  <span className="block text-xs font-mono font-semibold text-amber-500/90">{event.year}</span>
                  <h3 className="text-sm font-semibold text-slate-200 mt-0.5">{event.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">{event.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column: Major Masterpieces (Grid/Stack Layout) */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-serif font-bold text-slate-200 mb-6">
              Major Masterpieces
            </h2>
            <div className="space-y-6">
              {masterpieces.map((novel, index) => (
                <article 
                  key={index} 
                  className="bg-slate-900/30 border border-slate-900 rounded-xl p-6 hover:border-amber-500/20 transition-colors"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h3 className="text-xl font-serif font-semibold text-slate-200">
                      {novel.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-500">Published: {novel.year}</span>
                  </div>
                  
                  <blockquote className="text-xs font-serif italic text-amber-500/80 border-l border-amber-500/30 pl-3 my-3">
                    {novel.quote}
                  </blockquote>

                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {novel.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-900">
                    {novel.themes.map((theme, idx) => (
                      <span 
                        key={idx} 
                        className="text-[10px] font-mono tracking-wide uppercase bg-slate-950 text-slate-400 px-2.5 py-0.5 rounded border border-slate-800"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

      </main>

      {/* Mini Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs font-mono text-slate-600">
        <p>Built with React & Tailwind CSS — Exploring 19th Century Existentialism</p>
      </footer>
    </div>
  );
}
