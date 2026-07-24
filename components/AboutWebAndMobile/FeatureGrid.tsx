"use client";

import { getFeatures } from "./features";
import FeatureCard from "./FeatureCard";
import { useTranslations } from "@/lib/i18n/dictionary-context";

const FeatureGrid = () => {
  const items = useTranslations().capabilities.items;
  const features = getFeatures(items);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
      {features.map((feature, i) => (
        <FeatureCard key={feature.id} feature={feature} index={i} />
      ))}
    </div>
  );
};

export default FeatureGrid;
