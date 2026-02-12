export function BrandHeader() {
  return (
    <header className="mb-8 rounded-2xl bg-brand-900 p-6 text-white shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-brand-100">CoiffeDom</p>
          <h1 className="mt-2 text-3xl font-semibold">La beauté à domicile, en toute confiance</h1>
          <p className="mt-2 text-brand-100">
            Marketplace premium pour réserver des coiffeurs et coiffeuses vérifiés partout en France, Belgique et Suisse.
          </p>
        </div>
        <div className="rounded-full bg-white/10 px-4 py-2 text-sm">Logo</div>
      </div>
    </header>
  );
}
