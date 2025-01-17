export interface GraphStore {
  nodes: GraphNode[];
}

export interface GraphNode {
  id: string;
  name: string;
  slider: GraphSlider | null;
  connection: string;
}

export interface GraphSlider {
  min: number;
  max: number;
  step: number;
  fixed: number;
  value: number;
}
export interface PaletteStore {
  isVisible: boolean;
  textInput: string;
  selectedCategoryIndex: number;
  selectedItemIndex: number;
  categories: PaletteCategory[];
  results: PaletteCategory[];
  src: "";
}

export type PaletteItem = {
  title: string;
};

export type PaletteCategory = {
  title: string;
  items: PaletteItem[];
};
