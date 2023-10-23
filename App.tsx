import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { WithSpringConfig, runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { memo, useMemo, useState } from 'react';

const { width, height: height } = Dimensions.get('window');

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <GridView />
      </View>
    </GestureHandlerRootView>
  );
}

const springConfig: WithSpringConfig = {
  overshootClamping: true,
  damping: 25,
  stiffness: 300,
  mass: 2
};

const springConfigZoomedOut: WithSpringConfig = {
  overshootClamping: true,
  damping: 20,
  stiffness: 200,
};


const colors = [
  'red', 'green', 'blue',
  'yellow', 'purple', 'pink',
  'orange', 'brown', 'gray',
];

const GridView = () => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const velocityYThreshold = 950;
  const velocityXThreshold = 850;
  const velocityXThresholdsZoomedOut = { 1: 700, 2: 900, 3: 1200 };
  const velocityYThresholdsZoomedOut = { 1: 700, 2: 900, 3: 1200 };
  const numColumns = 20;
  const numRows = 20;
  const scaleFactor = 0.25;
  const isScaled = useSharedValue(false);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const offsets = useSharedValue({ x: 0, y: 0 });
  const scaledOutOffsets = useSharedValue({ x: 0, y: 0 });
  const coords = useSharedValue({ x: 0, y: 0 });


  // useEffect(() => {
  const pinchGesture = Gesture.Pinch()
    .onEnd((e) => {
      if (e.scale <= 0.5 || e.velocity < -3) {
        const newScale = scaleFactor;
        scale.value = withSpring(newScale, springConfig);
        savedScale.value = newScale;
        const translateToY = (height / 2) - (height * newScale) / 2 - (coords.value.y * (height * newScale));
        const translateToX = -(width * newScale) * coords.value.x;
        translateX.value = withSpring(translateToX, springConfig);
        translateY.value = withSpring(translateToY, springConfig);
        scaledOutOffsets.value = { x: translateToX, y: translateToY };
        isScaled.value = true;
      } else {
        scale.value = withSpring(1, springConfig);
        savedScale.value = 1;
        const translateToX = -width * coords.value.x;
        const translateToY = -height * coords.value.y;
        offsets.value.x = translateToX;
        offsets.value.y = translateToY;
        translateX.value = withSpring(translateToX, springConfig);
        translateY.value = withSpring(translateToY, springConfig);
        isScaled.value = false;
      }
    }).runOnJS(true);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (isScaled.value) {
        const xSize = width * scale.value;
        const ySize = height * scale.value;
        translateY.value = (scaledOutOffsets.value.y + e.translationY);
        translateX.value = (scaledOutOffsets.value.x + e.translationX);
        const offsetY = (height / 2) - (ySize / 2);
        const coordX = Math.round((translateX.value / xSize) * -1);
        const coordY = Math.round(((translateY.value - offsetY) / ySize) * -1);

        if (coordX !== coords.value.x) {
          if (coordX < 0) {
            coords.value.x = 0;
          } else if (coordX > (numColumns - 1)) {
            coords.value.x = numColumns - 1;
          } else {
            coords.value.x = coordX;
          }
        }
        if (coordY !== coords.value.y) {
          if (coordY < 0) {
            coords.value.y = 0;
          } else if (coordY > (numRows - 1)) {
            coords.value.y = numRows - 1;
          } else {
            coords.value.y = coordY;
          }
        }
      }
      else {
        translateX.value = offsets.value.x + e.translationX;
        translateY.value = offsets.value.y + e.translationY;
      }
    })
    .onEnd((e) => {
      const xSize = width * scale.value;
      const ySize = height * scale.value;
      const xOffset = xSize / 2;
      const yOffset = ySize / 2;

      if (isScaled.value) {
        //handle x axis movement
        //negative direction
        if (e.velocityX > velocityXThresholdsZoomedOut[3] && coords.value.x > 3) {
          coords.value.x = coords.value.x - 3;
        } else if (e.velocityX > velocityXThresholdsZoomedOut[2] && coords.value.x > 2) {
          coords.value.x = coords.value.x - 2;
        } else if (e.velocityX > velocityXThresholdsZoomedOut[1] && coords.value.x > 1) {
          coords.value.x = coords.value.x - 1;
        }
        //positive direction
        if (e.velocityX < -velocityXThresholdsZoomedOut[3] && coords.value.x < (numColumns - 4)) {
          coords.value.x = coords.value.x + 3;
        } else if (e.velocityX < -velocityXThresholdsZoomedOut[2] && coords.value.x < (numColumns - 3)) {
          coords.value.x = coords.value.x + 2;
        } else if (e.velocityX < -velocityXThresholdsZoomedOut[1] && coords.value.x < (numColumns - 2)) {
          coords.value.x = coords.value.x + 1;
        }

        //handle y axis movement
        //negative direction
        if (e.velocityY > velocityYThresholdsZoomedOut[3] && coords.value.y > 3) {
          coords.value.y = coords.value.y - 3;
        } else if (e.velocityY > velocityYThresholdsZoomedOut[2] && coords.value.y > 2) {
          coords.value.y = coords.value.y - 2;
        } else if (e.velocityY > velocityYThresholdsZoomedOut[1] && coords.value.y > 1) {
          coords.value.y = coords.value.y - 1;
        }
        //positive direction
        if (e.velocityY < -velocityYThresholdsZoomedOut[3] && coords.value.y < (numRows - 4)) {
          coords.value.y = coords.value.y + 3;
        } else if (e.velocityY < -velocityYThresholdsZoomedOut[2] && coords.value.y < (numRows - 3)) {
          coords.value.y = coords.value.y + 2;
        } else if (e.velocityY < -velocityYThresholdsZoomedOut[1] && coords.value.y < (numRows - 2)) {
          coords.value.y = coords.value.y + 1;
        }

        const translateToY = (height / 2) - (height * scale.value) / 2 - (coords.value.y * (height * scale.value));
        const translateToX = -(width * scale.value) * coords.value.x;
        scaledOutOffsets.value.x = translateToX;
        translateX.value = withSpring(translateToX, springConfigZoomedOut);
        scaledOutOffsets.value.y = translateToY;
        translateY.value = withSpring(translateToY, springConfigZoomedOut);
      } else {
        //x axis
        if (coords.value.x > 0 && (e.translationX > xOffset || e.velocityX > velocityXThreshold)) {
          translateX.value = withSpring(offsets.value.x + xSize, springConfig);
          offsets.value.x = offsets.value.x + xSize;
          coords.value.x = coords.value.x - 1;
          scaledOutOffsets.value.x = offsets.value.x;
          runOnJS(Haptics.selectionAsync)();
        } else if (coords.value.x < (numColumns - 1) && (e.translationX < -xOffset || e.velocityX < -velocityXThreshold)) {
          translateX.value = withSpring(offsets.value.x - xSize, springConfig);
          offsets.value.x = offsets.value.x - xSize;
          scaledOutOffsets.value.x = offsets.value.x;
          coords.value.x = coords.value.x + 1;
          runOnJS(Haptics.selectionAsync)();
        } else {
          translateX.value = withSpring(offsets.value.x, springConfig);
        }

        //y axis
        if (coords.value.y > 0 && (e.translationY > yOffset || e.velocityY > velocityYThreshold)) {
          translateY.value = withSpring(offsets.value.y + height, springConfig);
          offsets.value.y = offsets.value.y + height;
          scaledOutOffsets.value.y = offsets.value.y;
          coords.value.y = coords.value.y - 1;
          runOnJS(Haptics.selectionAsync)();
        }
        else if (coords.value.y < (numRows - 1) && (e.translationY < -yOffset || e.velocityY < -velocityYThreshold)) {
          translateY.value = withSpring(offsets.value.y - height, springConfig);
          offsets.value.y = offsets.value.y - height;
          scaledOutOffsets.value.y = offsets.value.y;
          coords.value.y = coords.value.y + 1;
          runOnJS(Haptics.selectionAsync)();
        } else {
          translateY.value = withSpring(offsets.value.y, springConfig);
        }
      }
    }).runOnJS(true);



  const composed = Gesture.Race(pinchGesture, panGesture);


  const animStyle = useAnimatedStyle(() => {
    return {
      zIndex: 1,
      flex: 0,
      backgroundColor: 'black',
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value }
      ],
    };
  });



  const handleCellPress = (rowIndex: number, colIndex: number) => {
    if (!isScaled.value) return;
    coords.value.x = colIndex;
    coords.value.y = rowIndex;

    const translateToX = -width * colIndex;
    const translateToY = -height * rowIndex;
    offsets.value.x = translateToX;
    offsets.value.y = translateToY;
    scaledOutOffsets.value.x = translateToX;
    scaledOutOffsets.value.y = translateToY;
    savedScale.value = 1;
    scale.value = withSpring(1, springConfig);
    translateX.value = withSpring(translateToX, springConfig);
    translateY.value = withSpring(translateToY, springConfig);
    isScaled.value = false;
  };

  const visibleRows = useMemo(() => {
    return Array.from({ length: numRows }, (_, rowIndex) => {
      const cells = Array.from({ length: numColumns }, (_, colIndex) => {
        const index = rowIndex * numColumns + colIndex;
        return <Cell key={index} onPress={handleCellPress} column={colIndex} row={rowIndex} index={index} />;
      });
      return (
        <View key={rowIndex} style={{ flex: 0 }}>
          {cells}
        </View>
      );
    });
  }, []);


  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        style={animStyle}
      >
        {visibleRows.map((row) => {
          return row;
        })}
      </Animated.View>
    </GestureDetector>
  );
};

type CellProps = {
  column: number;
  row: number;
  index: number;
  onPress: (row: number, col: number) => void;
};

const Cell = memo((props: CellProps) => {
  const { column, row, index, onPress } = props;
  return (
    <Pressable
      onPress={() => onPress(row, column)}
      key={column} style={[styles.cell, {
        left: column * width,
        top: row * height,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)]
      }]}
    />
  );
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cell: {
    width,
    position: 'absolute',
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
