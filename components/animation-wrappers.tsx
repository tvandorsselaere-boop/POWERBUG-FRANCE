import React from 'react';
import { AnimationSection } from './animation-section';
import { AnimationProductCard } from './animation-product-card';
import { AnimationFeatureCard } from './animation-feature-card';
import { AnimationBundleBanner } from './animation-bundle-banner';

export const HomeAnimations = {
  Hero: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Section: AnimationSection,
  ProductCard: AnimationProductCard,
  FeatureCard: AnimationFeatureCard,
  BundleBanner: AnimationBundleBanner,
};
