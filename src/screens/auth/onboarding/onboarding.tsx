import React, { FC, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StatusBar,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AuthStackProps } from "../../../@types";
import Svg, { Path, Circle } from "react-native-svg";
import { Icon, Images, Colors, Fonts } from "../../../constant";
import styles from "./onboarding.styles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface SlideData {
  id: string;
  title: string;
  description: string;
}

const ONBOARDING_SLIDES: SlideData[] = [
  {
    id: "1",
    title: "Support When You Need It Most",
    description:
      "Navigate your emotions with ease. Manage stress, find calm, and receive guidance whenever life feels overwhelming.",
  },
  {
    id: "2",
    title: "Track Your Daily Journey & Calmness",
    description:
      "Log your moods, emotions, and thoughts every day to visualize your mental health patterns and build mindfulness habits.",
  },
  {
    id: "3",
    title: "Stay Connected to Your Support System",
    description:
      "Connect with clinicians, mentors, and trusted supporters who can guide and encourage you.",
  },
];

const Onboarding: FC = () => {
  const navigation = useNavigation<NavigationProp<AuthStackProps>>();
  const flatListRef = useRef<FlatList<SlideData>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMood, setSelectedMood] = useState<string | null>("peaceful");

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SCREEN_WIDTH);
    if (
      index !== currentIndex &&
      index >= 0 &&
      index < ONBOARDING_SLIDES.length
    ) {
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (currentIndex < ONBOARDING_SLIDES.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    } else {
      // Navigate to Signin
      navigation.navigate("Signin");
    }
  };

  const renderVisualSlide = (id: string) => {
    switch (id) {
      case "1":
        return (
          <View style={styles.slide}>
            <View style={styles.blobContainer}>
              {/* Image */}
              <Image source={Images.Onboarding_1} style={styles.blobImage} />

              {/* Check-in Pill Badge */}
              <View style={styles.checkInBadge}>
                <Text style={{ fontSize: 14 }}>😌</Text>
                <Text style={styles.checkInText}>Check In: peaceful</Text>
              </View>

              {/* Calm progress widget */}
              <View style={styles.calmCard}>
                <View style={styles.calmHeader}>
                  <View style={styles.calmRow}>
                    <View style={styles.leafIconContainer}>
                      <Icon
                        family="Feather"
                        name="feather"
                        size={12}
                        color="#bd5807"
                      />
                    </View>
                    <Text style={styles.calmText}>Calm</Text>
                  </View>
                  <Icon
                    family="Feather"
                    name="chevron-right"
                    size={14}
                    color="#bd5807"
                  />
                </View>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressBar, { width: "45%" }]} />
                </View>
              </View>

              {/* Floating Heart Icon */}
              <View style={styles.heartBadge}>
                <Icon
                  family="FontAwesome"
                  name="heart"
                  size={12}
                  color="#be5c00"
                />
              </View>

              {/* Wavy Breathing Line SVG */}
              <View style={styles.waveOverlay}>
                <Svg width="100%" height="100%" viewBox="0 0 300 80">
                  <Path
                    d="M-20,40 Q25,10 65,42 T150,45 T235,42 T320,40"
                    fill="none"
                    stroke="rgba(242, 159, 23, 0.85)"
                    strokeWidth="3.5"
                  />
                  <Path
                    d="M-20,40 Q25,10 65,42 T150,45 T235,42 T320,40"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </Svg>
              </View>

              {/* Breathing info */}
              <View style={styles.breathingTextContainer}>
                <Text style={styles.breathingText}>Slow Breathing</Text>
                <View style={styles.breathingDots}>
                  <View
                    style={[styles.breathingDot, styles.breathingDotActive]}
                  />
                  <View style={styles.breathingDot} />
                  <View style={styles.breathingDot} />
                  <View style={styles.breathingDot} />
                </View>
              </View>
            </View>
          </View>
        );

      case "2":
        // Modern and premium interactive mood tracker Slide
        const moods = [
          { key: "peaceful", emoji: "😌", label: "Peaceful" },
          { key: "happy", emoji: "😃", label: "Happy" },
          { key: "calm", emoji: "🍃", label: "Calm" },
          { key: "grateful", emoji: "🙏", label: "Grateful" },
          { key: "loved", emoji: "🥰", label: "Loved" },
          { key: "focused", emoji: "🎯", label: "Focused" },
        ];

        return (
          <View style={styles.slide}>
            <View style={styles.dashboardContainer}>
              <View style={styles.dashHeader}>
                <Text style={styles.dashTitle}>Daily Mindfulness Tracker</Text>
                <Text style={styles.dashSubtitle}>
                  How are you feeling right now?
                </Text>
              </View>

              <View style={styles.moodGrid}>
                {moods.map((mood) => {
                  const isActive = selectedMood === mood.key;
                  return (
                    <TouchableOpacity
                      key={mood.key}
                      style={styles.moodItem}
                      activeOpacity={0.8}
                      onPress={() => setSelectedMood(mood.key)}
                    >
                      <View
                        style={[
                          styles.moodIconCircle,
                          isActive && styles.moodIconCircleActive,
                        ]}
                      >
                        <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                      </View>
                      <Text
                        style={[
                          styles.moodText,
                          isActive && {
                            color: "#bd5807",
                            fontFamily: Fonts.SemiBold,
                          },
                        ]}
                      >
                        {mood.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Interactive streak widget */}
              <View style={styles.streakCard}>
                <View style={styles.streakLeft}>
                  <Icon
                    family="Feather"
                    name="award"
                    size={20}
                    color="#ffffff"
                  />
                  <View style={styles.streakInfo}>
                    <Text style={styles.streakTitle}>Mindfulness Streak</Text>
                    <Text style={styles.streakSub}>Keep it up tomorrow!</Text>
                  </View>
                </View>
                <View style={styles.streakBadge}>
                  <Text style={styles.streakCount}>5 Days</Text>
                </View>
              </View>
            </View>
          </View>
        );

      case "3":
        return (
          <View style={styles.slide}>
            <View style={styles.benchContainer}>
              <Image source={Images.Onboarding_2} style={styles.benchImage} />

              {/* Floating Icons */}
              <View style={[styles.communityIcon, styles.heartRadiantIcon]}>
                <Icon family="Feather" name="heart" size={16} color="#d4791a" />
              </View>

              <View style={[styles.communityIcon, styles.linkIcon]}>
                <Icon family="Feather" name="link" size={16} color="#45a2ad" />
              </View>

              <View style={[styles.communityIcon, styles.chatBadge]}>
                <View style={styles.chatDots}>
                  <Icon
                    family="MaterialCommunityIcons"
                    name="message-text-outline"
                    size={12}
                    color="#45a2ad"
                  />
                </View>
                <View style={styles.userCircle}>
                  <Icon
                    family="Feather"
                    name="user"
                    size={11}
                    color="#d4791a"
                  />
                </View>
              </View>

              {/* SVG Dotted Connective Line between the two women */}
              <Svg style={styles.connectingSvg}>
                <Path
                  d="M 12 35 C 50 5, 120 50, 165 30"
                  fill="none"
                  stroke="#e8a853"
                  strokeWidth="2.5"
                  strokeDasharray="4, 4"
                />
                <Circle
                  cx="12"
                  cy="35"
                  r="4.5"
                  fill="#fcf6ec"
                  stroke="#e8a853"
                  strokeWidth="2"
                />
                <Circle
                  cx="165"
                  cy="30"
                  r="4.5"
                  fill="#fcf6ec"
                  stroke="#e8a853"
                  strokeWidth="2"
                />
              </Svg>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  const currentSlide = ONBOARDING_SLIDES[currentIndex];

  return (
    <View style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff8f2"
        translucent={true}
      />
      <View style={styles.container}>
        {/* Top Visual Slider */}
        <FlatList
          ref={flatListRef}
          data={ONBOARDING_SLIDES}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderItem={({ item }) => renderVisualSlide(item.id)}
          style={styles.scrollContainer}
        />

        {/* Bottom Text Sheet */}
        <View style={styles.bottomSheet}>
          <View style={styles.textBlock}>
            <Text style={styles.title}>{currentSlide.title}</Text>
            <Text style={styles.subtext}>{currentSlide.description}</Text>
          </View>

          {/* Dots Indicator */}
          <View style={styles.paginationContainer}>
            {ONBOARDING_SLIDES.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  currentIndex === index && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>

          {/* Next / Get Started Button */}
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>
              {currentIndex === ONBOARDING_SLIDES.length - 1
                ? "Get Started"
                : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;
