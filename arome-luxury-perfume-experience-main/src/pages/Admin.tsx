import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Plus, Trash2, Edit2, Save, X, Star, Eye } from "lucide-react";
import type { Product, BlogPost } from "@/data/products";

const Admin = () => {
  const store = useStore();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [tab, setTab] = useState<"products" | "blog" | "contacts">("products");
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);

  if (!store.isAdmin) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-border rounded-xl p-8 w-full max-w-md"
        >
          <h1 className="font-heading text-2xl font-bold text-foreground text-center mb-6">Admin Login</h1>
          <form onSubmit={async (e) => {
            e.preventDefault();
            setIsLoggingIn(true);
            try {
              const ok = await store.login(email, password);
              if (ok) toast({ title: "¡Bienvenido!" });
              else toast({ title: "Error", description: "No tienes permisos de admin.", variant: "destructive" });
            } catch (err) {
              const anyErr = err as { code?: string; message?: string };
              const code = typeof anyErr?.code === "string" ? anyErr.code : undefined;
              const message = typeof anyErr?.message === "string" ? anyErr.message : undefined;

              const known =
                code === "auth/unauthorized-domain"
                  ? "Dominio no autorizado. Agrega tu dominio de Vercel en Firebase > Authentication > Settings > Authorized domains."
                  : code === "auth/operation-not-allowed"
                    ? "Email/Password no está habilitado. Actívalo en Firebase > Authentication > Sign-in method."
                    : code === "auth/invalid-api-key" || code === "auth/invalid-credential"
                      ? "Config de Firebase inválida. Revisa las variables VITE_FIREBASE_* en Vercel."
                      : code === "auth/network-request-failed"
                        ? "Error de red. Intenta de nuevo."
                        : message === "firebase-not-configured"
                          ? "Firebase no está configurado en Vercel. Agrega las variables VITE_FIREBASE_* y redeploy."
                          : undefined;

              toast({
                title: "Error",
                description: known || (code ? `Firebase: ${code}` : "No se pudo iniciar sesión."),
                variant: "destructive",
              });
            } finally {
              setIsLoggingIn(false);
            }
          }} className="space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <button type="submit" className="btn-premium rounded-lg w-full" disabled={isLoggingIn}>
              {isLoggingIn ? "Ingresando..." : "Iniciar Sesión"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const saveProduct = async () => {
    if (!editingProduct?.name || !editingProduct?.price) return;
    try {
      if (editingProduct.id) {
        await store.updateProduct(editingProduct.id, editingProduct);
        toast({ title: "Producto actualizado" });
      } else {
        await store.addProduct(editingProduct as Omit<Product, "id">);
        toast({ title: "Producto creado" });
      }
      setEditingProduct(null);
    } catch {
      toast({ title: "Error", description: "No se pudo guardar el producto.", variant: "destructive" });
    }
  };

  const uploadProductImage = async (file: File) => {
    if (!editingProduct) return;
    setIsUploadingImage(true);
    try {
      if (!file.type.startsWith("image/")) {
        toast({ title: "Error", description: "Selecciona un archivo de imagen.", variant: "destructive" });
        return;
      }

      const maxBytes = 1024 * 1024 * 2;
      if (file.size > maxBytes) {
        toast({ title: "Error", description: "La imagen es muy pesada. Usa una de máximo 2MB.", variant: "destructive" });
        return;
      }

      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error("file-read-failed"));
        reader.readAsDataURL(file);
      });

      setEditingProduct({ ...editingProduct, imageUrl: base64 });
      toast({ title: "Imagen cargada", description: "Se guardará en Base64." });
    } catch {
      toast({ title: "Error", description: "No se pudo cargar la imagen.", variant: "destructive" });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const savePost = async () => {
    if (!editingPost?.title) return;
    try {
      if (editingPost.id) {
        await store.updateBlogPost(editingPost.id, editingPost);
        toast({ title: "Artículo actualizado" });
      } else {
        await store.addBlogPost({ ...editingPost, createdAt: new Date().toISOString(), excerpt: editingPost.content?.slice(0, 120) || "", image: "" } as Omit<BlogPost, "id">);
        toast({ title: "Artículo creado" });
      }
      setEditingPost(null);
    } catch {
      toast({ title: "Error", description: "No se pudo guardar el artículo.", variant: "destructive" });
    }
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">Panel de <span className="text-gradient-gold">Administración</span></h1>
          <button onClick={async () => { await store.logout(); }} className="btn-outline-gold rounded-lg text-sm inline-flex items-center gap-2">
            <LogOut size={14} /> Salir
          </button>
        </div>

        <div className="flex gap-2 mb-8">
          {(["products", "blog", "contacts"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-body transition-all ${tab === t ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
              {t === "products" ? "Productos" : t === "blog" ? "Blog" : "Mensajes"}
            </button>
          ))}
        </div>

        {tab === "products" && (
          <div>
            <button onClick={() => setEditingProduct({ name: "", price: 0, imageUrl: "", description: "", category: "Hombre", isTopSeller: false, size: "100 ml" })}
              className="btn-premium rounded-lg text-sm inline-flex items-center gap-2 mb-6"><Plus size={14} /> Nuevo Producto</button>

            {editingProduct && (
              <div className="bg-card border border-border rounded-xl p-6 mb-6 space-y-4">
                <h3 className="font-heading text-lg font-semibold text-foreground">{editingProduct.id ? "Editar" : "Nuevo"} Producto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Nombre" value={editingProduct.name || ""} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground text-sm font-body" />
                  <input placeholder="Precio" type="number" value={editingProduct.price || ""} onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground text-sm font-body" />
                  <div className="flex gap-2">
                    <input
                      placeholder="URL Imagen"
                      value={editingProduct.imageUrl || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                      className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2 text-foreground text-sm font-body"
                    />
                    {!editingProduct.imageUrl && (
                      <label className="btn-outline-gold rounded-lg text-sm inline-flex items-center justify-center px-4 cursor-pointer">
                        {isUploadingImage ? "Subiendo..." : "Subir"}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={isUploadingImage}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            e.target.value = "";
                            if (file) void uploadProductImage(file);
                          }}
                        />
                      </label>
                    )}
                  </div>
                  <select value={editingProduct.category || "Hombre"} onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground text-sm font-body">
                    <option>Hombre</option><option>Mujer</option><option>Unisex</option>
                  </select>
                  <input placeholder="Tamaño" value={editingProduct.size || ""} onChange={(e) => setEditingProduct({ ...editingProduct, size: e.target.value })}
                    className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground text-sm font-body" />
                  <label className="flex items-center gap-2 text-foreground text-sm font-body">
                    <input type="checkbox" checked={editingProduct.isTopSeller || false} onChange={(e) => setEditingProduct({ ...editingProduct, isTopSeller: e.target.checked })} />
                    <Star size={14} className="text-primary" /> Top Seller
                  </label>
                </div>
                <textarea placeholder="Descripción" value={editingProduct.description || ""} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  rows={3} className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground text-sm font-body resize-none" />
                <div className="flex gap-2">
                  <button onClick={saveProduct} className="btn-premium rounded-lg text-sm inline-flex items-center gap-2"><Save size={14} /> Guardar</button>
                  <button onClick={() => setEditingProduct(null)} className="btn-outline-gold rounded-lg text-sm inline-flex items-center gap-2"><X size={14} /> Cancelar</button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {store.products.map((p) => (
                <div key={p.id} className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
                  <img src={p.imageUrl} alt={p.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading text-sm font-semibold text-foreground">{p.name}</h4>
                      {p.isTopSeller && <Star size={12} className="text-primary fill-current" />}
                    </div>
                    <p className="text-muted-foreground text-xs">${p.price.toLocaleString()} · {p.category}</p>
                  </div>
                  <button onClick={() => setEditingProduct(p)} className="text-muted-foreground hover:text-primary transition-colors"><Edit2 size={16} /></button>
                  <button onClick={async () => { try { await store.deleteProduct(p.id); toast({ title: "Producto eliminado" }); } catch { toast({ title: "Error", description: "No se pudo eliminar el producto.", variant: "destructive" }); } }} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "blog" && (
          <div>
            <button onClick={() => setEditingPost({ title: "", content: "", excerpt: "", image: "", createdAt: new Date().toISOString() })}
              className="btn-premium rounded-lg text-sm inline-flex items-center gap-2 mb-6"><Plus size={14} /> Nuevo Artículo</button>

            {editingPost && (
              <div className="bg-card border border-border rounded-xl p-6 mb-6 space-y-4">
                <input placeholder="Título" value={editingPost.title || ""} onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground text-sm font-body" />
                <textarea placeholder="Contenido" value={editingPost.content || ""} onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  rows={6} className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground text-sm font-body resize-none" />
                <div className="flex gap-2">
                  <button onClick={savePost} className="btn-premium rounded-lg text-sm inline-flex items-center gap-2"><Save size={14} /> Guardar</button>
                  <button onClick={() => setEditingPost(null)} className="btn-outline-gold rounded-lg text-sm inline-flex items-center gap-2"><X size={14} /> Cancelar</button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {store.blogPosts.map((p) => (
                <div key={p.id} className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
                  <div className="flex-1">
                    <h4 className="font-heading text-sm font-semibold text-foreground">{p.title}</h4>
                    <p className="text-muted-foreground text-xs">{new Date(p.createdAt).toLocaleDateString("es-MX")}</p>
                  </div>
                  <button onClick={() => setEditingPost(p)} className="text-muted-foreground hover:text-primary transition-colors"><Edit2 size={16} /></button>
                  <button onClick={async () => { try { await store.deleteBlogPost(p.id); toast({ title: "Artículo eliminado" }); } catch { toast({ title: "Error", description: "No se pudo eliminar el artículo.", variant: "destructive" }); } }} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "contacts" && (
          <div className="space-y-3">
            {store.contacts.length === 0 && <p className="text-muted-foreground text-center py-10">No hay mensajes aún.</p>}
            {store.contacts.map((c) => (
              <div key={c.id} className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-heading text-sm font-semibold text-foreground">{c.name}</h4>
                  <span className="text-muted-foreground text-xs">({c.email})</span>
                </div>
                <p className="text-muted-foreground text-sm font-body">{c.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
