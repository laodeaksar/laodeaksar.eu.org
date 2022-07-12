import { styled } from "@laodeaksarr/design-system";

import type { LogoProp } from "./types";

const Svg = styled("svg", {
  transition: "0.5s",
  willChange: "stroke, fill",
});

const Logo = ({ alt, size }: LogoProp) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 595 503"
    xmlSpace="preserve"
    aria-label={alt}
    width={size || 44}
    fill="none"
    stroke="var(--laodeaksar-colors-typeface-primary)"
  >
    <path
      d="M296.6 44.1c46.9 0 85 38.1 85 85v250.5c0 46.9-38.1 85-85 85s-85-38.1-85-85V129.1c0-47 38-85 85-85z"
      strokeMiterlimit={10}
      strokeWidth={30}
    />
    <path
      d="M367.8 152.5 218.5 414.7c-22.4 39.4-74.9 58.2-117.2 42-42.3-16.2-58.4-61.2-36-100.5L214.6 94c22.4-39.4 74.9-58.2 117.2-42s58.4 61.1 36 100.5z"
      strokeMiterlimit={10}
      strokeWidth={40}
    />
    <path
      d="M266.4 52c42.3-16.2 94.8 2.6 117.2 42l149.3 262.2c22.4 39.4 6.3 84.4-36 100.5-42.3 16.2-94.8-2.6-117.2-42L230.3 152.5C207.9 113.1 224 68.1 266.4 52z"
      strokeMiterlimit={10}
      strokeWidth={40}
    />
  </Svg>
);

export default Logo;
