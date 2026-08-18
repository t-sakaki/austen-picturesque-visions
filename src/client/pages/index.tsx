import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Picturesque Visions - Jane Austen Landscape Explorer</title>
        <meta name="description" content="An interactive experience exploring Jane Austen's landscape descriptions through aesthetic lenses." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-austen-cream text-austen-charcoal">
        {/* Header */}
        <header className="border-b-2 border-austen-gold py-6 px-8">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h1 className="text-3xl font-serif italic tracking-wide text-austen-charcoal">
              Picturesque Visions
            </h1>
            <nav className="space-x-8 text-sm uppercase tracking-widest text-austen-charcoal/70">
              <Link href="/picturesque" className="hover:text-austen-gold transition-colors">
                Picturesque
              </Link>
              <Link href="/social-class" className="hover:text-austen-gold transition-colors">
                Social Class
              </Link>
              <Link href="/psychological" className="hover:text-austen-gold transition-colors">
                Psychological
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-8 py-16 text-center">
          <h2 className="text-4xl font-serif mb-6 text-austen-charcoal">
            An Interactive Landscape Experience
          </h2>
          <p className="text-lg text-austen-charcoal/80 max-w-2xl mx-auto leading-relaxed mb-8">
            Step into the world of Jane Austen through the lens of landscape aesthetics.
            Select a lens below to begin your journey through Regency-era England.
          </p>

          {/* Lens Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/picturesque" className="group">
              <div className="bg-white rounded-lg shadow-md border border-austen-gold/20 p-6 h-full hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-austen-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-xl">P</span>
                </div>
                <h3 className="text-xl font-serif text-austen-charcoal mb-2 group-hover:text-austen-gold transition-colors">
                  Picturesque Lens
                </h3>
                <p className="text-sm text-austen-charcoal/70">
                  Roughness, variety, decay, painterly composition
                </p>
              </div>
            </Link>

            <Link href="/social-class" className="group">
              <div className="bg-white rounded-lg shadow-md border border-austen-gold/20 p-6 h-full hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-austen-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-xl">S</span>
                </div>
                <h3 className="text-xl font-serif text-austen-charcoal mb-2 group-hover:text-austen-gold transition-colors">
                  Social Class Lens
                </h3>
                <p className="text-sm text-austen-charcoal/70">
                  Status indicators, estate analysis, moral dimension
                </p>
              </div>
            </Link>

            <Link href="/psychological" className="group">
              <div className="bg-white rounded-lg shadow-md border border-austen-gold/20 p-6 h-full hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-austen-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-xl">Ψ</span>
                </div>
                <h3 className="text-xl font-serif text-austen-charcoal mb-2 group-hover:text-austen-gold transition-colors">
                  Psychological Lens
                </h3>
                <p className="text-sm text-austen-charcoal/70">
                  Emotional visualization, atmospheric metaphor, internal states
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-4xl mx-auto px-8 py-12">
          <h3 className="text-2xl font-serif text-center mb-8 text-austen-charcoal">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-austen-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">1</span>
              </div>
              <h4 className="font-serif text-lg mb-2 text-austen-charcoal">Select a Lens</h4>
              <p className="text-sm text-austen-charcoal/70">
                Choose from Picturesque, Social Class, or Psychological perspectives
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-austen-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">2</span>
              </div>
              <h4 className="font-serif text-lg mb-2 text-austen-charcoal">Describe the Scene</h4>
              <p className="text-sm text-austen-charcoal/70">
                Enter a landscape description or select from Austen's works
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-austen-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">3</span>
              </div>
              <h4 className="font-serif text-lg mb-2 text-austen-charcoal">Generate & Explore</h4>
              <p className="text-sm text-austen-charcoal/70">
                Receive AI-optimized prompts and explore the aesthetic interpretation
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-austen-gold/20 mt-16 py-8 px-8">
          <div className="max-w-4xl mx-auto text-center text-sm text-austen-charcoal/60">
            <p>An interactive experience for Emilia — translating Jane Austen's landscape descriptions into visual journeys.</p>
            <p className="mt-2">Built with Next.js + Tailwind CSS • Phase 1 Foundation</p>
          </div>
        </footer>
      </main>
    </>
  );
}
