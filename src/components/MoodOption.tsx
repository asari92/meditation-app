import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

interface MoodOptionProps {
  emoji: string;
  label: string;
  selected: boolean;
  onPress: () => void;
}

export const MoodOption: React.FC<MoodOptionProps> = ({
  emoji,
  label,
  selected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.78)',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#E6DACA',
    minWidth: 100,
    flex: 1,
    marginHorizontal: 6,
    cursor: 'pointer',
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
  emoji: {
    fontSize: 34,
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6C757D',
  },
  labelSelected: {
    color: '#A65E18',
  },
});
