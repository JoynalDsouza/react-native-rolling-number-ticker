# react-native-rolling-number-ticker

Rolling number animation ticker

![](https://github.com/JoynalDsouza/Awesome-RN/blob/main/src/assets/rollling-number-animation.gif)

## Installation

```sh
npm install react-native-rolling-number-ticker
```

## Usage

```js
import RollingNumberTicker from "react-native-rolling-number-ticker";
```

| Props        | Type                 | Description                     | default |
| ------------ | -------------------- | ------------------------------- | ------- |
| `textSize`   | number               | fontSize                        | 35      |
| `fromNumber` | number               | Counter start number(required)  | none    |
| `number`     | number               | Counter end number(required)    | none    |
| `duration`   | number(milliseconds) | duration of animation           | 1800    |
| `style`      | object               | additonal text styles(optional) | {}      |

#### Example

```js
<RollingNumberTicker
  textSize={20}
  fromNumber={10400}
  number={12929}
  duration={4000}
/>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
