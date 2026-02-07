import licenseOptions from "../../../licenseOptions";
import type { License } from "../../types";

export default (slug: string | null): License | undefined => {
  if (!slug) return undefined;
  return licenseOptions.find((option) => {
    return [option.slug, option.friendlySlug].includes(slug);
  });
};
