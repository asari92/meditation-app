import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PlanCard } from './src/components/PlanCard';
import { MeditationCard } from './src/components/MeditationCard';
import { MoodOption } from './src/components/MoodOption';
import { Meditation, meditations } from './src/data/meditations';
import { generateAffirmation, Mood } from './src/utils/mockLLM';

type Screen = 'paywall' | 'meditations' | 'mood';
type Plan = 'free' | 'monthly' | 'yearly';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('paywall');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan>('yearly');
  const [selectedMeditationId, setSelectedMeditationId] = useState<Meditation['id'] | null>(null);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [affirmation, setAffirmation] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    setIsSubscribed(selectedPlan !== 'free');
    setCurrentScreen('meditations');
  };

  const handleMeditationPress = (meditation: Meditation) => {
    console.log('handleMeditationPress:', meditation.id, meditation.title, meditation.locked);

    if (meditation.locked && !isSubscribed) {
      setCurrentScreen('paywall');
      return;
    }

    setSelectedMeditationId(meditation.id);
  };

  const handleGenerateAffirmation = async () => {
    if (!selectedMood) return;

    setLoading(true);
    try {
      const text = await generateAffirmation(selectedMood);
      setAffirmation(text);
    } catch (error) {
      // Fallback уже встроен в generateAffirmation
      setAffirmation('Take a breath. You are doing better than you think.');
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePress = () => {
    if (!selectedMood || loading) return;
    handleGenerateAffirmation();
  };

  // Paywall Screen
  if (currentScreen === 'paywall') {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.paywallContainer}>
          <StatusBar barStyle="dark-content" backgroundColor="#F6EFE4" />
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.paywallHero}>
              <Text style={styles.eyebrow}>Choose Your Access</Text>
              <Text style={styles.paywallTitle}>Build Your Calm Ritual</Text>
              <Text style={styles.paywallSubtitle}>
                Pick a plan for your pace: free essentials, monthly flexibility, or the best-value annual premium.
              </Text>
            </View>

            <View style={styles.plansContainer}>
              <PlanCard
                title="Free"
                price="$0"
                subtitle="A light version with access to the unlocked meditation sessions."
                features={[
                  '3 unlocked meditations',
                  'Basic daily calm routine',
                  'Upgrade anytime for premium access',
                ]}
                selected={selectedPlan === 'free'}
                onPress={() => setSelectedPlan('free')}
              />

              <PlanCard
                title="Monthly"
                price="$9.99 / month"
                subtitle="Flexible premium access with all meditations unlocked."
                features={[
                  'Unlimited access to all sessions',
                  'Premium sleep and focus journeys',
                  'AI mood-based affirmations',
                ]}
                selected={selectedPlan === 'monthly'}
                onPress={() => setSelectedPlan('monthly')}
              />
              <PlanCard
                title="Yearly"
                price="$59.99 / year"
                badge="BEST VALUE"
                subtitle="The most complete option with the strongest savings."
                features={[
                  'Everything in Monthly',
                  'Best yearly price and lower monthly cost',
                  'Premium access all year long',
                ]}
                featured
                selected={selectedPlan === 'yearly'}
                onPress={() => setSelectedPlan('yearly')}
              />
            </View>

            <TouchableOpacity
              style={styles.paywallCta}
              onPress={handleContinue}
              activeOpacity={0.85}
            >
              <Text style={styles.paywallCtaText}>
                {selectedPlan === 'free'
                  ? 'Continue Free'
                  : selectedPlan === 'monthly'
                    ? 'Choose Monthly'
                    : 'Choose Yearly'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.terms}>
              {selectedPlan === 'free'
                ? 'Free plan keeps premium meditations locked. Upgrade anytime.'
                : selectedPlan === 'monthly'
                  ? '$9.99/month. Cancel anytime.'
                  : '$59.99/year. Best value for full premium access.'}
            </Text>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // Meditations Screen
  if (currentScreen === 'meditations') {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <Text style={styles.title}>Meditations</Text>
              <Text style={styles.subtitle}>
                Find your calm, anytime, anywhere
              </Text>
            </View>
            <View style={styles.listContainer}>
              {[...meditations]
                .sort((a, b) => parseInt(a.duration, 10) - parseInt(b.duration, 10))
                .map((meditation) => {
                  const isLocked = meditation.locked && !isSubscribed;

                  return (
                    <MeditationCard
                      key={meditation.id}
                      title={meditation.title}
                      duration={meditation.duration}
                      locked={isLocked}
                      imageSource={meditation.imageSource}
                      onPress={() => handleMeditationPress(meditation)}
                      selected={selectedMeditationId === meditation.id}
                    />
                  );
                })}
            </View>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setCurrentScreen('mood')}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>Go to AI Mood</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // AI Mood Screen
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>AI Mood</Text>
            <Text style={styles.subtitle}>
              Select your mood to get a personalized affirmation
            </Text>
          </View>
          <View style={styles.moodContainer}>
            <MoodOption
              emoji="🌿"
              label="Calm"
              selected={selectedMood === 'calm'}
              onPress={() => setSelectedMood('calm')}
            />
            <MoodOption
              emoji="😴"
              label="Tired"
              selected={selectedMood === 'tired'}
              onPress={() => setSelectedMood('tired')}
            />
            <MoodOption
              emoji="⚡"
              label="Energy"
              selected={selectedMood === 'energy'}
              onPress={() => setSelectedMood('energy')}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.ctaButton,
              (!selectedMood || loading) && styles.disabledButton,
            ]}
            onPress={handleGeneratePress}
            activeOpacity={0.8}
          >
            <Text style={styles.ctaText}>
              {loading ? 'Generating...' : 'Generate Affirmation'}
            </Text>
          </TouchableOpacity>

          {affirmation.length > 0 && (
            <View style={styles.affirmationContainer}>
              <Text style={styles.affirmationLabel}>Your affirmation:</Text>
              <Text style={styles.affirmationText}>{affirmation}</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setCurrentScreen('meditations')}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Back to Meditations</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6EFE4',
  },
  paywallContainer: {
    flex: 1,
    backgroundColor: '#F6EFE4',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginTop: 16,
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#5F5A54',
    lineHeight: 24,
  },
  paywallHero: {
    marginTop: 8,
    marginBottom: 24,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: '#8C6A43',
    marginBottom: 12,
  },
  paywallTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 10,
  },
  paywallSubtitle: {
    fontSize: 16,
    color: '#5F5A54',
    lineHeight: 24,
  },
  plansContainer: {
    marginBottom: 24,
  },
  paywallCta: {
    backgroundColor: '#C8843B',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 18,
    ...Platform.select({
      web: {
        boxShadow: '0px 8px 14px rgba(200, 132, 59, 0.18)',
      },
      default: {
        shadowColor: '#C8843B',
        shadowOpacity: 0.18,
        shadowRadius: 14,
        shadowOffset: {
          width: 0,
          height: 8,
        },
        elevation: 4,
      },
    }),
  },
  paywallCtaText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  listContainer: {
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: '#C8843B',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    ...Platform.select({
      web: {
        boxShadow: '0px 8px 14px rgba(200, 132, 59, 0.18)',
      },
      default: {
        shadowColor: '#C8843B',
        shadowOpacity: 0.18,
        shadowRadius: 14,
        shadowOffset: {
          width: 0,
          height: 8,
        },
        elevation: 4,
      },
    }),
  },
  disabledButton: {
    backgroundColor: '#CDB79A',
    ...Platform.select({
      web: {
        boxShadow: 'none',
      },
      default: {
        shadowOpacity: 0,
        elevation: 0,
      },
    }),
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  terms: {
    fontSize: 12,
    color: '#A99A87',
    textAlign: 'center',
    marginBottom: 24,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E6DACA',
    marginBottom: 24,
  },
  secondaryButtonText: {
    color: '#8C6A43',
    fontSize: 16,
    fontWeight: '700',
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    marginHorizontal: -6,
  },
  affirmationContainer: {
    backgroundColor: 'rgba(255,255,255,0.78)',
    padding: 20,
    borderRadius: 18,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#E6DACA',
  },
  affirmationLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8C6A43',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  affirmationText: {
    fontSize: 16,
    color: '#2D3436',
    lineHeight: 24,
    fontStyle: 'italic',
  },
});
