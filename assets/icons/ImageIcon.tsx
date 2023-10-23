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
        viewBox="0 0 64 64"
        {...props}
      >
        <Path
          fill={props.fill}
          d="M15 13a6 6 0 0 0-6 6v26a6 6 0 0 0 6 6h34a6 6 0 0 0 6-6V19a6 6 0 0 0-6-6H15zm0 4h34a2 2 0 0 1 2 2v22.434l-9.318-8.38a4.001 4.001 0 0 0-5.358.007l-7.922 7.158-3.793-3.244a4 4 0 0 0-5.21.01L13 42.495V19a2 2 0 0 1 2-2zm8 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />

      </Svg>
    </View>
  </View>
);
export default ImageIcon;