import TypeIt from "typeit-react";

export default () => {
  return (
    <TypeIt
      getBeforeInit={(instance) => {
        instance
          .type("Testing typing")
          .pause(750)
          .type("<span>something</span>");
        return instance;
      }}
    />
  );
};
