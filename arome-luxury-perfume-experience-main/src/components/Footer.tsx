import { Link } from "react-router-dom";
import logoArome from "@/assets/logo-arome.jpg";

const Footer = () => (
  <footer className="bg-secondary/50 border-t border-border">
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img src={logoArome} alt="Arome" className="h-10 w-10 rounded-lg object-cover" />
            <span className="font-heading text-xl font-bold text-gradient-gold">Arome</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Perfumes originales de las marcas más exclusivas del mundo. Tu destino para fragancias de lujo.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold text-primary mb-4 uppercase tracking-wider">Navegación</h4>
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-muted-foreground text-sm hover:text-primary transition-colors">Inicio</Link>
            <Link to="/productos" className="text-muted-foreground text-sm hover:text-primary transition-colors">Productos</Link>
            <Link to="/blog" className="text-muted-foreground text-sm hover:text-primary transition-colors">Blog</Link>
            <Link to="/about" className="text-muted-foreground text-sm hover:text-primary transition-colors">Nosotros</Link>
          </div>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold text-primary mb-4 uppercase tracking-wider">Contacto</h4>
          <div className="flex flex-col gap-2 text-muted-foreground text-sm">
            <p>contacto@arome.com</p>
            <p>+52 (55) 1234-5678</p>
            <p>Ciudad de México, México</p>
          </div>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold text-primary mb-4 uppercase tracking-wider">Horario</h4>
          <div className="flex flex-col gap-2 text-muted-foreground text-sm">
            <p>Lun - Vie: 10:00 - 20:00</p>
            <p>Sábado: 10:00 - 18:00</p>
            <p>Domingo: 11:00 - 16:00</p>
          </div>
        </div>
      </div>

      <div className="line-gold w-full mt-12 mb-6" />
      <p className="text-center text-muted-foreground text-xs">
        © {new Date().getFullYear()} Arome Fragancias. Todos los derechos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
