import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import blogHeader from "@/assets/blog-header.jpg";
import volarePoster from "@/assets/Volare_Poster.webp";
import maxresdefault from "@/assets/maxresdefault.jpg";
import layeringImage from "@/assets/imagen-layering-2-1-1024x683.png";

const fallbackImageByPostId: Record<string, string> = {
  "1": volarePoster,
  "2": maxresdefault,
  "3": layeringImage,
};

const BlogArticle = () => {
  const { id } = useParams();
  const { blogPosts } = useStore();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl text-foreground mb-4">Artículo no encontrado</h2>
          <Link to="/blog" className="btn-outline-gold rounded-lg">Volver al blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body text-sm">
          <ArrowLeft size={16} /> Volver al blog
        </Link>

        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="aspect-video rounded-xl overflow-hidden mb-8">
            <img src={post.image || fallbackImageByPostId[post.id] || blogHeader} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
            <Calendar size={14} />
            <span>{new Date(post.createdAt).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}</span>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">{post.title}</h1>
          <div className="line-gold w-full mb-8" />

          <div className="prose prose-invert max-w-none">
            {post.content.split("\n").map((paragraph, i) => (
              paragraph.trim() && <p key={i} className="text-muted-foreground font-body leading-relaxed mb-4">{paragraph}</p>
            ))}
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogArticle;
