/**
 * DIF Pools Care Services — Product Catalog
 *
 * To add a new product, append an object to this array.
 * No component code needs to change.
 *
 * theme: 'blue' | 'cyan' | 'teal' | 'indigo' | 'emerald' | 'orange'
 */

export const products = [
  {
    id: 1,
    name: 'Chlorine 65%',
    subtitle: 'High-Strength Pool Sanitiser',
    category: 'Granular Chlorine',
    badge: 'Pool Chemical',
    image: '/products/chlorine65.png',
    alt: 'Chlorine 65% Granular Pool Sanitiser',
    inStock: true,
    rating: 4.9,
    theme: 'blue',
    description:
      'A trusted granular calcium hypochlorite sanitiser delivering 65% available chlorine. Ideal for regular shock treatments, algae prevention, and maintaining pristine water clarity in both residential and commercial pools.',
    specs: [
      ['Active Chlorine', '65%'],
      ['Form', 'Granular'],
      ['Application', 'Shock & Routine'],
      ['Pool Type', 'All Pool Types'],
    ],
    features: [
      'Fast-dissolving granules for rapid sanitisation',
      'Controls algae, bacteria & harmful pathogens',
      'Suitable for shock dosing and weekly treatment',
      'Professionally used by DIF technicians on-site',
    ],
    whatsappMessage:
      'Hi DIF Pools, I am interested in the Chlorine 65% product. Please send me more details and pricing.',
  },
  {
    id: 2,
    name: 'Chlorine 90%',
    subtitle: 'Ultra-Strength Pool Sanitiser',
    category: 'Trichloro Tablets / Granules',
    badge: 'Premium Grade',
    image: '/products/chlorine90.png',
    alt: 'Chlorine 90% Trichloro Pool Sanitiser',
    inStock: true,
    rating: 5.0,
    theme: 'cyan',
    description:
      'Our highest-concentration sanitiser with 90% available chlorine, formulated for aggressive shock treatments, heavily loaded commercial pools, and rapid algae eradication. A small dose goes a very long way.',
    specs: [
      ['Active Chlorine', '90%'],
      ['Form', 'Granular/Tablet'],
      ['Application', 'Heavy Shock'],
      ['Pool Type', 'Commercial & Residential'],
    ],
    features: [
      'Ultra-high concentration for maximum sanitising power',
      'Ideal for severe green pool shock & commercial use',
      'Slow-dissolving tablet form for sustained release',
      'Preferred by DIF experts for emergency algae recovery',
    ],
    whatsappMessage:
      'Hi DIF Pools, I am interested in the Chlorine 90% product. Please send me more details and pricing.',
  },
];
