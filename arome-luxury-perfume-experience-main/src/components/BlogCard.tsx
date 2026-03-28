import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import blogHeader from "@/assets/blog-header.jpg";
import volarePoster from "@/assets/Volare_Poster.webp";
import maxresdefault from "@/assets/maxresdefault.jpg";
import layeringImage from "@/assets/imagen-layering-2-1-1024x683.png";
import type { BlogPost } from "@/data/products";

interface Props {
  post: BlogPost;
  index?: number;
}

const fallbackImageByPostId: Record<string, string> = {
  "1": volarePoster,
  "2": maxresdefault,
  "3": layeringImage,
};

const BlogCard: React.FC<Props> = ({ post, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Link to={`/blog/${post.id}`} className="group block">
      <div className="product-card-hover bg-card rounded-lg overflow-hidden border border-border/50">
        <div className="aspect-video overflow-hidden">
          <img
            src={post.image || fallbackImageByPostId[post.id] || blogHeader}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <p className="text-xs font-body text-muted-foreground mb-2">{new Date(post.createdAt).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}</p>
          <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{post.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
          <span className="inline-flex items-center gap-2 text-primary text-sm font-body font-medium group-hover:gap-3 transition-all">
            Leer más <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default BlogCard;
