import { useState } from "react";
import CopyIcon from "./CopyIcon";

const CopyButton = ({ retrieveContent }: { retrieveContent: () => string }) => {
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  return (
    <span
      onClick={() => {
        setHasCopied(true);
        navigator.clipboard.writeText(retrieveContent());
      }}
      className="absolute z-10 text-white right-3 top-3 cursor-pointer"
      aria-label={hasCopied ? "Copied!" : "Copy to clipboard"}
    >
      {hasCopied ? "Copied!" : <CopyIcon />}
    </span>
  );
};

export default CopyButton;
