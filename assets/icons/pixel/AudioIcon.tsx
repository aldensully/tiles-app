import * as React from "react";
import { View } from "react-native";
import Svg, { SvgProps, Path } from "react-native-svg";
const AudioIcon = (props: SvgProps) => (
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
          d="M9 6v14H5v6h6V10h12v10h-4v6h6V6H9z"
        />
      </Svg>
    </View>
  </View>
);
export default AudioIcon;