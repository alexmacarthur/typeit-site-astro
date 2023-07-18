import licenseOptions from "../../../licenseOptions";

export default (slug) => {
  return licenseOptions.find((option) => {
    return option.slug === slug;
  });
};
