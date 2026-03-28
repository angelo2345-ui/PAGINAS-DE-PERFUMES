import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<Props> = ({ product, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Link to={`/producto/${product.id}`} className="group block">
      <div className="product-card-hover bg-card rounded-lg overflow-hidden border border-border/50">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {product.isTopSeller && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <Star size={12} className="text-primary-foreground fill-current" />
              <span className="text-xs font-body font-semibold text-primary-foreground">Top Seller</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="p-5">
          <p className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-1">{product.category}</p>
          <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{product.name}</h3>
          <div className="flex items-baseline justify-between mt-3">
            <span className="font-heading text-xl font-bold text-primary">${product.price.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">{product.size}</span>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default ProductCard;
