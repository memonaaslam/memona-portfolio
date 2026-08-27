import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing/page";

export const Route = createFileRoute("/portfolio")({ component: Portfolio });

function Portfolio() {
  return <LandingPage />;
}
