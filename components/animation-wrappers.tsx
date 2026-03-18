import React from 'react';
import { AnimationSection as Section } from './animation-section';
import { AnimationProductCard as ProductCard } from './animation-product-card';
import { AnimationFeatureCard as FeatureCard } from './animation-feature-card';
import { AnimationBundleBanner as BundleBanner } from './animation-bundle-banner';

const Hero = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const HomeAnimations = {
  Hero,
  Section,
  ProductCard,
  FeatureCard,
  BundleBanner,
};
