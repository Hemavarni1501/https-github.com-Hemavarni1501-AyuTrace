
export interface Product {
  batchId: string;
  name: string;
  herb: string;
  imageUrl: string;
  description: string;
  packagedDate: string;
  netWeight: string;
}

export interface GeoLocation {
  lat: number;
  lng: number;
  name: string;
}

export enum TimelineEventType {
    COLLECTION = 'COLLECTION',
    PROCESSING = 'PROCESSING',
    QUALITY_TEST = 'QUALITY_TEST',
    PACKAGING = 'PACKAGING',
    TRANSIT = 'TRANSIT',
}

export interface TimelineEventBase {
  id: string;
  type: TimelineEventType;
  title: string;
  date: string;
  operator: string;
  notes?: string;
}

export interface CollectionEvent extends TimelineEventBase {
  type: TimelineEventType.COLLECTION;
  location: GeoLocation;
  quantityKg: number;
  harvestMethod: string;
}

export interface ProcessingEvent extends TimelineEventBase {
  type: TimelineEventType.PROCESSING;
  process: string;
}

export interface QualityTestEvent extends TimelineEventBase {
  type: TimelineEventType.QUALITY_TEST;
  testName: string;
  result: 'Pass' | 'Fail';
  reportUrl?: string;
}

export interface PackagingEvent extends TimelineEventBase {
  type: TimelineEventType.PACKAGING;
  location: string;
}

export interface TransitEvent extends TimelineEventBase {
    type: TimelineEventType.TRANSIT;
    from: string;
    to: string;
    carrier: string;
}


export type TimelineEvent = CollectionEvent | ProcessingEvent | QualityTestEvent | PackagingEvent | TransitEvent;

export interface TraceabilityData {
  product: Product;
  timeline: TimelineEvent[];
}
