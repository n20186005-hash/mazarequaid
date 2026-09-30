// Shared, language-neutral facts for Mazar-e-Quaid (Muhammad Ali Jinnah Mausoleum).
// Single source of truth — both the Urdu (/) and English (/en/) pages read from here
// so ratings, phone, address, coordinates and opening hours never diverge.

export const SITE = {
  name: 'Muhammad Ali Jinnah Mausoleum (Mazar-e-Quaid)',
  nameUr: 'مزارِ قائد اعظم محمد علی جناح',
  shortUr: 'مزارِ قائد',
  // Latest snapshot from Google Maps (Sept 2026), per provided attraction data.
  ratingValue: '4.6',
  reviewCount: '15009',
  phone: '+923102448409',
  phoneDisplay: '+92 310 2448409',
  address: {
    streetAddress: 'Muhammad Ali Jinnah Road, Central Jacob Lines',
    addressLocality: 'Karachi',
    addressRegion: 'Sindh',
    addressCountry: 'PK',
  },
  geo: {
    latitude: 24.875354,
    longitude: 67.040835,
  },
  plusCode: 'V2GR+59 Central Jacob Lines, Karachi',
  mapsUrl: 'https://maps.app.goo.gl/hnCrj26Z2LjHTYx28',
  mapsPlaceUrl: 'https://www.google.com/maps/place/Mazar-e-Quaid/',
  // isAccessibleForFree: the national monument is free to enter during official hours.
  isAccessibleForFree: true,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Friday', 'Saturday', 'Sunday'],
      opens: '14:00',
      closes: '17:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Wednesday', 'Thursday'],
      opens: '10:00',
      closes: '17:30',
    },
  ],
  sameAs: [
    'https://maps.app.goo.gl/hnCrj26Z2LjHTYx28',
    'https://www.google.com/maps/place/Mazar-e-Quaid/',
    'https://www.tourism.gov.pk/',
    'https://sindh.gov.pk/',
  ],
} as const;

// Urdu display labels for the opening-hours table (local time).
export const hoursUr: [string, string][] = [
  ['پیر', 'دوپہر ۲ تا شام ۵:۳۰'],
  ['منگل', 'دوپہر ۲ تا شام ۵:۳۰'],
  ['بدھ', 'صبح ۱۰ تا شام ۵:۳۰'],
  ['جمعرات', 'صبح ۱۰ تا شام ۵:۳۰'],
  ['جمعہ', 'دوپہر ۲ تا شام ۵:۳۰'],
  ['ہفتہ', 'دوپہر ۲ تا شام ۵:۳۰'],
  ['اتوار', 'دوپہر ۲ تا شام ۵:۳۰'],
];

// English display labels for the opening-hours table (local time).
export const hoursEn: [string, string][] = [
  ['Monday', '2:00 PM – 5:30 PM'],
  ['Tuesday', '2:00 PM – 5:30 PM'],
  ['Wednesday', '10:00 AM – 5:30 PM'],
  ['Thursday', '10:00 AM – 5:30 PM'],
  ['Friday', '2:00 PM – 5:30 PM'],
  ['Saturday', '2:00 PM – 5:30 PM'],
  ['Sunday', '2:00 PM – 5:30 PM'],
];
