import { motion, useMotionValue, useTransform } from "framer-motion";

import { Text } from "@laodeaksarr/design-system";

import { fixTruncate, HeaderTitleWrapper } from "./Styles";
import type { HeaderTitleProps } from "./types";

const titleVariants = {
  open: {
    y: 70,
    transition: {
      ease: "easeInOut",
      duration: 0.4,
    },
  },
  collapsed: {
    y: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.4,
    },
  },
};

export const HeaderTitle = (props: HeaderTitleProps) => {
  const { text } = props;
  const titleY = useMotionValue(0);
  const titleOpacity = useTransform(titleY, [10, 0], [0, 1]);

  return (
    <HeaderTitleWrapper className={fixTruncate}>
      <Text
        as={motion.span}
        size={4}
        weight={4}
        variants={titleVariants}
        truncate
        css={{ marginBottom: 0 }}
        style={{
          y: titleY,
          opacity: titleOpacity,
        }}
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          tabIndex={-1}
        >
          {text}
        </a>
      </Text>
    </HeaderTitleWrapper>
  );
};
