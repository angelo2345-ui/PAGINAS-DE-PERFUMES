import { useState, useMemo } from "react";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";
import AnimatedSection from "@/components/AnimatedSection";

const Products = () => {
  const { products } = useStore();
  const [category, setCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("default");

  const categories = ["Todos", ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = useMemo(() => {
    let list = category === "Todos" ? products : products.filter((p) => p.category === category);
    if (sortBy === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, category, sortBy]);

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <span className="text-primary font-body text-sm uppercase tracking-[0.3em]">Nuestra Colección</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            <span className="text-gradient-gold">Perfumes</span> Originales
          </h1>
          <p className="text-muted-foreground font-body max-w-lg mx-auto">
            Explora nuestra selección curada de las mejores fragancias del mundo
          </p>
        </AnimatedSection>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-body transition-all ${
                  category === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-secondary text-foreground border border-border rounded-lg px-4 py-2 text-sm font-body"
          >
            <option value="default">Ordenar por</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name">Nombre</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20">No se encontraron productos en esta categoría.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
