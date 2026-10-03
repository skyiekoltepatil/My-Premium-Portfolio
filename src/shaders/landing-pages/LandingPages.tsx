import { LandingPageFrame, type LandingPageFrameProps } from "./LandingPageFrame";
import type { CSSProperties } from "react";

export type PageTypographyProps = {
  headingFont?: string;
  bodyFont?: string;
  headingWeight?: string;
  bodyWeight?: string;
  primaryColor?: string;
  headingSize?: number;
  bodySize?: number;
  headingLetterSpacing?: number;
};

export type LandingPageProps = Omit<
  LandingPageFrameProps,
  "sourceUrl" | "title" | "customization" | "backgroundCanvasSelector" | "backgroundVisualSelector"
>;

export function CompleteShelfLandingPage(props: LandingPageProps & PageTypographyProps) {
  // We can pass typography props as custom variables to the iframe if needed, 
  // but the iframe itself will render exactly what is configured in complete-shelf-v2.html.
  return (
    <LandingPageFrame 
      {...props} 
      title="Selected Work" 
      sourceUrl="/landing-pages/complete-shelf-v2.html" 
    />
  );
}
