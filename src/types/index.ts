export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type PrintLocation = 'pecho' | 'espalda';

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  isDark: boolean;
  borderClass?: string;
}

export interface PrintDesign {
  type: 'typography' | 'illustration' | 'mixed' | 'emblem' | 'custom-image';
  primaryText?: string;
  secondaryText?: string;
  biblicalQuote?: string;
  accentColor?: string;
  iconType?: string;
  layoutStyle?: 'center-chest' | 'pocket-minimal' | 'vintage-badge' | 'bold-stacked';
}

export interface ProductModel {
  id: number;
  code?: string;
  title: string;
  subtitle: string;
  verse: string;
  description: string;
  category: string;
  price: number;
  colors: ProductColor[];
  sizes?: Size[];
  tags: string[];
  printDesign: PrintDesign;
  customImage?: string; // Base64 data URL for uploaded PNG prints
  defaultPrintLocation?: PrintLocation;
}

export interface OrderState {
  model: ProductModel;
  selectedColor: ProductColor;
  selectedSize: Size;
  quantity: number;
  printLocation: PrintLocation;
}

