import { ImageSourcePropType } from 'react-native';

export interface Meditation {
  id: string;
  title: string;
  duration: string;
  locked: boolean;
  imageSource: ImageSourcePropType;
}

export const meditations: Meditation[] = [
  {
    id: '1',
    title: 'Morning Clarity',
    duration: '5 min',
    locked: false,
    imageSource: require('../../assets/meditations/morning-clarity.png'),
  },
  {
    id: '2',
    title: 'Deep Relaxation',
    duration: '10 min',
    locked: false,
    imageSource: require('../../assets/meditations/deep-relaxation.png'),
  },
  {
    id: '3',
    title: 'Breath Awareness',
    duration: '8 min',
    locked: false,
    imageSource: require('../../assets/meditations/breath-awareness.png'),
  },
  {
    id: '4',
    title: 'Sleep Meditation',
    duration: '20 min',
    locked: true,
    imageSource: require('../../assets/meditations/sleep-meditation.png'),
  },
  {
    id: '5',
    title: 'Stress Relief',
    duration: '15 min',
    locked: true,
    imageSource: require('../../assets/meditations/stress-relief.png'),
  },
  {
    id: '6',
    title: 'Advanced Focus',
    duration: '25 min',
    locked: true,
    imageSource: require('../../assets/meditations/advanced-focus.png'),
  },
];
