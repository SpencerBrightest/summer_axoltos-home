const siteConfig = {
  businessName: 'Summer Axolotls Home',
  whatsappNumber: '14242409780',
  phoneNumber: '+1 (424) 240-9780',
  email: 'summerhome671@gmail.com',
  location: 'Austin, Texas, USA',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  tiktok: 'https://tiktok.com'
};

const localGalleryImages = [
  '../image/WhatsApp Image 2026-10-26 at 15.56.32.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.35.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.37.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.38.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.39 (1).jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.39.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.40 (1).jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.40.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.41 (1).jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.41.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.42.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.43.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.44.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.45.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.46.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.47 (1).jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.47.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.48.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.49 (1).jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.49 (2).jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.49.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.50.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.51.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.53 (1).jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.53.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.54 (1).jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.54 (2).jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.54.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.55 (1).jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.55 (2).jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.55.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.56 (1).jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.56 (2).jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.56.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.57 (1).jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.57.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.58 (1).jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.58 (2).jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.58.jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.59 (1).jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.59 (2).jpeg',
  '../image/WhatsApp Image 2026-10-26 at 15.56.59.jpeg'
];

const products = localGalleryImages.map((image, index) => ({
  id: `gallery-${index + 1}`,
  name: `Axolotl Photo ${index + 1}`,
  category: 'Gallery',
  price: 150 + (index % 5) * 25,
  stock: 1,
  image,
  gallery: [image],
  description: 'A photo from the Summer Axolotls Home gallery. This image is available for viewing in the catalog and can be shared or ordered through WhatsApp.',
  featured: index < 4,
  reviews: [
    { name: 'Customer', location: 'Local buyer', rating: 5, text: 'Beautiful axolotl photo from the Summer Axolotls Home gallery.' }
  ]
}));

const testimonials = [
  {
    name: 'Alicia M.',
    location: 'Austin, TX',
    rating: 5,
    text: 'Placeholder testimonial for demo purposes. Replace with real customer feedback before launch.',
    isPlaceholder: true
  },
  {
    name: 'Jordan P.',
    location: 'Dallas, TX',
    rating: 5,
    text: 'Placeholder testimonial for demo purposes. Replace with real customer feedback before launch.',
    isPlaceholder: true
  },
  {
    name: 'Nia S.',
    location: 'Houston, TX',
    rating: 4,
    text: 'Placeholder testimonial for demo purposes. Replace with real customer feedback before launch.',
    isPlaceholder: true
  },
  {
    name: 'Ethan R.',
    location: 'San Antonio, TX',
    rating: 5,
    text: 'Placeholder testimonial for demo purposes. Replace with real customer feedback before launch.',
    isPlaceholder: true
  }
];
