import type { Metadata } from "next";
import { BriefingPage } from "@/components/briefing-page";

export const metadata: Metadata = {
  title: "Request a private briefing — Udyog Radar",
  description:
    "Map Udyog Radar to your sectors, sales territory and industrial product catalogue in a focused private briefing.",
};

export default function Briefing() {
  return <BriefingPage />;
}
