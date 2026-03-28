import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useStore } from "@/context/StoreContext";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { addContact } = useStore();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const address = "Plaza Alí, Av. Pdte. Jacobo Majluta Azar";
  const mapHref = "https://www.google.com/maps/place/Arome/@18.5485056,-69.9201025,15.5z/data=!4m6!3m5!1s0x8eaf892da85df827:0xb729fcb0d703abc0!8m2!3d18.5466739!4d-69.9167893!16s%2Fg%2F11z0wcq8j1?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D";
  const mapEmbedSrc = "https://www.google.com/maps?q=18.5466739,-69.9167893&z=16&output=embed";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Error", description: "Por favor completa todos los campos.", variant: "destructive" });
      return;
    }
    setIsSending(true);
    try {
      await addContact(form);
      toast({ title: "¡Mensaje enviado!", description: "Te responderemos lo antes posible." });
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast({ title: "Error", description: "No se pudo enviar el mensaje.", variant: "destructive" });
    } finally {
      setIsSending(false);
    }
  };

  const info = [
    {
      icon: MapPin,
      label: "Dirección",
      value: address,
      href: mapHref,
    },
    { icon: Phone, label: "Teléfono", value: "+52 (55) 1234-5678" },
    { icon: Mail, label: "Email", value: "contacto@arome.com" },
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary font-body text-sm uppercase tracking-[0.3em]">Escríbenos</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            <span className="text-gradient-gold">Contáctanos</span>
          </h1>
          <p className="text-muted-foreground font-body max-w-lg mx-auto">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <AnimatedSection direction="left">
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { key: "name" as const, label: "Nombre", type: "text" },
                { key: "email" as const, label: "Email", type: "email" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-body text-muted-foreground mb-2">{f.label}</label>
                  <input
                    type={f.type}
                    value={form[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    maxLength={f.key === "name" ? 100 : 255}
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-body text-muted-foreground mb-2">Mensaje</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  maxLength={1000}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                />
              </div>
              <button type="submit" className="btn-premium rounded-lg w-full inline-flex items-center justify-center gap-2" disabled={isSending}>
                <Send size={16} /> {isSending ? "Enviando..." : "Enviar Mensaje"}
              </button>
            </form>
          </AnimatedSection>

          <AnimatedSection direction="right" className="space-y-8">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="aspect-video">
                <iframe
                  title="Mapa - Arome"
                  src={mapEmbedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
            {info.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-foreground">{item.label}</h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground font-body text-sm hover:text-primary transition-colors underline underline-offset-4"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground font-body text-sm">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Contact;
