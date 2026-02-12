const cards = [
  { title: 'Réservations ce mois', value: '1 284', subtitle: '+18% vs mois dernier' },
  { title: 'Satisfaction client', value: '4,7 / 5', subtitle: 'Basée sur 12 493 avis' },
  { title: 'Revenus plateforme', value: '86 250 €', subtitle: 'Commission moyenne 20%' }
];

export function DashboardCards() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <article key={card.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">{card.title}</p>
          <p className="mt-2 text-2xl font-semibold">{card.value}</p>
          <p className="mt-1 text-xs text-slate-500">{card.subtitle}</p>
        </article>
      ))}
    </section>
  );
}
