import Head from 'next/head';

export default function SocialClassPage() {
  return (
    <>
      <Head>
        <title>Social Class Lens — Picturesque Visions</title>
        <meta name="description" content="Analyze Austen's landscapes through the lens of social class: status indicators, estate analysis, moral dimension." />
      </Head>

      <main className="min-h-screen bg-austen-cream text-austen-charcoal">
        {/* Header */}
        <header className="border-b-2 border-austen-gold py-4 px-8">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-serif italic tracking-wide text-austen-charcoal">
              Picturesque Visions
            </h1>
            <nav className="space-x-6 text-sm uppercase tracking-widest text-austen-charcoal/70">
              <a href="/" className="hover:text-austen-gold transition-colors">Home</a>
              <a href="/picturesque" className="hover:text-austen-gold transition-colors">Picturesque</a>
              <a href="/social-class" className="text-austen-gold font-medium">Social Class</a>
              <a href="/psychological" className="hover:text-austen-gold transition-colors">Psychological</a>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-austen-gold"></div>
            <h2 className="text-3xl font-serif text-austen-charcoal">Social Class Lens</h2>
          </div>
          <p className="text-lg text-austen-charcoal/80 max-w-2xl leading-relaxed mb-8">
            Every estate tells a story about its inhabitants. Analyze landscape elements to deduce
            wealth, status, values, and the moral dimension reflected in the environment.
          </p>

          {/* Scene Input */}
          <div className="bg-white rounded-lg shadow-sm border border-austen-gold/20 p-6 mb-8">
            <label className="block text-sm uppercase tracking-widest text-austen-charcoal/70 mb-2">
              Scene Description
            </label>
            <textarea
              className="w-full border border-austen-gold/30 rounded-md p-4 bg-austen-cream text-austen-charcoal font-serif resize-none focus:outline-none focus:border-austen-gold transition-colors"
              rows={4}
              placeholder="e.g. a grand estate with manicured lawns, formal gardens, and a stone pavilion"
            >a grand estate with manicured lawns, formal gardens, and a stone pavilion overlooking the grounds</textarea>
            <div className="flex justify-between mt-3">
              <label className="block text-sm uppercase tracking-widest text-austen-charcoal/70">
                Status Indicator
              </label>
              <select className="border border-austen-gold/30 rounded-md bg-austen-cream text-austen-charcoal font-serif px-3 py-2 focus:outline-none focus:border-austen-gold transition-colors">
                <option>Architectural Hierarchy</option>
                <option>Wealth Manifestation</option>
                <option>Ordered vs. Wild</option>
                <option>Decline / Decay</option>
              </select>
            </div>
          </div>

          {/* Prompt Preview */}
          <div className="bg-white rounded-lg shadow-sm border border-austen-gold/20 p-6 mb-8">
            <h3 className="text-lg font-serif mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-austen-gold inline-block"></span>
              Generated Prompt Preview
            </h3>
            <div className="bg-austen-cream border border-austen-gold/20 rounded-md p-4 font-mono text-sm text-austen-charcoal/80 whitespace-pre-wrap max-h-64 overflow-y-auto">
{A landscape scene analyzed through the lens of social class. The visual elements reveal the architectural hierarchy of the inhabitants through formal, geometric patterns. Show symmetrical design, maintained plantings alongside wild paths breaking through ordered layouts. The scene should encourage an analysis of the relationship between cultivation and humanity reflected in the environment. Analyze Pemberley's grounds where ownership and natural beauty. Aesthetic: authentic, substantial, refined nature.}

Gemini Optimized:
---
API: gemini-1.5-flash
System: You are an aesthetic landscape visualization assistant.
Style: socialClass-focused aesthetic
---

BytePlus Optimized:
---
Model: pro-edit-v1
Task: text_to_image
Quality: high
Lens: socialClass
---
            </div>
            <div className="flex gap-3 mt-4">
              <button className="bg-austen-gold text-white px-5 py-2 rounded-md text-sm uppercase tracking-widest hover:bg-austen-charcoal transition-colors">
                Copy Prompt
              </button>
              <button className="bg-transparent border border-austen-gold/30 text-austen-charcoal px-5 py-2 rounded-md text-sm uppercase tracking-widest hover:bg-austen-gold/10 transition-colors">
                Generate Image
              </button>
            </div>
          </div>

          {/* Lens Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-austen-gold/20 p-6">
              <h3 className="text-lg font-serif mb-3 text-austen-charcoal">Key Indicators</h3>
              <ul className="space-y-2 text-sm text-austen-charcoal/80">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-austen-gold mt-1.5 inline-block shrink-0"></span>
                  <span>Manicured lawns &amp; formal gardens</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-austen-gold mt-1.5 inline-block shrink-0"></span>
                  <span>Architectural symmetry &amp; grandeur</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-austen-gold mt-1.5 inline-block shrink-0"></span>
                  <span>Estate gates, fencing, pavilions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-austen-gold mt-1.5 inline-block shrink-0"></span>
                  <span>Tension: ordered vs. wild elements</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-austen-gold/20 p-6">
              <h3 className="text-lg font-serif mb-3 text-austen-charcoal">Academic Context</h3>
              <p className="text-sm text-austen-charcoal/80 leading-relaxed">
                In <em>Pride and Prejudice</em>, Pemberley's "natural beauty" is not wild — it is a
                refined version of nature, cultivated by Darcy's family to display both wealth and
                good taste. The landscape becomes a moral mirror.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-austen-gold/20 mt-12 py-6 px-8">
          <div className="max-w-4xl mx-auto text-center text-sm text-austen-charcoal/60">
            <p>Picturesque Visions — Phase 1 Foundation • Built with Next.js + Tailwind CSS</p>
          </div>
        </footer>
      </main>
    </>
  );
}
