"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type Step = 1 | 2 | 3;

interface Answers {
  terrain: "plat" | "vallonne" | "mixte" | null;
  frequence: "occasionnel" | "regulier" | "intensif" | null;
  priorite: "prix" | "controle" | "polyvalence" | null;
}

function getRecommendation(answers: Answers): {
  model: "nx" | "dhc";
  title: string;
  price: string;
  slug: string;
  reasons: string[];
} {
  let dhcScore = 0;

  if (answers.terrain === "vallonne") dhcScore += 2;
  if (answers.terrain === "mixte") dhcScore += 1;

  if (answers.frequence === "intensif") dhcScore += 2;
  if (answers.frequence === "regulier") dhcScore += 1;

  if (answers.priorite === "controle") dhcScore += 2;
  if (answers.priorite === "polyvalence") dhcScore += 1;

  if (dhcScore >= 3) {
    const reasons: string[] = [];
    if (answers.terrain === "vallonne")
      reasons.push("Le Downhill Control securise les descentes sur terrain vallonne");
    if (answers.terrain === "mixte")
      reasons.push("Le frein parking electronique est un plus sur terrain varie");
    if (answers.frequence === "intensif")
      reasons.push("Pour un usage intensif, le DHC offre plus de controle et de confort");
    if (answers.frequence === "regulier")
      reasons.push("Un usage regulier justifie l'investissement dans le DHC");
    if (answers.priorite === "controle")
      reasons.push("Le DHC est concu pour un controle maximal en toute situation");
    if (answers.priorite === "polyvalence")
      reasons.push("Le DHC combine toutes les fonctionnalites du NX avec des options avancees");
    return {
      model: "dhc",
      title: "NX DHC Lithium",
      price: "999",
      slug: "nx-dhc-lithium",
      reasons: reasons.slice(0, 3),
    };
  }

  const reasons: string[] = [];
  if (answers.terrain === "plat")
    reasons.push("Sur terrain plat, le NX est parfaitement adapte — pas besoin du DHC");
  if (answers.frequence === "occasionnel")
    reasons.push("Pour un usage occasionnel, le NX offre le meilleur rapport qualite-prix");
  if (answers.priorite === "prix")
    reasons.push("Le NX offre toutes les fonctionnalites essentielles a 100\u20AC de moins");
  if (reasons.length === 0)
    reasons.push("Le NX Lithium est le choix ideal pour la plupart des golfeurs");
  return {
    model: "nx",
    title: "NX Lithium",
    price: "899",
    slug: "nx-lithium",
    reasons: reasons.slice(0, 3),
  };
}

