import { create } from "zustand";
interface EmpenhoTableCollapseContext {
    collapsed : boolean;
    collapse : (coll : boolean) => void;
}
export const useEmpenhoTableCollapseContext = create<EmpenhoTableCollapseContext>((set => ({
    collapsed: false,
    collapse : (coll) => set({collapsed: coll}),
})));