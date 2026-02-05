# SaaS Barber - Dataset & Blueprint

Ce dépôt initialise un jeu de données réaliste et réutilisable pour une marketplace de coiffure (web + mobile), avec un objectif de crédibilité “production ready”.

## Ce qui est inclus

- 50 profils de coiffeurs complets (photo, galerie, spécialités, services, badges, disponibilité, vérification).
- 300+ avis clients réalistes (notes variées, commentaires, photos optionnelles, réponse du coiffeur).
- Des réservations passées (statuts variés, paiements, commissions).

## Génération des données

Les données sont générées de manière déterministe pour rester reproductibles.

```bash
npm run generate:seed
```

Cela génère `data/seed-data.json` avec les sections suivantes :

- `stylists`
- `reviews`
- `bookings`

## Prochaines étapes possibles

- Connecter ces données à un backend (NestJS + PostgreSQL + Prisma).
- Exposer une API publique pour les clients mobile/web.
- Ajouter un onboarding et une authentification complète.
