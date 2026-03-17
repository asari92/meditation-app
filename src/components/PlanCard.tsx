import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PlanCardProps {
  title: string;
  price: string;
  subtitle?: string;
  features?: string[];
  badge?: string;
  featured?: boolean;
  selected: boolean;
  onPress: () => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  title,
  price,
  subtitle,
  features = [],
  badge,
  featured = false,
  selected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        featured && styles.featured,
        selected && styles.selected,
        selected && featured && styles.selectedFeatured,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, featured && styles.titleFeatured]}>{title}</Text>
          {badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
        <Text style={[styles.price, featured && styles.priceFeatured]}>{price}</Text>
        {subtitle && <Text style={[styles.subtitle, featured && styles.subtitleFeatured]}>{subtitle}</Text>}
        {features.length > 0 && (
          <View style={styles.features}>
            {features.map((feature) => (
              <View key={feature} style={styles.featureRow}>
                <Text style={[styles.featureIcon, featured && styles.featureIconFeatured]}>✓</Text>
                <Text style={[styles.featureText, featured && styles.featureTextFeatured]}>{feature}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      <View
        style={[
          styles.radio,
          featured && styles.radioFeatured,
          selected && styles.radioSelected,
          selected && featured && styles.radioSelectedFeatured,
        ]}
      >
        {selected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.78)',
    borderRadius: 18,
    marginBottom: 14,
    minHeight: 152,
    borderWidth: 2,
    borderColor: '#E6DACA',
    cursor: 'pointer',
  },
  featured: {
    backgroundColor: '#2D3436',
    borderColor: '#2D3436',
  },
  selected: {
    borderColor: '#C8843B',
    backgroundColor: '#FFF7ED',
    shadowColor: '#C8843B',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 4,
  },
  selectedFeatured: {
    borderColor: '#F6C98A',
    backgroundColor: '#2D3436',
    shadowColor: '#2D3436',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3436',
  },
  titleFeatured: {
    color: '#FFFFFF',
  },
  badge: {
    backgroundColor: '#00B894',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  price: {
    fontSize: 17,
    color: '#4E4A45',
    fontWeight: '600',
  },
  priceFeatured: {
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 10,
    lineHeight: 20,
  },
  subtitleFeatured: {
    color: '#DCE3E4',
  },
  features: {
    marginTop: 14,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  featureIcon: {
    width: 18,
    fontSize: 14,
    fontWeight: '700',
    color: '#C8843B',
    lineHeight: 20,
  },
  featureIconFeatured: {
    color: '#F6C98A',
  },
  featureText: {
    flex: 1,
    fontSize: 13,
    color: '#6C757D',
    lineHeight: 20,
  },
  featureTextFeatured: {
    color: '#DCE3E4',
  },
  radio: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#D8C4A6',
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  radioFeatured: {
    borderColor: '#D8BE93',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  radioSelected: {
    borderColor: '#C8843B',
    backgroundColor: '#FFF1DB',
  },
  radioSelectedFeatured: {
    borderColor: '#F6C98A',
    backgroundColor: 'rgba(246,201,138,0.18)',
  },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#C8843B',
  },
});
