import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ProductCard from "@/components/ProductCard";
import BlogCard from "@/components/BlogCard";
import { useStore } from "@/context/StoreContext";
import heroBg from "@/assets/dior_sauvage_460x@2x.webp";

const Home = () => {
  const { products, blogPosts } = useStore();
  const topSellers = products.filter((p) => p.isTopSeller);
  const featured = products.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>

        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="line-gold" />
              <span className="text-primary font-body text-sm uppercase tracking-[0.3em]">Perfumes Originales</span>
              <div className="line-gold" />
            </div>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="text-foreground">Descubre tu</span>
              <br />
              <span className="text-gradient-gold">Esencia</span>
            </h1>
            <p className="font-accent text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 italic">
              Las fragancias más exclusivas del mundo, al alcance de tus sentidos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/productos" className="btn-premium rounded-lg">
                Explorar Colección
              </Link>
              <Link to="/about" className="btn-outline-gold rounded-lg">
                Conocer Más
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Top Sellers */}
      <section className="section-padding bg-gradient-dark">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles size={20} className="text-primary" />
              <span className="text-primary font-body text-sm uppercase tracking-[0.3em]">Lo Más Popular</span>
              <Sparkles size={20} className="text-primary" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Más <span className="text-gradient-gold">Vendidos</span>
            </h2>
            <p className="text-muted-foreground font-body max-w-lg mx-auto">
              Las fragancias preferidas por nuestros clientes más exigentes
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topSellers.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-primary/10" />
        <AnimatedSection className="relative container mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">
            Encuentra tu <span className="text-gradient-gold">Fragancia Perfecta</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto mb-8">
            Visita nuestra tienda o contáctanos para una asesoría personalizada
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/productos" className="btn-premium rounded-lg inline-flex items-center gap-2">
              Ver Todos los Productos <ArrowRight size={16} />
            </Link>
            <Link to="/contacto" className="btn-outline-gold rounded-lg">
              Contáctanos
            </Link>
          </div>
        </AnimatedSection>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-gradient-dark">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary font-body text-sm uppercase tracking-[0.3em]">Selección Premium</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              Productos <span className="text-gradient-gold">Destacados</span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      {blogPosts.length > 0 && (
        <section className="section-padding">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <span className="text-primary font-body text-sm uppercase tracking-[0.3em]">Nuestro Blog</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
                Últimos <span className="text-gradient-gold">Artículos</span>
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts.slice(0, 3).map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/blog" className="btn-outline-gold rounded-lg inline-flex items-center gap-2">
                Ver Todo el Blog <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
