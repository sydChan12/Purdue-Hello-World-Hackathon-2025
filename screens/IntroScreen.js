import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');



const GlowingSquare = ({ anim, color, rotation }) => {
  const glowRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(glowRotation, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotateGlow = glowRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.glowWrapper,
        {
          transform: [{ rotate: rotateGlow }],
        },
      ]}
    >
      <LinearGradient
        colors={['#8EB69B', '#235347', '#163832', '#DAF1DE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.glowBorder}
      />
      <Animated.View
        style={[
          styles.square,
          {
            backgroundColor: color,
            transform: [...anim.getTranslateTransform(), { rotate }],
          },
        ]}
      />
    </Animated.View>
  );
};

export default function IntroScreen({ navigation }) {
  const square1 = useRef(new Animated.ValueXY({ x: -100, y: -100 })).current;
  const square2 = useRef(new Animated.ValueXY({ x: 100, y: -100 })).current;
  const square3 = useRef(new Animated.ValueXY({ x: -100, y: 100 })).current;
  const square4 = useRef(new Animated.ValueXY({ x: 100, y: 100 })).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const initialsOpacity = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    Animated.parallel([
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(square1, {
        toValue: { x: 0, y: 0 },
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(square2, {
        toValue: { x: 0, y: 0 },
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(square3, {
        toValue: { x: 0, y: 0 },
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(square4, {
        toValue: { x: 0, y: 0 },
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.sequence([
        Animated.timing(initialsOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const renderSquare = (anim, color) => (
    <Animated.View
      style={[
        styles.square,
        {
          backgroundColor: color,
          transform: [...anim.getTranslateTransform(), { rotate }],
        },
      ]}
    />
  );

  return (
    <LinearGradient colors={['#1a151f', '#232935']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.logoWrapper}>
        <View style={styles.logoContainer}>
          <GlowingSquare anim={square1} color="#c89b6f" rotation={rotation} />
          <GlowingSquare anim={square2} color="#e8c670" rotation={rotation} />
          <GlowingSquare anim={square3} color="#f7e2ad" rotation={rotation} />
          <GlowingSquare anim={square4} color="#d4a35e" rotation={rotation} />
          <Animated.Text style={[styles.glowingInitials, { opacity: initialsOpacity }]}>
            BR
          </Animated.Text>
        </View>
      </View>

      <Animated.View style={[styles.uiContainer, { opacity: logoOpacity }]}>
        <Text style={styles.title}>BoilerRoute</Text>
        <Text style={styles.subtitle}>Find & Reserve Parking Effortlessly</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a151f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowWrapper: {
    position: 'absolute',
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowBorder: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: 'transparent',
    zIndex: -1,
  },
  logoWrapper: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 100,
    height: 100,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    position: 'absolute',
    width: 100,        // Bigger size
    height: 100,
    borderRadius: 12,
    overflow: 'hidden', // Needed for glow layering
  },
  initialsText: {
    position: 'absolute',
    fontSize: 36,
    color: '#000000',
    fontWeight: 'bold',
  },
  uiContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#dea663',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#bf8441',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: '#bf8441',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    elevation: 2,
  },
  buttonText: {
    color: '#1a151f',
    fontSize: 18,
    fontWeight: '600',
  },
  glowingInitials: {
    position: 'absolute',
    fontSize: 48,
    fontWeight: 'bold',
    color: '#f7e2ad',
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});