function OptionCard({
  selected,
  onClick,
  title,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-[10px] border-2 p-4 text-left transition-all ${
        selected
          ? "border-[#356B0D] bg-[#356B0D]/5"
          : "border-[#DBDBDB] bg-white hover:border-[#356B0D]/40"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
            selected
              ? "border-[#356B0D] bg-[#356B0D]"
              : "border-[#DBDBDB]"
          }`}
        >
          {selected && <Check className="h-3 w-3 text-white" />}
        </div>
        <div>
          <p className="font-semibold text-[#0F0F10]">{title}</p>
          <p className="mt-0.5 text-sm text-[#6B7280]">{description}</p>
        </div>
      </div>
    </button>
  );
}

export function TrolleyQuiz() {
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<Answers>({
    terrain: null,
    frequence: null,
    priorite: null,
  });
  const [showResult, setShowResult] = useState(false);

  const canNext =
    (step === 1 && answers.terrain !== null) ||
    (step === 2 && answers.frequence !== null) ||
    (step === 3 && answers.priorite !== null);

  function handleNext() {
    if (step < 3) {
      setStep((s) => (s + 1) as Step);
    } else {
      setShowResult(true);
    }
  }

  function reset() {
    setStep(1);
    setAnswers({ terrain: null, frequence: null, priorite: null });
    setShowResult(false);
  }

  const recommendation = getRecommendation(answers);

  if (showResult) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#356B0D]/10">
            <Check className="h-6 w-6 text-[#356B0D]" />
          </div>
          <h3 className="text-2xl font-bold text-[#0F0F10]">
            Notre recommandation
          </h3>
        </div>

        <div className="rounded-2xl border-2 border-[#356B0D] bg-[#356B0D]/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#356B0D]">
                {recommendation.model === "dhc" ? "Premium" : "Populaire"}
              </p>
              <h4 className="text-2xl font-bold text-[#0F0F10]">
                {recommendation.title}
              </h4>
            </div>
            <span className="text-3xl font-bold text-[#0F0F10]">
              {recommendation.price}
              <span className="text-lg text-[#6B7280]">&euro;</span>
            </span>
          </div>

          <ul className="mt-4 space-y-2">
            {recommendation.reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-2 text-sm text-[#6B7280]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#356B0D]" />
                {reason}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-sm font-medium text-[#356B0D]">
            + 3 accessoires offerts (~105&euro;) avec votre trolley !
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="btn-glass flex-1 rounded-[10px] text-white">
              <Link href={`/trolleys/${recommendation.slug}`}>
                Voir le {recommendation.title}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1 rounded-[10px]">
              <Link href="/trolleys">
                Comparer NX vs NX DHC
              </Link>
            </Button>
          </div>
        </div>

        <button
          onClick={reset}
          className="mx-auto flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#356B0D]"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Recommencer le questionnaire
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-all ${
              s <= step ? "bg-[#356B0D]" : "bg-[#DBDBDB]"
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-[#6B7280]">Etape {step} sur 3</p>

      {/* Step 1: Terrain */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#0F0F10]">
            Sur quel type de terrain jouez-vous ?
          </h3>
          <div className="space-y-3">
            <OptionCard
              selected={answers.terrain === "plat"}
              onClick={() => setAnswers({ ...answers, terrain: "plat" })}
              title="Terrain plat / Links"
              description="Parcours relativement plat, peu de denivele"
            />
            <OptionCard
              selected={answers.terrain === "mixte"}
              onClick={() => setAnswers({ ...answers, terrain: "mixte" })}
              title="Terrain mixte"
              description="Quelques montees et descentes moderees"
            />
            <OptionCard
              selected={answers.terrain === "vallonne"}
              onClick={() => setAnswers({ ...answers, terrain: "vallonne" })}
              title="Terrain vallonne"
              description="Deniveles importants, montees et descentes frequentes"
            />
          </div>
        </div>
      )}

      {/* Step 2: Frequence */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#0F0F10]">
            A quelle frequence jouez-vous ?
          </h3>
          <div className="space-y-3">
            <OptionCard
              selected={answers.frequence === "occasionnel"}
              onClick={() => setAnswers({ ...answers, frequence: "occasionnel" })}
              title="Occasionnel"
              description="Quelques fois par mois, le week-end"
            />
            <OptionCard
              selected={answers.frequence === "regulier"}
              onClick={() => setAnswers({ ...answers, frequence: "regulier" })}
              title="Regulier"
              description="2 a 3 fois par semaine"
            />
            <OptionCard
              selected={answers.frequence === "intensif"}
              onClick={() => setAnswers({ ...answers, frequence: "intensif" })}
              title="Intensif / Competition"
              description="4 fois ou plus par semaine, competitions"
            />
          </div>
        </div>
      )}

      {/* Step 3: Priorite */}
      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#0F0F10]">
            Quelle est votre priorite ?
          </h3>
          <div className="space-y-3">
            <OptionCard
              selected={answers.priorite === "prix"}
              onClick={() => setAnswers({ ...answers, priorite: "prix" })}
              title="Meilleur prix"
              description="Je veux un excellent chariot au meilleur rapport qualite-prix"
            />
            <OptionCard
              selected={answers.priorite === "controle"}
              onClick={() => setAnswers({ ...answers, priorite: "controle" })}
              title="Controle maximal"
              description="Je veux le controle en descente et le frein parking electronique"
            />
            <OptionCard
              selected={answers.priorite === "polyvalence"}
              onClick={() => setAnswers({ ...answers, priorite: "polyvalence" })}
              title="Polyvalence"
              description="Je veux un chariot adapte a toutes les situations"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setStep((s) => (s - 1) as Step)}
          disabled={step === 1}
          className="flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#356B0D] disabled:invisible"
        >
          <ChevronLeft className="h-4 w-4" />
          Retour
        </button>
        <Button
          onClick={handleNext}
          disabled={!canNext}
          className="btn-glass rounded-[10px] text-white disabled:opacity-40"
        >
          {step === 3 ? "Voir ma recommandation" : "Suivant"}
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
