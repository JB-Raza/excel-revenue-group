import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FadeUp } from "@/components/animations/motion-primitives";
import { siteConfig } from "@/lib/site";

type LegalSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

type LegalPageProps = {
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export function LegalPage({ title, description, lastUpdated, sections }: LegalPageProps) {
  return (
    <section className="border-b border-border/60 bg-surface py-16 md:py-20">
      <Container>
        <FadeUp className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-medium">
            <Link href="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <span className="mx-2 text-border">/</span>
            <span className="text-charcoal">{title}</span>
          </nav>

          <h1 className="mt-6 font-heading text-4xl font-extrabold text-charcoal md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-medium">{description}</p>
          <p className="mt-2 text-sm text-gray-medium">Last updated: {lastUpdated}</p>

          <div className="mt-12 flex flex-col gap-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-heading text-xl font-bold text-charcoal">
                  {section.title}
                </h2>
                <div className="mt-4 flex flex-col gap-4 text-base leading-relaxed text-gray-medium">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.list ? (
                    <ul className="list-disc space-y-2 pl-5">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-12 rounded-[var(--radius-card)] border border-border/60 bg-white p-6 text-sm leading-relaxed text-gray-medium">
            Questions about these policies? Contact{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-semibold text-gold hover:underline"
            >
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </FadeUp>
      </Container>
    </section>
  );
}
