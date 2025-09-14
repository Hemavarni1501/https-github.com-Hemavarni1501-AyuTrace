
import type { TraceabilityData } from '../types';
import { TimelineEventType } from '../types';

const sampleData: TraceabilityData = {
  product: {
    batchId: 'ASHWA-2024-G1-B1',
    name: 'Organic Ashwagandha Root Powder',
    herb: 'Ashwagandha (Withania somnifera)',
    imageUrl: 'https://picsum.photos/seed/ashwagandha/400/400',
    description: 'Sustainably harvested from the fertile plains of Madhya Pradesh, this adaptogenic herb is known for its ability to reduce stress and promote overall well-being.',
    packagedDate: '2024-07-20',
    netWeight: '250g',
  },
  timeline: [
    {
      id: 'evt-1',
      type: TimelineEventType.COLLECTION,
      title: 'Wild Herb Collection',
      date: '2024-06-15T09:30:00Z',
      operator: 'Neemuch Farmers Cooperative',
      location: {
        lat: 24.4701,
        lng: 74.8691,
        name: 'Neemuch, Madhya Pradesh, India'
      },
      quantityKg: 520,
      harvestMethod: 'Sustainable Wildcrafting (roots only)',
      notes: 'Harvested post-monsoon season to ensure peak alkaloid content. GPS coordinates logged via mobile app.'
    },
    {
      id: 'evt-2',
      type: TimelineEventType.QUALITY_TEST,
      title: 'Initial Quality Assessment',
      date: '2024-06-16T14:00:00Z',
      operator: 'Co-op Quality Checkpoint',
      testName: 'Moisture Content & Foreign Matter',
      result: 'Pass',
      notes: 'Moisture content at 8.2% (below 10% threshold). Less than 0.5% foreign matter.'
    },
    {
      id: 'evt-3',
      type: TimelineEventType.TRANSIT,
      title: 'Transit to Processing Unit',
      date: '2024-06-17T11:00:00Z',
      operator: 'GreenLeaf Logistics',
      from: 'Neemuch Cooperative Warehouse',
      to: 'Jaipur Processing Facility',
      carrier: 'Climate-Controlled Truck GL-TR-118'
    },
    {
      id: 'evt-4',
      type: TimelineEventType.PROCESSING,
      title: 'Root Processing',
      date: '2024-06-18T10:00:00Z',
      operator: 'AyurVeda Processors Inc.',
      process: 'Roots were triple-washed, sun-dried, and then pulverized using a cryogenic grinder to preserve nutrients.',
      notes: 'Processing area sanitized before batch run. Batch processed in isolation.'
    },
    {
        id: 'evt-5',
        type: TimelineEventType.QUALITY_TEST,
        title: 'Third-Party Lab Analysis',
        date: '2024-06-25T16:00:00Z',
        operator: 'PhytoChem Laboratories, Pune',
        testName: 'DNA Barcoding & Heavy Metal Screen',
        result: 'Pass',
        reportUrl: '#',
        notes: 'DNA confirmed as 100% Withania somnifera. Heavy metals (Pb, As, Hg) well below FSSAI permissible limits.'
    },
    {
      id: 'evt-6',
      type: TimelineEventType.PACKAGING,
      title: 'Final Product Packaging',
      date: '2024-07-20T13:45:00Z',
      operator: 'AyurVeda Processors Inc.',
      location: 'Jaipur Processing Facility',
      notes: 'Packaged in triple-layered, light-resistant pouches. A unique, tamper-proof QR code was generated and affixed to each unit.'
    }
  ],
};

// FIX: Sort timeline after declaration to allow for correct contextual typing of the array literal.
// This resolves the TypeScript error related to the discriminated union.
sampleData.timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort descending for timeline view


export const getTraceabilityData = (batchId: string): Promise<TraceabilityData> => {
  return new Promise((resolve, reject) => {
    if (batchId.toUpperCase() === 'ASHWA-2024-G1-B1') {
      resolve(JSON.parse(JSON.stringify(sampleData))); // Deep copy to prevent mutation
    } else {
      reject(new Error('Batch ID not found on the blockchain. Please check the ID and try again.'));
    }
  });
};
