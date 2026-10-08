// ===== SESSION 8: a NEW file =========================================
// Written by shadcn init. cn() merges class strings safely.
//
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
