import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { Award, Heart, Shield } from "lucide-react";
import teamPhoto from "@/assets/team-photo.png";

const values = [
  { icon: Shield, title: "Autenticidad", desc: "100% perfumes originales garantizados. Trabajamos directamente con distribuidores autorizados." },
  { icon: Heart, title: "Pasión", desc: "Amamos el mundo de las fragancias y lo transmitimos en cada asesoría personalizada." },
  { icon: Award, title: "Excelencia", desc: "Ofrecemos la mejor selección curada de perfumes de las marcas más prestigiosas del mundo." },
];

const About = () => (
  <div className="pt-24 pb-20">
    <div className="container mx-auto px-6">
      <AnimatedSection className="text-center mb-16">
        <span className="text-primary font-body text-sm uppercase tracking-[0.3em]">Nuestra Historia</span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
          Quiénes <span className="text-gradient-gold">Somos</span>
        </h1>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
        <AnimatedSection direction="left">
          <div className="rounded-xl overflow-hidden glow-gold">
            <img src={teamPhoto} alt="Equipo Arome" className="w-full h-auto object-cover" />
          </div>
        </AnimatedSection>

        <AnimatedSection direction="right">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
            Una pasión convertida en <span className="text-gradient-gold">experiencia</span>
          </h2>
          <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
            <p>
              Arome nació de la pasión por las fragancias y el deseo de acercar perfumes originales de las marcas más exclusivas del mundo a nuestros clientes.
            </p>
            <p>
              Cada fragancia que ofrecemos ha sido cuidadosamente seleccionada para garantizar autenticidad, calidad y una experiencia olfativa inolvidable.
            </p>
            <p>
              Nuestro equipo de expertos está dedicado a brindarte asesoría personalizada para que encuentres la fragancia que mejor refleje tu personalidad y estilo.
            </p>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
          Nuestros <span className="text-gradient-gold">Valores</span>
        </h2>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="bg-card border border-border/50 rounded-xl p-8 text-center product-card-hover"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <v.icon size={24} className="text-primary" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{v.title}</h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default About;
