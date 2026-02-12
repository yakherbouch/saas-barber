import { BrandHeader } from '../components/brand-header';
import { DashboardCards } from '../components/dashboard-cards';

const ctas = [
  'Connexion',
  'Inscription',
  'Mot de passe oublié',
  'Trouver un coiffeur',
  'Devenir coiffeur partenaire'
];

const badges = ['✔ Vérifié', '⭐ Top Coiffeur', '🔥 Très demandé'];

export default function HomePage() {
  return (
    <main className="space-y-8">
      <BrandHeader />
      <DashboardCards />

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Parcours utilisateur en français (production-ready)</h2>
        <p className="mt-2 text-slate-600">
          Flux complets pour Client, Coiffeur/Coiffeuse et Admin avec authentification JWT, contrôles RBAC et messages d’erreur localisés.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {ctas.map((cta) => (
            <button
              key={cta}
              type="button"
              className="rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              {cta}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold">Profil coiffeur premium</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
            <li>Galerie avant / après</li>
            <li>Spécialités: Homme, Femme, Enfant, Barbe, Cheveux Afro, Coloration</li>
            <li>Zone de déplacement, disponibilités et tarifs en €</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Badges de confiance</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span key={badge} className="rounded-full bg-slate-100 px-3 py-1 text-sm">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
