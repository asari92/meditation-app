import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType, Platform } from 'react-native';

interface MeditationCardProps {
  title: string;
  duration: string;
  locked: boolean;
  imageSource: ImageSourcePropType;
  onPress: () => void;
  selected?: boolean;
}

export const MeditationCard: React.FC<MeditationCardProps> = ({
  title,
  duration,
  locked,
  imageSource,
  onPress,
  selected,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, locked && styles.locked, selected && styles.selected]}
      onPress={() => {
        console.log('MeditationCard TouchableOpacity pressed for:', title);
        onPress();
      }}
      activeOpacity={0.8}
    >
      <Image source={imageSource} style={[styles.image, locked && styles.imageLocked]} />
      <View style={styles.content}>
        <Text style={[styles.title, locked && styles.lockedText]}>{title}</Text>
        <Text style={[styles.duration, locked && styles.lockedSubtext]}>{duration}</Text>
      </View>
      {locked && (
        <View style={styles.lockIcon}>
          <Text style={styles.lockText}>🔒</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    backgroundColor: 'rgba(255,255,255,0.78)',
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#E6DACA',
    cursor: 'pointer',
  },
  locked: {
    backgroundColor: '#F2EBE1',
    borderColor: '#D9CCBA',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 92,
    height: 92,
    borderRadius: 16,
    marginRight: 16,
    backgroundColor: '#E9DED1',
  },
  imageLocked: {
    opacity: 0.55,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3436',
  },
  duration: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 8,
  },
  lockedText: {
    color: '#8E8477',
  },
  lockedSubtext: {
    color: '#9A9083',
  },
  lockIcon: {
    marginLeft: 12,
  },
  lockText: {
    fontSize: 20,
  },
  selected: {
    borderColor: '#C8843B',
    backgroundColor: '#FFF7ED',
    ...Platform.select({
      web: {
        boxShadow: '0px 6px 12px rgba(200, 132, 59, 0.12)',
      },
      default: {
        shadowColor: '#C8843B',
        shadowOpacity: 0.12,
        shadowRadius: 12,
        shadowOffset: {
          width: 0,
          height: 6,
        },
        elevation: 4,
      },
    }),
  },
});
