#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'seed-data.json');

class SeededRandom {
  constructor(seed = 123456789) {
    this.seed = seed;
  }

  next() {
    this.seed = (1664525 * this.seed + 1013904223) % 4294967296;
    return this.seed / 4294967296;
  }

  pick(list) {
    return list[Math.floor(this.next() * list.length)];
  }

  pickMany(list, count) {
    const copy = [...list];
    const chosen = [];
    for (let i = 0; i < count && copy.length > 0; i += 1) {
      const index = Math.floor(this.next() * copy.length);
      chosen.push(copy.splice(index, 1)[0]);
    }
    return chosen;
  }

  int(min, max) {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  bool(probability = 0.5) {
    return this.next() < probability;
  }
}

const rng = new SeededRandom(424242);

const firstNames = [
  'Lina',
  'Amel',
  'Roxane',
  'Noah',
  'Yanis',
  'Maya',
  'Karim',
  'Sofia',
  'Camille',
  'Sarah',
  'Jules',
  'Luc',
  'Nina',
  'Mehdi',
  'Ines',
  'Aya',
  'Adam',
  'Lea',
  'Imane',
  'Hugo',
  'Jade',
  'Rania',
  'Theo',
  'Yara',
  'Ismail',
];

const lastNames = [
  'Martin',
  'Bernard',
  'Dubois',
  'Thomas',
  'Robert',
  'Richard',
  'Petit',
  'Durand',
  'Leroy',
  'Moreau',
  'Simon',
  'Laurent',
  'Lopez',
  'Mercier',
  'Garcia',
  'Faure',
  'Rousseau',
  'Blanc',
  'Garnier',
  'Chevalier',
];

const cities = [
  { city: 'Paris', postal: '75001' },
  { city: 'Lyon', postal: '69002' },
  { city: 'Marseille', postal: '13006' },
  { city: 'Toulouse', postal: '31000' },
  { city: 'Bordeaux', postal: '33000' },
  { city: 'Nantes', postal: '44000' },
  { city: 'Lille', postal: '59000' },
  { city: 'Nice', postal: '06000' },
  { city: 'Montpellier', postal: '34000' },
  { city: 'Rennes', postal: '35000' },
];

const specialties = [
  'Homme',
  'Femme',
  'Enfant',
  'Barbe',
  'Afro',
  'Coloration',
  'Balayage',
  'Boucles naturelles',
];

const services = [
  { name: 'Coupe classique', duration: 45, basePrice: 28 },
  { name: 'Coupe + Barbe', duration: 60, basePrice: 45 },
  { name: 'Coloration complète', duration: 120, basePrice: 85 },
  { name: 'Balayage', duration: 150, basePrice: 110 },
  { name: 'Coiffure événement', duration: 90, basePrice: 70 },
  { name: 'Shampoing + Brushing', duration: 40, basePrice: 35 },
];

const badges = ['Vérifié', 'Top coiffeur', 'Très demandé'];

const reviewSnippets = [
  "Super expérience, coupe nette et conseils au top.",
  "Ambiance chaleureuse, je reviendrai sans hésiter.",
  "Très pro et ponctuel, prestation parfaite.",
  "Résultat au-delà de mes attentes, merci !",
  "Prestation impeccable, coiffeur très à l'écoute.",
  "Coupe réussie, service rapide et efficace.",
  "Bon rapport qualité-prix, je recommande.",
  "Coloration sublime et tenue parfaite.",
  "Excellente maîtrise des cheveux afro, bravo.",
  "Petit retard mais résultat magnifique.",
  "Très bon échange, conseils personnalisés.",
  "Salon propre et agréable, service premium.",
];

const responses = [
  "Merci pour votre confiance, au plaisir de vous revoir !",
  "Ravi que la prestation vous ait plu, à bientôt.",
  "Merci pour votre retour, votre satisfaction est ma priorité.",
  "Avec plaisir, on se revoit très vite !",
];

const galleries = [
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1528892952291-009c663ce843',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
  'https://images.unsplash.com/photo-1544717305-2782549b5136',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91',
];

const clients = [
  'Chloe',
  'Emilie',
  'Lucas',
  'Ibrahim',
  'Nora',
  'Manon',
  'Louis',
  'Anissa',
  'Malik',
  'Omar',
  'Julie',
  'Zoe',
  'Clara',
  'Hugo',
  'Emma',
  'Raphael',
  'Leonie',
  'Pierre',
  'Fatou',
  'Nassim',
];

const availabilityTemplates = [
  { day: 'Lundi', slots: ['09:00', '11:30', '14:00', '16:30'] },
  { day: 'Mardi', slots: ['10:00', '13:00', '15:30', '18:00'] },
  { day: 'Mercredi', slots: ['09:30', '12:00', '14:30', '17:00'] },
  { day: 'Jeudi', slots: ['10:30', '13:30', '16:00', '18:30'] },
  { day: 'Vendredi', slots: ['09:00', '11:00', '15:00', '19:00'] },
  { day: 'Samedi', slots: ['09:30', '12:30', '15:30', '18:30'] },
];

function makeName() {
  return `${rng.pick(firstNames)} ${rng.pick(lastNames)}`;
}

function makeStylist(index) {
  const location = rng.pick(cities);
  const serviceCount = rng.int(3, services.length);
  const selectedServices = rng.pickMany(services, serviceCount).map((service) => ({
    name: service.name,
    durationMinutes: service.duration,
    priceEUR: service.basePrice + rng.int(-5, 25),
  }));
  const reviewCount = rng.int(3, 12);
  const avgRating = Number((rng.int(35, 48) / 10).toFixed(1));

  return {
    id: `stylist-${index + 1}`,
    name: makeName(),
    profilePhoto: rng.pick(galleries),
    gallery: rng.pickMany(galleries, rng.int(3, 6)),
    description:
      "Coiffeur passionné, spécialisé dans les coupes modernes et le conseil personnalisé.",
    experienceYears: rng.int(2, 18),
    specialties: rng.pickMany(specialties, rng.int(3, 5)),
    location: {
      city: location.city,
      postalCode: location.postal,
      travelRadiusKm: rng.int(5, 20),
    },
    availability: rng.pickMany(availabilityTemplates, rng.int(4, 6)),
    services: selectedServices,
    ratingAverage: avgRating,
    reviewCount,
    badges: rng.pickMany(badges, rng.int(1, 2)),
    verified: rng.bool(0.85),
  };
}

function makeReview(index, stylistId) {
  const rating = rng.int(3, 5);
  const hasPhoto = rng.bool(0.2);
  return {
    id: `review-${index + 1}`,
    stylistId,
    clientName: rng.pick(clients),
    rating,
    comment: rng.pick(reviewSnippets),
    date: new Date(
      Date.now() - rng.int(3, 320) * 24 * 60 * 60 * 1000,
    ).toISOString(),
    photo: hasPhoto ? rng.pick(galleries) : null,
    response: rng.bool(0.4) ? rng.pick(responses) : null,
  };
}

function makeBooking(index, stylistId) {
  const service = rng.pick(services);
  const date = new Date(
    Date.now() - rng.int(5, 200) * 24 * 60 * 60 * 1000,
  );
  return {
    id: `booking-${index + 1}`,
    stylistId,
    clientName: rng.pick(clients),
    service: service.name,
    scheduledAt: date.toISOString(),
    durationMinutes: service.duration,
    priceEUR: service.basePrice + rng.int(-5, 25),
    status: rng.pick(['completed', 'cancelled', 'no_show']),
    payment: {
      provider: 'stripe',
      status: rng.pick(['paid', 'refunded', 'partial_refund']),
      platformFeeEUR: rng.int(3, 9),
    },
  };
}

const stylists = Array.from({ length: 50 }, (_, index) => makeStylist(index));

const reviews = [];
let reviewIndex = 0;
stylists.forEach((stylist) => {
  const count = rng.int(4, 8);
  for (let i = 0; i < count; i += 1) {
    reviews.push(makeReview(reviewIndex, stylist.id));
    reviewIndex += 1;
  }
});

const bookings = [];
let bookingIndex = 0;
stylists.forEach((stylist) => {
  const count = rng.int(3, 6);
  for (let i = 0; i < count; i += 1) {
    bookings.push(makeBooking(bookingIndex, stylist.id));
    bookingIndex += 1;
  }
});

const payload = {
  metadata: {
    generatedAt: new Date().toISOString(),
    stylistsCount: stylists.length,
    reviewsCount: reviews.length,
    bookingsCount: bookings.length,
  },
  stylists,
  reviews,
  bookings,
};

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(payload, null, 2));

console.log(`Seed data generated at ${OUTPUT_PATH}`);
