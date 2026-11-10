import { Container } from "@/components/layout/container";
import { CopyrightYear } from "@/components/layout/copyright-year";
import { Logo } from "@/components/logo";
import { company, mapsSearchUrl } from "@/config/company";
import { footerCompanyLinks, legalLinks } from "@/config/navigation";
import { services } from "@/config/services";
import Link from "next/link";

export function Footer({
  logos,
}: {
  logos: { onDark: string | null; onLight: string | null };
}) {
  return (
    <footer className="bg-navy text-ice">
      <Container className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo src={logos.onDark} variant="on-dark" />
          <p className="mt-5 max-w-sm text-sm leading-6 text-mist">
            {company.legalName} is an Indian company working across mobility, transportation,
            logistics and travel-related services.
          </p>
          <p className="mt-6 text-xs tracking-[0.16em] text-mist uppercase">CIN {company.cin}</p>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-xs tracking-[0.22em] text-white uppercase">Company</h2>
          <ul className="mt-4 grid gap-2">
            {footerCompanyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-ice/85 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-xs tracking-[0.22em] text-white uppercase">Services</h2>
          <ul className="mt-4 grid gap-2">
            {services.map((service) => (
              <li key={service.path}>
                <Link href={service.path} className="text-sm text-ice/85 hover:text-white">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-xs tracking-[0.22em] text-white uppercase">Registered office</h2>
          <address className="mt-4 text-sm leading-6 text-ice/90 not-italic">
            {company.address.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="mt-4">
            <a className="text-sm text-white underline-offset-4 hover:underline" href={mapsSearchUrl}>
              Open address in maps
            </a>
          </p>
          <p className="mt-4 text-sm">
            <a className="text-ice hover:text-white" href={`mailto:${company.email}`}>
              {company.email}
            </a>
          </p>
          <p className="mt-1 text-sm">
            <a className="text-ice hover:text-white" href={`tel:${company.phoneTel}`}>
              {company.phoneDisplay}
            </a>
          </p>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-mist">
            © <CopyrightYear /> {company.legalName}
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-xs text-ice/80 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
