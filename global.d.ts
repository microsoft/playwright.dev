/// <reference types="@docusaurus/theme-classic" />

declare module '@theme/ProgressiveImage' {
  export interface ProgressiveImageProps {
    image: {
      preSrc: string;
      src: {
        src: string;
        images: Array<{
          path: string;
          width: number;
          height: number;
        }>;
      };
    };
    alt: string;
  }
  
  export default function ProgressiveImage(props: ProgressiveImageProps): JSX.Element;
}
