import * as React from "react";
import { View } from "react-native";
import Svg, { SvgProps, Path } from "react-native-svg";
const TextIcon = (props: SvgProps) => (
  <View style={{
    width: props.width ?? 24,
    height: props.height ?? 24,
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <View style={{
      aspectRatio: 1
    }}>
      <Svg
        width={'100%'}
        height={'100%'}
        viewBox="0 0 30 30"
        {...props}
      >
        <Path
          fill={props.fill}
          d="M14.97 3.973a2 2 0 0 0-.284.027H6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7h5v16h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h2.676a2 2 0 0 0 .648 0H18a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1V7h5v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-8.68a2 2 0 0 0-.35-.027z" />

      </Svg>
    </View>
  </View>
);
export default TextIcon;