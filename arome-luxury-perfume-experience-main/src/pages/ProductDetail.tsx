import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, MessageCircle } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import versaceEros from "@/assets/versace-eros.jpg";
import diorSauvage from "@/assets/dior-sauvage.jpg";
import amberOud from "@/assets/amber-oud.jpg";
import bleuChanel from "@/assets/bleu-chanel.jpg";
import tomFord from "@/assets/tom-ford.jpg";
import yslPerfume from "@/assets/ysl-perfume.jpg";

const fallbackImageByProductId: Record<string, string> = {
  "1": versaceEros,
  "2": diorSauvage,
  "3": amberOud,
  "4": bleuChanel,
  "5": tomFord,
  "6": yslPerfume,
};

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useStore();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl text-foreground mb-4">Producto no encontrado</h2>
          <Link to="/productos" className="btn-outline-gold rounded-lg">Volver a productos</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-6">
        <Link to="/productos" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body text-sm">
          <ArrowLeft size={16} /> Volver a productos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square rounded-xl overflow-hidden glow-gold"
          >
            <img
              src={product.imageUrl || fallbackImageByProductId[product.id] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.currentTarget;
                img.onerror = null;
                img.src = fallbackImageByProductId[product.id] || "/placeholder.svg";
              }}
            />
            {product.isTopSeller && (
              <div className="absolute top-4 left-4 flex items-center gap-1 bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star size={14} className="text-primary-foreground fill-current" />
                <span className="text-sm font-body font-semibold text-primary-foreground">Top Seller</span>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <span className="text-primary font-body text-sm uppercase tracking-[0.3em] mb-2">{product.category}</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">{product.name}</h1>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-heading text-3xl font-bold text-gradient-gold">${product.price.toLocaleString()}</span>
              <span className="text-muted-foreground font-body text-sm">{product.size}</span>
            </div>

            <div className="line-gold w-full mb-6" />

            <p className="text-muted-foreground font-body leading-relaxed mb-6">{product.description}</p>

            {product.notes && (
              <div className="mb-8">
                <h3 className="font-heading text-sm font-semibold text-primary uppercase tracking-wider mb-2">Notas</h3>
                <p className="text-muted-foreground font-body text-sm">{product.notes}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contacto" className="btn-premium rounded-lg inline-flex items-center justify-center gap-2">
                <MessageCircle size={16} /> Consultar Disponibilidad
              </Link>
              <a href="https://wa.me/5215512345678" target="_blank" rel="noopener noreferrer" className="btn-outline-gold rounded-lg text-center">
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
