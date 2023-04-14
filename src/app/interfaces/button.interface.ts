
export type Colors =
  | 'Sky'
  | 'Yellow'
  | 'Green'
  | 'Red'
  | 'Violet'
  | 'Gray'
  | 'primary'
  | 'ligth'


export type Padding = 'py-1' | 'py-2' | 'py-3' | 'py-4';

export const BG_COLORS: Record<Colors, Record<string, boolean>> = {
  Sky: { 'bg-sky-500': true },
  Yellow: { 'bg-yellow-500': true },
  Green: { 'bg-green-500': true },
  Red: { 'bg-red-500': true },
  Violet: { 'bg-violet-500': true },
  Gray: { 'bg-gray-500': true },
  primary: { 'bg-primary-500': true },
  ligth: { 'bg-gray-100': true },
};

export const NAV_COLORS: Record<Colors, Record<string, boolean>> = {
  Sky: { 'bg-sky-600': true },
  Yellow: { 'bg-yellow-600': true },
  Green: { 'bg-green-600': true },
  Red: { 'bg-red-600': true },
  Violet: { 'bg-violet-600': true },
  Gray: { 'bg-gray-600': true },
  primary: { 'bg-primary-600': true },
  ligth: { 'bg-gray-600': true },
};
