import versaceEros from "@/assets/versace-eros.jpg";
import diorSauvage from "@/assets/dior-sauvage.jpg";
import amberOud from "@/assets/amber-oud.jpg";
import bleuChanel from "@/assets/bleu-chanel.jpg";
import tomFord from "@/assets/tom-ford.jpg";
import yslPerfume from "@/assets/ysl-perfume.jpg";
import volarePoster from "@/assets/Volare_Poster.webp";
import maxresdefault from "@/assets/maxresdefault.jpg";
import layeringImage from "@/assets/imagen-layering-2-1-1024x683.png";

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
  isTopSeller: boolean;
  size: string;
  notes?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
}

export const initialProducts: Product[] = [
  {
    id: "1",
    name: "Versace Eros",
    price: 7495,
    imageUrl: versaceEros,
    description: "Una adictiva sensualidad entregada por notas orientales intrigantes y envolventes. Versace Eros es una fragancia que combina menta, manzana verde y limón italiano en las notas de salida, con un corazón de habas de tonka, geranio y ambroxan.",
    category: "Hombre",
    isTopSeller: true,
    size: "100 ml",
    notes: "Menta, Manzana Verde, Limón Italiano, Habas de Tonka",
  },
  {
    id: "2",
    name: "Dior Sauvage",
    price: 8995,
    imageUrl: diorSauvage,
    description: "Una combinación de pimienta, notas cítricas, lavanda y un fondo amaderado que crean una fragancia salvaje y sofisticada. Inspirada en los vastos paisajes desérticos al atardecer.",
    category: "Hombre",
    isTopSeller: true,
    size: "100 ml",
    notes: "Pimienta, Bergamota, Lavanda, Ámbar Gris",
  },
  {
    id: "3",
    name: "Haramain Amber Oud Ruby Edition",
    price: 5995,
    imageUrl: amberOud,
    description: "Siempre estarás rodeado de un aroma sofisticado y cautivador que dejará huella. Una mezcla exquisita de ámbar y oud que evoca lujo y elegancia.",
    category: "Unisex",
    isTopSeller: true,
    size: "100 ml",
    notes: "Ámbar, Oud, Sándalo, Vainilla",
  },
  {
    id: "4",
    name: "Bleu de Chanel",
    price: 9500,
    imageUrl: bleuChanel,
    description: "Una fragancia woody-aromatic que encarna la libertad. Con notas de menta, pomelo, cedro e incienso que crean una composición elegante y atemporal.",
    category: "Hombre",
    isTopSeller: true,
    size: "100 ml",
    notes: "Menta, Pomelo, Cedro, Incienso",
  },
  {
    id: "5",
    name: "Tom Ford Noir Extreme",
    price: 12500,
    imageUrl: tomFord,
    description: "Una fragancia amber-spicy que personifica la sensualidad y la sofisticación. Notas de cardamomo, nuez moscada y vainilla se entrelazan para crear una experiencia olfativa inigualable.",
    category: "Hombre",
    isTopSeller: false,
    size: "100 ml",
    notes: "Cardamomo, Nuez Moscada, Vainilla, Ámbar",
  },
  {
    id: "6",
    name: "YSL La Nuit de L'Homme",
    price: 7800,
    imageUrl: yslPerfume,
    description: "Una fragancia oriental-especiada que captura la esencia de la noche. Con cardamomo, lavanda y vetiver que crean un aura magnética e irresistible.",
    category: "Hombre",
    isTopSeller: false,
    size: "100 ml",
    notes: "Cardamomo, Lavanda, Vetiver, Cedro",
  },
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Cómo elegir el perfume perfecto para cada ocasión",
    content: "Elegir el perfume adecuado puede transformar completamente tu presencia. Para eventos formales, opta por fragancias amaderadas y profundas como Tom Ford o Bleu de Chanel. Para el día a día, elige notas frescas y cítricas que sean ligeras pero memorables.\n\nPara citas románticas, las fragancias orientales con notas de vainilla y ámbar crean un aura seductora. En el trabajo, prefiere perfumes frescos y limpios que no sean invasivos pero sí distintivos.\n\nRecuerda que el perfume interactúa con tu piel de manera única. Lo que huele increíble en alguien más podría ser diferente en ti. Siempre prueba un perfume en tu piel y espera al menos 30 minutos antes de decidir.\n\nEn Arome, nuestro equipo de expertos puede guiarte para encontrar la fragancia que mejor se adapte a tu personalidad y estilo de vida.",
    excerpt: "Descubre cómo seleccionar la fragancia ideal según la ocasión y tu personalidad.",
    image: volarePoster,
    createdAt: "2024-03-15",
  },
  {
    id: "2",
    title: "Las tendencias en perfumería para 2024",
    content: "El mundo de la perfumería evoluciona constantemente. Este año, las fragancias sostenibles y los ingredientes naturales están en el centro de atención. Las casas de perfumería más prestigiosas están adoptando prácticas eco-responsables sin comprometer la calidad.\n\nLas notas gourmand continúan ganando popularidad, con vainilla, café y chocolate liderando las preferencias. También vemos un resurgimiento de las fragancias unisex, eliminando las barreras tradicionales de género.\n\nOtra tendencia importante es la personalización. Cada vez más personas buscan fragancias únicas que reflejen su individualidad. Los perfumes nicho están experimentando un crecimiento sin precedentes.",
    excerpt: "Explora las últimas tendencias que están revolucionando el mundo de las fragancias.",
    image: maxresdefault,
    createdAt: "2024-03-10",
  },
  {
    id: "3",
    title: "Guía de capas de fragancia: el arte del layering",
    content: "El layering o superposición de fragancias es una técnica utilizada por expertos para crear aromas únicos y duraderos. Consiste en aplicar múltiples productos perfumados en capas para lograr una composición personalizada.\n\nComienza con un gel de ducha perfumado, seguido de una loción corporal con la misma línea de fragancia. Luego aplica tu perfume en los puntos de pulso: muñecas, detrás de las orejas y en el cuello.\n\nPara un efecto más sofisticado, puedes combinar dos perfumes complementarios. Por ejemplo, una base amaderada con un toque cítrico puede crear algo verdaderamente único.",
    excerpt: "Aprende la técnica del layering para crear tu propia firma olfativa única.",
    image: layeringImage,
    createdAt: "2024-03-05",
  },
];
