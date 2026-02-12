#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const output = path.join(__dirname, '..', 'data', 'seed-data.json');

class Rng {
  constructor(seed = 20260212) { this.seed = seed; }
  next() { this.seed = (this.seed * 9301 + 49297) % 233280; return this.seed / 233280; }
  int(min, max) { return Math.floor(this.next() * (max - min + 1)) + min; }
  pick(arr) { return arr[this.int(0, arr.length - 1)]; }
  pickMany(arr, n) {
    const copy = [...arr];
    const out = [];
    for (let i = 0; i < n && copy.length; i++) out.push(copy.splice(this.int(0, copy.length - 1), 1)[0]);
    return out;
  }
}

const rng = new Rng();
const firstNames = ['Camille', 'Nadia', 'Yassine', 'Léa', 'Sofiane', 'Mélanie', 'Karima', 'Antoine', 'Nora', 'Hakim', 'Sabrina', 'Jules', 'Inès', 'Mehdi', 'Fatou', 'Louis'];
const lastNames = ['Martin', 'Leroux', 'Benali', 'Dupont', 'Rousseau', 'Lambert', 'Petit', 'Garnier', 'Chevalier', 'Bernard', 'Leclerc'];
const cities = [
  ['Paris', '75011'], ['Lyon', '69003'], ['Marseille', '13008'], ['Toulouse', '31000'], ['Bordeaux', '33000'],
  ['Bruxelles', '1000'], ['Liège', '4000'], ['Genève', '1201'], ['Lausanne', '1003'], ['Nantes', '44000']
];
const specialties = ['Homme', 'Femme', 'Enfant', 'Barbe', 'Cheveux Afro', 'Coloration'];
const services = ['Coupe classique', 'Coupe + barbe', 'Brushing', 'Coloration', 'Balayage', 'Tresses protectrices'];
const reviewTexts = [
  'Très satisfait de la coupe, coiffeuse ponctuelle et très professionnelle.',
  'Service impeccable, excellent contact et résultat superbe.',
  'Je recommande vivement, prestation soignée à domicile.',
  'Bon rapport qualité-prix, je referai appel à ce coiffeur.',
  'Très à l’écoute, conseils utiles et résultat naturel.',
  'Petite attente au début mais la qualité était au rendez-vous.'
];

const stylists = Array.from({ length: 50 }, (_, i) => {
  const [city, postalCode] = rng.pick(cities);
  return {
    id: `stylist-${i + 1}`,
    name: `${rng.pick(firstNames)} ${rng.pick(lastNames)}`,
    description: 'Professionnel(le) mobile spécialisé(e) dans les prestations premium à domicile.',
    experienceYears: rng.int(2, 20),
    specialties: rng.pickMany(specialties, rng.int(3, 5)),
    location: { city, postalCode, country: ['FR', 'BE', 'CH'][rng.int(0, 2)] },
    availability: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].slice(0, rng.int(4, 6)),
    services: rng.pickMany(services, rng.int(3, 6)).map((name) => ({ name, priceEUR: rng.int(25, 140) })),
    ratingAverage: Number((rng.int(34, 49) / 10).toFixed(1)),
    reviewCount: 6,
    badges: rng.pickMany(['Vérifié', 'Top Coiffeur', 'Très demandé'], rng.int(1, 2)),
    verified: true,
    profilePhoto: `https://images.unsplash.com/photo-15${rng.int(10000000, 99999999)}`
  };
});

const reviews = Array.from({ length: 300 }, (_, i) => ({
  id: `review-${i + 1}`,
  stylistId: `stylist-${(i % 50) + 1}`,
  clientName: `${rng.pick(firstNames)} ${rng.pick(lastNames)}`,
  rating: rng.pick([3, 4, 4, 5, 5]),
  comment: rng.pick(reviewTexts),
  response: rng.next() > 0.5 ? 'Merci pour votre retour, au plaisir de vous recoiffer bientôt.' : null,
  date: new Date(Date.now() - rng.int(1, 330) * 86400000).toISOString()
}));

const bookings = Array.from({ length: 240 }, (_, i) => ({
  id: `booking-${i + 1}`,
  stylistId: `stylist-${rng.int(1, 50)}`,
  status: rng.pick(['EN_ATTENTE', 'CONFIRMEE', 'TERMINEE', 'ANNULEE']),
  scheduledAt: new Date(Date.now() - rng.int(1, 220) * 86400000).toISOString(),
  totalEUR: rng.int(30, 180),
  currency: 'EUR',
  paymentStatus: rng.pick(['PAYEE', 'ECHEC', 'REMBOURSEE'])
}));

const data = {
  metadata: {
    generatedAt: new Date().toISOString(),
    stylistsCount: stylists.length,
    reviewsCount: reviews.length,
    bookingsCount: bookings.length,
    marketLocale: 'fr-FR'
  },
  stylists,
  reviews,
  bookings
};

fs.writeFileSync(output, JSON.stringify(data, null, 2));
console.log(`French marketplace seed generated: ${output}`);
