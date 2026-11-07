import React from 'react';

function About() {
  const coreThemes = [
    {
      title: 'Psychological Realism',
      description:
        'Dostoevsky pioneered the exploration of the fractured human psyche, capturing the raw battles between irrational impulses, profound guilt, and self-sabotage long before modern psychology formalized them.',
    },
    {
      title: 'Existential Crisis',
      description:
        'Widely regarded as a forefather of existentialism, his characters constantly wrestle with absolute free will, the search for meaning in an indifferent universe, and the weight of moral choice.',
    },
    {
      title: 'Faith vs. Rational Rationalism',
      description:
        'A defining pillar of his catalog is the fierce, unresolved friction between intellectual, cold rationalism (nihilism) and a deeply spiritual, sacrificial need for redemption and Christian grace.',
    },
  ];

  const lifeTimeline = [
    {
      year: '1821',
      title: 'Born in Moscow',
      details:
        'Raised near a hospital for the poor, exposing him from early childhood to the stark realities of human suffering, poverty, and marginalization.',
    },
    {
      year: '1849',
      title: 'The Mock Execution',
      details:
        'Arrested for participating in a radical intellectual literary circle. He was lined up before a firing squad, only for a last-minute reprieve from the Tsar to commute his sentence to hard labor.',
    },
    {
      year: '1850–1854',
      title: 'Siberian Exile',
      details:
        'Spent four grueling years in a katorga prison camp in Omsk, shackled alongside hardened criminals. This traumatic spiritual reckoning completely transformed his worldview and political ideals.',
    },
    {
      year: '1864–1880',
      title: 'The Golden Era',
      details:
        'Wrestled with severe gambling addiction, epilepsy, and crushing debt while rapidly writing his timeless masterpieces: Crime and Punishment, The Idiot, Demons, and The Brothers Karamazov.',
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Narrative Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-2">
            The Underground Profile
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
            An Explorer of the Human Soul
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-serif text-slate-700 leading-relaxed text-base md:text-lg">
          <p>
            Fyodor Dostoevsky did not write simple stories; he mapped the
            darkest, most volatile fault lines of human nature. Standing
            alongside Tolstoy as a titan of Russian literature, Dostoevsky's
            writing was forged in the fires of personal catastrophe, structural
            poverty, and profound existential isolation.
          </p>
          <p>
            His distinct literary voice emerged from a life lived on the
            absolute edge—surviving a mock execution, enduring years of brutal
            Siberian prison labor, and battling lifelong epilepsy. These raw,
            jagged experiences allowed him to dissect themes of morality,
            redemption, and human suffering with unmatched depth.
          </p>
        </div>
      </section>

      {/* Literary Pillars & Themes */}
      <section className="bg-slate-900 text-white py-16 px-6 border-y border-slate-800 shadow-inner">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h3 className="text-2xl font-serif font-bold tracking-wide text-amber-400">
              Core Existential Pillars
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              The philosophical engines driving his major works.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreThemes.map((theme, idx) => (
              <div
                key={idx}
                className="bg-slate-950 p-6 rounded-xl border border-slate-800 hover:border-amber-500/40 transition-colors duration-300"
              >
                <div className="text-amber-500 font-mono text-xs font-bold mb-3">
                  [ 0{idx + 1} ]
                </div>
                <h4 className="font-serif font-bold text-lg mb-2 text-slate-100">
                  {theme.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {theme.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Timeline Layout */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h3 className="text-2xl font-serif font-bold text-slate-900">
            Biographical Crucible
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            Key tipping points that fundamentally shifted his philosophy.
          </p>
        </div>
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-slate-200">
          {lifeTimeline.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col md:flex-row items-start relative ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline dot locator */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-amber-500 rounded-full border-4 border-slate-50 transform -translate-x-1.5 md:-translate-x-2 top-1.5 z-10 shadow shadow-amber-500/50" />

              {/* Content Panel card */}
              <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <span className="font-mono font-bold text-indigo-600 block text-lg mb-1">
                    {item.year}
                  </span>
                  <h4 className="font-serif font-bold text-slate-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Minimal Highlight Quote Block */}
      <section className="bg-amber-100/60 border-t border-amber-200 py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="font-serif italic text-xl md:text-2xl text-slate-800 mb-4 leading-relaxed">
            "The mystery of human existence lies not in just staying alive, but
            in finding something to live for."
          </p>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            — The Brothers Karamazov
          </span>
        </div>
      </section>
    </div>
  );
}

export default About;
