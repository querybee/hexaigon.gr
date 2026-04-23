import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/typography";
import { ProjectCard } from "@/components/project-card";
import { PROJECTS } from "@/lib/data/projects";
import { Link } from "@/lib/i18n/navigation";

const FEATURED_COUNT = 8;

export const PortfolioSection = async () => {
  const t = await getTranslations("Portfolio");
  const featured = PROJECTS.slice(0, FEATURED_COUNT);
  const remaining = PROJECTS.length - FEATURED_COUNT;

  return (
    <section id="portfolio" className="py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <TypographyH2 className="text-center mb-16">{t("title")}</TypographyH2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featured.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
            />
          ))}
        </div>

        {remaining > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild className="gap-2">
              <Link href="/projects">
                {t("viewMore", { count: remaining })}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
