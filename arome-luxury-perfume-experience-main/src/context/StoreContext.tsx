import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Product, BlogPost, ContactMessage, initialProducts, initialBlogPosts } from "@/data/products";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";

interface StoreContextType {
  products: Product[];
  blogPosts: BlogPost[];
  contacts: ContactMessage[];
  isAdmin: boolean;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addBlogPost: (post: Omit<BlogPost, "id">) => Promise<void>;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  addContact: (contact: Omit<ContactMessage, "id">) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const seedingRef = useRef({ products: false, blog: false });

  const adminEmail = useMemo(() => {
    const value = import.meta.env.VITE_ADMIN_EMAIL;
    return typeof value === "string" && value.trim() ? value.trim() : null;
  }, []);

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsAdmin(false);
        return;
      }
      if (adminEmail && user.email !== adminEmail) {
        setIsAdmin(false);
        return;
      }
      setIsAdmin(true);
    });
  }, [adminEmail]);

  useEffect(() => {
    if (!db) return;
    const productsUnsub = onSnapshot(collection(db, "products"), async (snapshot) => {
      if (snapshot.empty) {
        if (seedingRef.current.products) return;
        seedingRef.current.products = true;
        await Promise.all(
          initialProducts.map((p) => setDoc(doc(db, "products", p.id), p)),
        );
        return;
      }
      const items = snapshot.docs.map((d) => ({ ...(d.data() as Product), id: (d.data() as Product).id ?? d.id }));
      setProducts(items);
    });

    const blogUnsub = onSnapshot(collection(db, "blogPosts"), async (snapshot) => {
      if (snapshot.empty) {
        if (seedingRef.current.blog) return;
        seedingRef.current.blog = true;
        await Promise.all(
          initialBlogPosts.map((p) => setDoc(doc(db, "blogPosts", p.id), p)),
        );
        return;
      }
      const items = snapshot.docs.map((d) => ({ ...(d.data() as BlogPost), id: (d.data() as BlogPost).id ?? d.id }));
      setBlogPosts(items);
    });

    const contactsUnsub = onSnapshot(collection(db, "contacts"), (snapshot) => {
      const items = snapshot.docs.map((d) => ({ ...(d.data() as ContactMessage), id: (d.data() as ContactMessage).id ?? d.id }));
      setContacts(items);
    });

    return () => {
      productsUnsub();
      blogUnsub();
      contactsUnsub();
    };
  }, []);

  const createId = () => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
    return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
  };

  const addProduct = async (product: Omit<Product, "id">) => {
    if (!db) {
      const newProduct: Product = { ...product, id: createId() };
      setProducts((prev) => [newProduct, ...prev]);
      return;
    }
    const docRef = doc(collection(db, "products"));
    const newProduct: Product = { ...product, id: docRef.id };
    await setDoc(docRef, newProduct);
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    const { id: _ignored, ...rest } = updates;
    const toApply = Object.fromEntries(Object.entries(rest).filter(([, v]) => v !== undefined));
    if (!db) {
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...toApply } as Product : p)));
      return;
    }
    await updateDoc(doc(db, "products", id), toApply);
  };

  const deleteProduct = async (id: string) => {
    if (!db) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      return;
    }
    await deleteDoc(doc(db, "products", id));
  };

  const addBlogPost = async (post: Omit<BlogPost, "id">) => {
    if (!db) {
      const newPost: BlogPost = { ...post, id: createId() };
      setBlogPosts((prev) => [newPost, ...prev]);
      return;
    }
    const docRef = doc(collection(db, "blogPosts"));
    const newPost: BlogPost = { ...post, id: docRef.id };
    await setDoc(docRef, newPost);
  };

  const updateBlogPost = async (id: string, updates: Partial<BlogPost>) => {
    const { id: _ignored, ...rest } = updates;
    const toApply = Object.fromEntries(Object.entries(rest).filter(([, v]) => v !== undefined));
    if (!db) {
      setBlogPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...toApply } as BlogPost : p)));
      return;
    }
    await updateDoc(doc(db, "blogPosts", id), toApply);
  };

  const deleteBlogPost = async (id: string) => {
    if (!db) {
      setBlogPosts((prev) => prev.filter((p) => p.id !== id));
      return;
    }
    await deleteDoc(doc(db, "blogPosts", id));
  };

  const addContact = async (contact: Omit<ContactMessage, "id">) => {
    const newContact: ContactMessage = { ...contact, id: createId() };
    if (!db) {
      setContacts((prev) => [newContact, ...prev]);
      return;
    }
    const docRef = doc(collection(db, "contacts", newContact.id));
    await setDoc(docRef, newContact);
  };

  const login = async (email: string, password: string) => {
    if (!auth) throw new Error("firebase-not-configured");
    const result = await signInWithEmailAndPassword(auth, email, password);
    if (adminEmail && result.user.email !== adminEmail) {
      await signOut(auth);
      setIsAdmin(false);
      return false;
    }
    setIsAdmin(true);
    return true;
  };

  const logout = async () => {
    if (!auth) throw new Error("firebase-not-configured");
    await signOut(auth);
    setIsAdmin(false);
  };

  return (
    <StoreContext.Provider value={{
      products, blogPosts, contacts, isAdmin,
      addProduct, updateProduct, deleteProduct,
      addBlogPost, updateBlogPost, deleteBlogPost,
      addContact, login, logout,
    }}>
      {children}
    </StoreContext.Provider>
  );
};
