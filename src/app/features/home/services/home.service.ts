import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServiceCard } from '../models/service-card.model';
import { PropertyCategory } from '../models/property-category.model';
import { FeaturedProperty } from '../models/featured-property.model';
import { MOCK_SERVICE_CARDS } from '../data/mock-service-cards';
import { MOCK_CATEGORIES } from '../data/mock-categories';
import { MOCK_FEATURED_PROPERTIES } from '../data/mock-featured-properties';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  getServiceCards(): Observable<ServiceCard[]> {
    return of(MOCK_SERVICE_CARDS);
  }

  getCategories(): Observable<PropertyCategory[]> {
    return of(MOCK_CATEGORIES);
  }

  getFeaturedProperties(): Observable<FeaturedProperty[]> {
    return of(MOCK_FEATURED_PROPERTIES);
  }
}