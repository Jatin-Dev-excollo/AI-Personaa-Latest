import type { Persona, FilterOption } from "../types";

export const mockPersonas: Persona[] = [
  {
    id: "1",
    name: "Ethan Carter",
    role: "Head of Payment",
    department: "Tech",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    hasStartChat: false,
  },
  {
    id: "2",
    name: "David Lee",
    role: "Product Manager",
    department: "Tech",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    hasStartChat: false,
  },
  {
    id: "3",
    name: "Emily Carter",
    role: "Head of Engineering",
    department: "Tech",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=face",
    hasStartChat: false,
  },
  {
    id: "4",
    name: "Jessica Davis",
    role: "CTO",
    department: "Tech",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    hasStartChat: true,
  },
  {
    id: "5",
    name: "Robert Wilson",
    role: "Finance Manager",
    department: "Tech",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    hasStartChat: false,
  },
  {
    id: "6",
    name: "Savy Chen",
    role: "Head of Retail Operations",
    department: "Sales",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    hasStartChat: false,
  },
  {
    id: "7",
    name: "Devin Jon",
    role: "Head Of Procurement",
    department: "Sales",
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face",
    hasStartChat: false,
  },
  {
    id: "8",
    name: "Michael Brown",
    role: "Product Marketing Manager",
    department: "Marketing",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    hasStartChat: false,
  },
  // Additional personas for pagination
  {
    id: "9",
    name: "Sarah Johnson",
    role: "Marketing Director",
    department: "Marketing",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
    hasStartChat: false,
  },
  {
    id: "10",
    name: "Alex Thompson",
    role: "Senior Developer",
    department: "Tech",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    hasStartChat: true,
  },
  {
    id: "11",
    name: "Lisa Wang",
    role: "Sales Director",
    department: "Sales",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    hasStartChat: false,
  },
  {
    id: "12",
    name: "Mark Rodriguez",
    role: "Content Manager",
    department: "Marketing",
    avatar:
      "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=400&h=400&fit=crop&crop=face",
    hasStartChat: false,
  },
];

export const mockFilters: FilterOption[] = [
  { label: "Tech", value: "Tech", active: true },
  { label: "Marketing", value: "Marketing", active: false },
  { label: "Sales", value: "Sales", active: false },
];
