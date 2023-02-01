import React, { Component } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

const RollingNumberTicker = ({
  style,
  textSize = 35,
  textStyle,
  fromNumber = 90,
  number = 360,
  duration,
  animationStartDelay = 0,
}) => {
  const padLeadingZeros = (num, size) => {
    if (num.toString().length == size) {
      return num.toString();
    }
    let s = num + "";
    while (s.length < size) {
      s = "0" + s;
    }
    return s;
  };
  const numberLength = number.toString().length;
  const fromNumberWithLeadingZero = padLeadingZeros(fromNumber, numberLength);

  const mapToDigits = () => {
    let counter = 0;
    return (Number(number).toLocaleString("en-IN") + "")
      .split("")
      .map((data, index) => {
        const prevCounter = counter;
        counter = counter + 1;
        if (
          data === "." ||
          data === ","
          // data === fromNumberWithLeadingZero[prevCounter]
        ) {
          if (data === ",") {
            counter -= 2;
          }
          return (
            <Text
              key={index}
              style={{ color: "#17BE1B" }}
              // mt={0.8}
            >
              {data}
            </Text>
          );
        } else {
          return (
            <TextTicker
              from={Number(fromNumberWithLeadingZero[prevCounter])}
              key={index}
              textSize={textSize}
              textStyle={textStyle}
              targetNumber={parseFloat(data, 10)}
              duration={duration}
              animationStartDelay={animationStartDelay}
            />
          );
        }
      });
  };

  return (
    <View
      style={[
        style,
        {
          flexDirection: "row",
          alignItems: "center",
          maxHeight: 20,
          justifyContent: "center",
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {mapToDigits()}
      </View>
    </View>
  );
};

class TextTicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(0),
      isAnimating: true,
      delay: 800,
      number: 1,
    };

    const { targetNumber, from, animationStartDelay } = this.props;
    if (targetNumber < from) {
      for (let i = from; i >= targetNumber; i--) {
        this.numberList.push({ id: i });
      }
    } else {
      for (let i = from; i <= targetNumber; i++) {
        this.numberList.push({ id: i });
      }
    }
  }

  componentDidMount() {
    this.startAnimation();
  }

  numberList = [];

  startAnimation = () => {
    const { animatedValue } = this.state;
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: this.props.duration,
      delay: animationStartDelay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      // on finish..
    });
  };

  getInterpolatedVal = (val) => {
    return val.interpolate({
      inputRange: [0, 1],
      outputRange: [
        this.props.textSize * this.numberList.length,
        this.props.textSize * 0.2,
      ],
      extrapolate: "clamp",
    });
  };

  renderNumbers = (styles) => {
    return this.numberList.map((data) => {
      return (
        <Text key={data.id} style={[this.props.textStyle, styles.text]}>
          {data.id}
        </Text>
      );
    });
  };

  render() {
    const { animatedValue } = this.state;
    const styles = generateStyles(this.props.textSize);

    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            transform: [
              {
                translateY: this.getInterpolatedVal(animatedValue),
              },
            ],
          }}
        >
          {this.renderNumbers(styles)}
        </Animated.View>
      </View>
    );
  }
}

TextTicker.defaultProps = {
  duration: 1800,
  targetNumber: 7,
  movingDown: true,
  textSize: 35,
};

TextTicker.propTypes = {
  duration: PropTypes.number,
  targetNumber: PropTypes.number,
  movingDown: PropTypes.bool,
  textSize: PropTypes.number,
  textStyle: PropTypes.any,
};

const generateStyles = (textSize) =>
  StyleSheet.create({
    container: {
      width: textSize * 0.62,
      height: textSize,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    text: {
      fontSize: textSize,
      lineHeight: textSize,
    },
  });

export default RollingNumberTicker;
