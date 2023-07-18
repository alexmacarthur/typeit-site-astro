import licenseOptions from "../../../licenseOptions";
import { License } from "../../types";

export default (slug): License | undefined => {
  return licenseOptions.find((option) => {
    return option.slug === slug;
  });
};
