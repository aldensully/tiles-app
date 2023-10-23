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
        viewBox="0 0 64 64"
        {...props}
      >
        <Path
          fill={props.fill}
          d="M47.135 11.004a2.023 2.023 0 0 0-.45.021L22.53 14.863A3 3 0 0 0 20 17.826V37c0 2.463-.996 3.299-4.555 4.086C11.81 41.89 10 43.62 10 46.588 10 50.247 12.253 52 16.51 52 20.429 52 24 49.366 24 42V27.094c0-.384.277-.712.656-.774l19.766-3.209a.499.499 0 0 1 .578.493V35c0 2.463-.996 3.299-4.555 4.086C36.81 39.89 35 41.62 35 44.588 35 48.247 37.253 50 41.51 50 45.429 50 49 47.366 49 40V13a2 2 0 0 0-1.865-1.996z" />

      </Svg>
    </View>
  </View>
);
export default AudioIcon;