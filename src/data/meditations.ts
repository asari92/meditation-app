export interface Meditation {
  id: string;
  title: string;
  duration: string;
  locked: boolean;
}

export const meditations: Meditation[] = [
  {
    id: '1',
    title: 'Morning Clarity',
    duration: '5 min',
    locked: false,
  },
  {
    id: '2',
    title: 'Deep Relaxation',
    duration: '10 min',
    locked: false,
  },
  {
    id: '3',
    title: 'Breath Awareness',
    duration: '8 min',
    locked: false,
  },
  {
    id: '4',
    title: 'Sleep Meditation',
    duration: '20 min',
    locked: true,
  },
  {
    id: '5',
    title: 'Stress Relief',
    duration: '15 min',
    locked: true,
  },
  {
    id: '6',
    title: 'Advanced Focus',
    duration: '25 min',
    locked: true,
  },
];
