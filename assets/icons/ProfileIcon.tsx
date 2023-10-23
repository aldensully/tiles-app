import * as React from "react";
import { View } from "react-native";
import Svg, { SvgProps, Path } from "react-native-svg";
const ProfileIcon = (props: SvgProps) => (
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
        viewBox="0 0 100 100"
        {...props}
      >
        <Path
          fill={props.fill}
          d="M49.987 52.16c-10.78 0-19.55-9.232-19.55-20.58 0-11.348 8.77-20.58 19.55-20.58 10.78 0 19.551 9.232 19.551 20.58 0 11.348-8.771 20.58-19.55 20.58Zm22.496 37.044H27.491c-8.106 0-14.19-8.218-10.271-15.703 5.476-10.465 18.337-17.225 32.767-17.225 14.43 0 27.291 6.76 32.768 17.223 4.07 7.778-2.489 15.705-10.272 15.705Z"
        />
      </Svg>
    </View>
  </View>
);
export default ProfileIcon;