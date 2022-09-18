import { motion } from "framer-motion";

import { styled, Text } from "@laodeaksarr/design-system";
import { HEIGHT, MAX_HEIGHT } from "./constants";

export const Result = styled(motion.li, {
  display: "flex",
  alignItems: "center",
  marginBottom: "0px",
  listStyle: "none",
  fontSize: "$2",
  lineHeight: "24px",
  color: "var(--laodeaksar-colors-typeface-secondary)",
  padding: "10px 25px",
  height: `${HEIGHT}px`,

  a: {
    color: "unset",
    display: "block",
    width: "500px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  "> div": {
    opacity: 0,
  },

  variants: {
    selected: {
      true: {
        bc: "var(--laodeaksar-colors-foreground)",

        a: {
          color: "var(--laodeaksar-colors-brand)",
        },

        "> div": {
          opacity: 1,
        },
      },
    },
  },
});

export const SearchResults = styled("ul", {
  background: "var(--laodeaksar-colors-body)",
  maxHeight: `${MAX_HEIGHT}px`,
  overflowY: "scroll",
  margin: "0",
  padding: "0",

  "@media (max-width: 700px)": {
    maxHeight: "450px",
  },
});

export const SearchBox = styled(motion.div, {
  position: "fixed",
  overflow: "hidden",
  width: "600px",
  top: "20%",
  left: "50%",
  transform: "translateX(-50%)",
  borderRadius: "$2",
  boxShadow: '$3',
  border: "1px solid var(--laodeaksar-border-color)",

  "@media (max-width: 700px)": {
    width: "$full",
    top: "0",
    borderRadius: "0px",
  },
});

export const FormWrapper = styled("div", {
  background: "var(--laodeaksar-colors-body)",

  form: {
    margin: "0px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid var(--laodeaksar-border-color)",
  },

  input: {
    background: "transparent",
    border: "none",
    fontSize: "$2",
    fontWeight: "$2",
    height: "55px",
    padding: "0px 25px",
    width: "$full",
    outline: "none",
    color: "var(--laodeaksar-colors-typeface-primary)",

    "&::placeholder": {
      color: "var(--laodeaksar-colors-typeface-secondary)",
      opacity: "0.54",
    },

    "&::-webkit-input-placeholder": {
      color: "var(--laodeaksar-colors-typeface-secondary)",
      opacity: "0.54",
    },

    "&:-ms-input-placeholder": {
      color: "var(--laodeaksar-colors-typeface-secondary)",
      opacity: "0.54",
    },

    appearance: "none",
    outlineOffset: "-2px",

    "&::-webkit-search-cancel-button": {
      WebkitAppearance: "none",
    },

    "&::-webkit-search-decoration": {
      WebkitAppearance: "none",
    },

    "&::-webkit-file-upload-button": {
      WebkitAppearance: "button",
      font: "inherit",
    },

    "&::-webkit-autofill": {
      background: "transparent",
      color: "var(--laodeaksar-colors-typeface-primary)",
      fontSize: "$1",
    },
  },
});

export const Overlay = styled(motion.div, {
  position: "fixed",
  top: "0",
  left: "0",
  size: "$full",
  zIndex: "$max",
  outline: "none",
});

export const KBD = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
  <Text
    {...props}
    as="kbd"
    css={{
      fontFamily: "$display",
      borderRadius: "$1",
      padding: "8px",
      background: "var(--laodeaksar-colors-emphasis)",

      "&:not(:last-child)": {
        marginRight: "12px",
      },
    }}
    size="1"
    variant="info"
  />
);

export const Item = styled("li", {
  height: `${HEIGHT}px`,
  marginBottom: "0px",
  transition: "0.25s",
  listStyle: "none",
  fontSize: "$2",
  color: "var(--laodeaksar-colors-typeface-secondary)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 25px",
  userSelect: "none",

  a: {
    color: "unset",
    width: "$full",
    height: `${HEIGHT}px`,
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },

  "&:hover": {
    bc: "var(--laodeaksar-colors-emphasis)",

    "&[data-nohover]": {
      bc: "inherit",
    },

    a: {
      color: "var(--laodeaksar-colors-brand)",
    },

    svg: {
      stroke: "var(--laodeaksar-colors-brand)",
    },
  },
});

export const Separator = styled("li", {
  height: "30px",
  width: "$full",
  fontSize: "$1",
  bc: "var(--laodeaksar-colors-foreground)",
  color: "var(--laodeaksar-colors-typeface-tertiary)",
  fontWeight: "$3",
  display: "flex",
  alignItems: "center",
  px: "25px",
  marginBottom: "0",
});
