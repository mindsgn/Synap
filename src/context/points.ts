import { create } from 'zustand';

type Points = {
    points: number;
    totalPoints: number,
    setPoints: (point: number) => void;
    setTotalPoints: (point: number) => void;
}

export const usePoints = create<Points>((set, get) => ({
  points: 0,
  totalPoints: 0,
  setPoints: (point: number) => {
    const oldPoints = get().points
    set({ points: oldPoints + point });
  },
  setTotalPoints: (totalPoints: number) => {
    set({ totalPoints });
  }
}))