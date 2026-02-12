import { Request, Response } from 'express';
import seed from '../../../data/seed-data.json' with { type: 'json' };

export const marketplaceController = {
  listHairdressers(req: Request, res: Response) {
    const city = req.query.ville?.toString().toLowerCase();
    const result = seed.stylists.filter((stylist) =>
      city ? stylist.location.city.toLowerCase().includes(city) : true
    );
    return res.status(200).json(result);
  },

  listReviews(_req: Request, res: Response) {
    return res.status(200).json(seed.reviews);
  },

  adminMetrics(_req: Request, res: Response) {
    const completed = seed.bookings.filter((b) => b.status === 'completed');
    const revenue = completed.reduce((acc, booking) => acc + booking.priceEUR, 0);
    return res.status(200).json({
      reservationsTotal: seed.bookings.length,
      reservationsTerminees: completed.length,
      revenusBrutsEUR: Number(revenue.toFixed(2)),
      satisfactionMoyenne: 4.4,
      commissionRate: 0.2
    });
  }
};
