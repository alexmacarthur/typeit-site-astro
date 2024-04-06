---
title: Installation & Usage
description: >-
  A JS package that makes it easy to build animated typing effects in React.
---

The official React component for the most versatile JavaScript typewriter effect library on the planet. You can use it to bring dynamic react typing effects to your React applications.

## Installation

`npm install typeit-react`

## Usage

### The Simplest Example

In its simplest implementation, import the component and wrap some text to be typed.

```javascript
import TypeIt from "typeit-react";

export default () => {
  return (
    <div className="App">
      <TypeIt>This will be typed in a `span` element!</TypeIt>
    </div>
  );
};
```

### A More Complex Example

The component will allow its children to fully render, and then type whatever HTML is generated. So, in addition to simple strings, you can nest HTML and components like below.

```javascript
import TypeIt from "typeit-react";

// This could be any component that generates HTML.
const SuperStrong = ({ children }) => {
  return <strong style={{ fontSize: "80px" }}>{children}</strong>;
};

export default () => {
  return (
    <div className="App">
      <TypeIt>
        Weak text. <SuperStrong>Super strong text.</SuperStrong>
      </TypeIt>
    </div>
  );
};
```

### Customizing Your Options

To tweak the animation to your liking, pass an object as the `options` prop. All options supported by the core TypeIt library can be used here. Using this prop, you can also set strings without passing them as children. See [TypeIt's documentation](https://typeitjs.com/docs#options) for more details on what's available.

```javascript
import TypeIt from "typeit-react";

export default () => {
  return (
    <div className="App">
      <TypeIt
        options={{
          strings: ["This will be typed!"],
          speed: 10,
          waitUntilVisible: true,
        }}
      />
    </div>
  );
};
```

### Choosing Your Own Element

Out of the box, a `span` element is used to contain the typing animation. To choose your own element, use the `as` prop.

```javascript
import TypeIt from "typeit-react";

export default () => {
  return (
    <div className="App">
      <TypeIt as={"h3"}>This will be typed in an H3 tag.</TypeIt>
    </div>
  );
};
```

### Fine-Tuning with Instance Methods

TypeIt comes with a set of [special methods](https://typeitjs.com/docs#instance-methods) that let you fine-tune an animation down to the smallest detail. To leverage them here, pass a function as the `onBeforeInit` prop, which will give you access to the instance you can modify with these methods, and then return back to the component before the animation is initialized.

```javascript
import TypeIt from "typeit-react";

<TypeIt
  getBeforeInit={(instance) => {
    instance.type("Hi, I'm Alxe").pause(750).delete(2).pause(500).type("ex!");

    // Remember to return it!
    return instance;
  }}
/>;
```

### Accessing the Instance After Initalization

Similarly, the `getAfterInit` prop allows you to access the instance _after_ it's been kicked off, so you'll be able to leverage methods like `.freeze()`, `.unfreeze()`, and `.is()`. Read more about those [here](https://typeitjs.com/docs#non-chainable-instance-methods).

```javascript
export default () => {
  const [buttonText, setButtonText] = useState("Freeze");
  const [instance, setInstance] = useState(null);

  const toggleFreeze = () => {
    if (instance.is("frozen")) {
      instance.unfreeze();
      setButtonText("Freeze");
      return;
    }

    instance.freeze();
    setButtonText("Unfreeze");
  };

  return (
    <div className="App">
      <button onClick={toggleFreeze}>{buttonText}</button>

      <TypeIt
        options={{ loop: true }}
        getAfterInit={(instance) => {
          setInstance(instance);
          return instance;
        }}
      >
        This will just keep on going.
      </TypeIt>
    </div>
  );
};
```
