export type RollingNumberTickerProps = {
  style?: any;
  textSize?: number;
  textStyle?: any;
  fromNumber: number;
  number: number;
  duration?: number;
  animationStartDelay?: number;
};

export type TextTickerState = {
  animatedValue: any;
  isAnimating: boolean;
  delay: number;
  number: number;
};

export type TextTickerProps = {
  from: number;
  key: number;
  textSize: number;
  targetNumber: number;
  duration: number;
  animationStartDelay: number;
};
