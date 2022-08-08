import dynamic from "next/dynamic";

import { preToCodeBlock } from "./utils";
import type { PrePropsType } from "./types";

const CodeBlock = dynamic(() => import("./CodeBlock"));

const Code: React.FC<PrePropsType> = (preProps) => {
  const props = preToCodeBlock(preProps);

  if (props) {
    return <CodeBlock {...props} />;
  }

  return null;
};

export default Code;
