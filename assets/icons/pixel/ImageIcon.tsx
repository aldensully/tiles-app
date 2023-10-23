import * as React from "react";
import { View } from "react-native";
import Svg, { SvgProps, Path } from "react-native-svg";
const ImageIcon = (props: SvgProps) => (
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
        viewBox="0 0 32 32"
        {...props}
      >
        <Path
          fill={props.fill}
          d="M10 4v2H3v20h26V6h-7V4H10zm2 2h8v2h7v16H5V8h7V6zm11 4v2h2v-2h-2zm-12 1v10h10V11H11zm2 2h6v6h-6v-6z"
        />
      </Svg>
    </View>
  </View>
);
export default ImageIcon;