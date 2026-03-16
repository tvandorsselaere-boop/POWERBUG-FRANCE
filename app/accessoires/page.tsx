import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Settings, Battery, Phone, Mail } from "lucide-react";
import { getAccessories, getBatteries } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Accessoires & Batteries PowerBug",
  description:
    "Tous les accessoires officiels PowerBug : housse, porte-parapluie, siege, roues hiver, telemetre, batteries lithium et chargeurs.",
};

export const revalidate = 3600;

const BUNDLE_SLUGS = ["porte-parapluie", "scorecard-holder"];

export default async function AccessoiresPage() {
  const [accessories, batteries] = await Promise.all([
    getAccessories(),
    getBatteries(),
  ]);

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">Accueil</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">Accessoires</span>
      </nav>

      {/* Batteries & Chargeurs — en premier */}
      {batteries.length > 0 && (
        <div className="mb-20">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
              Batteries & Chargeurs
            </h1>
            <p className="mt-3 text-lg text-[#6B7280]">
              Batteries lithium et chargeurs officiels PowerBug.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {batteries.map((item) => {
              const price = item.product_variants?.[0]?.price ?? item.base_price;
              return (
                <Link
                  key={item.id}
                  href={`/accessoires/${item.slug}`}
                  className="group rounded-2xl border border-[#DBDBDB] bg-white p-6 transition-all hover:border-[#356B0D]/30 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-40 items-center justify-center rounded-xl bg-[#F5F5F5]">
                    {item.product_images?.[0] ? (
                      <Image
                        src={item.product_images[0].url}
                        alt={item.product_images[0].alt_text ?? item.name}
                        width={300}
                        height={300}
                        className="h-full w-full rounded-xl object-contain p-4"
                      />
                    ) : (
                      <Battery className="h-12 w-12 text-[#DBDBDB] group-hover:text-[#8DC63F]" />
                    )}
                  </div>
                  <h3 className="font-semibold text-[#0F0F10] group-hover:text-[#356B0D]">{item.name}</h3>
                  <p className="mt-1 text-sm text-[#6B7280]">{item.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#0F0F10]">
                      {price}<span className="text-sm text-[#6B7280]">&euro;</span>
                    </span>
                    <span className="text-sm font-medium text-[#356B0D] opacity-0 transition-opacity group-hover:opacity-100">
                      Voir &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Accessoires */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold tracking-tight text-[#0F0F10] sm:text-3xl">
          Accessoires PowerBug
        </h2>
        <p className="mt-3 text-lg text-[#6B7280]">
          Personnalisez votre chariot avec nos accessoires officiels.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {accessories.map((acc) => {
          const price = acc.product_variants?.[0]?.price ?? acc.base_price;
          const isBundle = BUNDLE_SLUGS.includes(acc.slug);
          return (
            <Link
              key={acc.id}
              href={`/accessoires/${acc.slug}`}
              className="group card-glass rounded-2xl p-6 transition-all hover:border-[#356B0D]/30 hover:shadow-lg"
            >
              <div className="mb-4 flex h-40 items-center justify-center rounded-xl bg-[#F5F5F5]">
                {acc.product_images?.[0] ? (
                  <Image
                    src={acc.product_images[0].url}
                    alt={acc.product_images[0].alt_text ?? acc.name}
                    width={300}
                    height={300}
                    className="h-full w-full rounded-xl object-contain p-4"
                  />
                ) : (
                  <Settings className="h-12 w-12 text-[#DBDBDB] transition-colors group-hover:text-[#8DC63F]" />
                )}
              </div>

              {isBundle && (
                <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-[#356B0D]/10 px-2 py-0.5 text-xs font-medium text-[#356B0D]">
                  Offert avec un chariot
                </span>
              )}

              <h2 className="text-lg font-semibold text-[#0F0F10] group-hover:text-[#356B0D]">
                {acc.name}
              </h2>
              <p className="mt-1 text-sm text-[#6B7280] line-clamp-2">
                {acc.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-[#0F0F10]">
                  {price}<span className="text-sm text-[#6B7280]">&euro;</span>
                </span>
                <span className="text-sm font-medium text-[#356B0D] opacity-0 transition-opacity group-hover:opacity-100">
                  Voir &rarr;
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Contact pour commander */}
      <section className="mt-16 rounded-2xl border border-[#356B0D]/20 bg-[#356B0D]/5 p-8 text-center">
        <h2 className="text-xl font-bold text-[#0F0F10]">
          Envie d&apos;un accessoire ou d&apos;une batterie ?
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-[#6B7280]">
          Contactez-nous pour passer commande. Nous vous repondons sous 24h.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="tel:+33788239784"
            className="btn-glass inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-sm font-semibold text-white"
          >
            <Phone className="h-4 w-4" />
            07 88 23 97 84
          </a>
          <a
            href="mailto:contact@powerbug.fr"
            className="inline-flex items-center gap-2 rounded-[10px] border border-[#356B0D] px-6 py-3 text-sm font-semibold text-[#356B0D] hover:bg-[#356B0D]/5"
          >
            <Mail className="h-4 w-4" />
            contact@powerbug.fr
          </a>
        </div>
      </section>

    </div>
  );
}
