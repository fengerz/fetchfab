import { MuiChipsInputChip } from "mui-chips-input";

export type ProductInputs = {
  title: string;
  description?: string;
  category: number;
  tags?: MuiChipsInputChip[];
};
