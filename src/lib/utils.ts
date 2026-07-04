import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ageFrom(birthDate?: string, now = new Date()): number | null {
  if (!birthDate) return null;
  const dob = new Date(birthDate);
  if (Number.isNaN(dob.getTime())) return null;
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
  return age;
}

export function formatExperienceYear(
  startDate: string,
  endDate?: string,
  isCurrent?: boolean
): string {
  const start = new Date(startDate).getFullYear();
  if (isCurrent) return `${start} →`;
  if (!endDate) return String(start);
  const end = new Date(endDate).getFullYear();
  if (start === end) return String(start);
  return `'${String(start).slice(2)}—'${String(end).slice(2)}`;
}
