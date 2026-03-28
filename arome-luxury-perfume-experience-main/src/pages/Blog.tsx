import { useStore } from "@/context/StoreContext";
import BlogCard from "@/components/BlogCard";
import AnimatedSection from "@/components/AnimatedSection";

const Blog = () => {
  const { blogPosts } = useStore();

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary font-body text-sm uppercase tracking-[0.3em]">Nuestro Blog</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Mundo de <span className="text-gradient-gold">Fragancias</span>
          </h1>
          <p className="text-muted-foreground font-body max-w-lg mx-auto">
            Artículos, guías y tendencias del mundo de la perfumería
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>

        {blogPosts.length === 0 && (
          <p className="text-center text-muted-foreground py-20">No hay artículos publicados aún.</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
