import { MuiChipsInputChip } from "mui-chips-input";

export type ProductInputs = {
  title: string;
  category: number;
  description?: string;
  tags?: MuiChipsInputChip[];
};
