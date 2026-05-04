export interface ServiceCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  route: string;
  requiresAuth?: boolean;
}