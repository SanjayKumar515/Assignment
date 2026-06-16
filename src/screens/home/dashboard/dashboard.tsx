import React, { FC, useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserData, UserDataContext } from '../../../context/userDataContext';
import { Icon } from '../../../constant';
import styles from './dashboard.styles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LocalStorage } from '../../../helpers/localstorage';
import { UserService } from '../../../service/apiService';
import { handleSignout } from '../../../helpers/helpers';

const Dashboard: FC = () => {
  const navigation = useNavigation();
  const { userData, setUserData, setIsLoggedIn } =
    useContext<any>(UserDataContext);

  const handleLogout = () => {
    handleSignout(setIsLoggedIn);
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = await LocalStorage.read('@user');
        const token =
          storedUser?.token ||
          storedUser?.access_token ||
          storedUser?.authorisation?.token;

        if (token) {
          try {
            const response = await UserService.getProfile(token);
            if (response && response.status === 200) {
              setUserData(response.data);
              await LocalStorage.save('@user', response.data);
            }
          } catch (error: any) {
            console.log(
              'Profile fetch failed, attempting to refresh token...',
              error?.response?.status,
            );
            try {
              const refreshResponse = await UserService.refreshToken(token);
              if (refreshResponse && refreshResponse.status === 200) {
                const newToken =
                  refreshResponse.data?.authorisation?.token ||
                  refreshResponse.data?.token;

                if (newToken) {
                  const updatedUser = { ...storedUser };
                  if (updatedUser.authorisation) {
                    updatedUser.authorisation.token = newToken;
                  } else {
                    updatedUser.token = newToken;
                  }
                  await LocalStorage.save('@user', updatedUser);

                  // Retry getting profile with the new token
                  const retryResponse = await UserService.getProfile(newToken);
                  if (retryResponse.status === 200) {
                    setUserData(retryResponse.data);
                    await LocalStorage.save('@user', retryResponse.data);
                  }
                }
              }
            } catch (refreshError) {
              console.log(
                'Refresh API failed! Auto logging out...',
                refreshError,
              );
              handleLogout();
            }
          }
        }
      } catch (error) {
        console.log('Error in fetchProfile initialization:', error);
      }
    };

    fetchProfile();
  }, [setUserData]);

  const userName =
    userData?.data?.user?.name || userData?.user?.data?.user?.name;
  const checkInData = [
    {
      label: 'Motivation',
      icon: 'zap',
      color: '#ff9800',
      bg: 'rgba(255,152,0,0.1)',
    },
    {
      label: 'Cravings',
      icon: 'coffee',
      color: '#f44336',
      bg: 'rgba(244,67,54,0.1)',
    },
    {
      label: 'Triggers',
      icon: 'alert-circle',
      color: '#ff9800',
      bg: 'rgba(255,152,0,0.1)',
    },
    {
      label: 'Mood',
      icon: 'smile',
      color: '#4caf50',
      bg: 'rgba(76,175,80,0.1)',
    },
  ];

  const [soberDays, setSoberDays] = useState(47);
  const [nextMilestone, setNextMilestone] = useState(60);
  const [isNearRiskLocation, setIsNearRiskLocation] = useState(true);

  const [planData, setPlanData] = useState([
    {
      id: 1,
      title: 'Morning Meditation',
      time: '9:00 AM',
      completed: true,
      emoji: '🧘‍♂️',
    },
    {
      id: 2,
      title: 'Therapy Session',
      time: '2:00 PM',
      completed: false,
      emoji: '🛋️',
    },
    {
      id: 3,
      title: 'Support Group Meeting',
      time: '6:00 PM',
      completed: false,
      emoji: '🫂',
    },
  ]);

  useEffect(() => {
    if (userData) {
      const userObj = userData.user || userData;

      if (userObj.soberDays !== undefined)
        setSoberDays(Number(userObj.soberDays));
      if (userObj.nextMilestone !== undefined)
        setNextMilestone(Number(userObj.nextMilestone));
      if (userObj.isNearRiskLocation !== undefined)
        setIsNearRiskLocation(Boolean(userObj.isNearRiskLocation));
      if (userObj.planData && Array.isArray(userObj.planData)) {
        setPlanData(userObj.planData);
      }
    }
  }, [userData]);

  const togglePlanItem = (id: number) => {
    setPlanData(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.greetingTitle}>
              Hi, Good Morning,{'\n'}
              {userName}! 👋
            </Text>
            <Text style={styles.greetingSubtitle}>
              You're not alone. We're here for you.
            </Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconWrapper}>
              <Icon
                family="Feather"
                name="message-square"
                size={24}
                color="#f4b400"
              />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconWrapper}>
              <Icon family="Feather" name="bell" size={24} color="#f4b400" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            </TouchableOpacity>
            <Image
              source={{
                uri:
                  'https://ui-avatars.com/api/?name=' +
                  userName +
                  '&background=random',
              }}
              style={styles.avatar}
            />
          </View>
        </View>

        {/* Daily Check-in */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Daily Check-in</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>Complete ›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.checkInGrid}>
          {checkInData.map((item, index) => (
            <TouchableOpacity key={index} style={styles.checkInCard}>
              <View
                style={[
                  styles.checkInIconWrapper,
                  { backgroundColor: item.bg },
                ]}
              >
                <Icon
                  family="Feather"
                  name={item.icon}
                  size={20}
                  color={item.color}
                />
              </View>
              <Text style={styles.checkInLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Milestone Card */}
        <View style={styles.milestoneCard}>
          <View style={styles.milestoneHeader}>
            <Icon family="Feather" name="activity" size={24} color="#fff" />
            <Text style={styles.milestoneTitle}>
              {soberDays} Days Sober Today
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${Math.min((soberDays / nextMilestone) * 100, 100)}%`,
                },
              ]}
            />
          </View>
          <Text style={styles.milestoneSubtitle}>
            Next milestone: {nextMilestone} days
          </Text>
        </View>

        {/* Risk Alert */}
        {isNearRiskLocation && (
          <View style={styles.riskAlertCard}>
            <View style={styles.riskAlertIconContainer}>
              <Icon
                family="Feather"
                name="alert-circle"
                size={20}
                color="red"
              />
            </View>
            <View style={styles.riskAlertContent}>
              <Text style={styles.riskAlertTitle}>
                You're near a high-risk location
              </Text>
              <Text style={styles.riskAlertDesc}>
                Based on your settings, you're within 0.3 miles of a location
                you've marked to avoid.
              </Text>
            </View>
          </View>
        )}

        {/* Today's Plan */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Plan</Text>
        </View>

        <View style={styles.planList}>
          {planData.map(plan => (
            <View key={plan.id} style={styles.planItem}>
              <TouchableOpacity
                style={styles.planCheckbox}
                onPress={() => togglePlanItem(plan.id)}
                activeOpacity={0.7}
              >
                {plan.completed ? (
                  <Icon
                    family="Feather"
                    name="check-circle"
                    size={24}
                    color="#4caf50"
                  />
                ) : (
                  <Icon family="Feather" name="circle" size={24} color="#ccc" />
                )}
              </TouchableOpacity>
              <View style={styles.planContent}>
                <Text style={styles.planTitle}>{plan.title}</Text>
                <View style={styles.planTimeRow}>
                  <Icon family="Feather" name="clock" size={12} color="#999" />
                  <Text style={styles.planTimeText}>{plan.time}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.planAvatar,
                  { justifyContent: 'center', alignItems: 'center' },
                ]}
              >
                <Text style={{ fontSize: wp(6) }}>{plan.emoji}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
