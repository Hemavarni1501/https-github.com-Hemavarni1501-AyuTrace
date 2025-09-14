import React from 'react';
import type { TraceabilityData, TimelineEvent as TimelineEventType } from '../types';
import { TimelineEventType as EventTypeEnum } from '../types';
import { LeafIcon, BeakerIcon, FactoryIcon, BoxIcon, TruckIcon, MapPinIcon, CheckCircleIcon, DocumentTextIcon, CalendarIcon, ScaleIcon } from './IconComponents';
import ProductDetails from './ProductDetails';
import MapPlaceholder from './MapPlaceholder';

const eventIcons: Record<EventTypeEnum, React.ReactNode> = {
  [EventTypeEnum.COLLECTION]: <LeafIcon className="w-6 h-6 text-white" />,
  [EventTypeEnum.PROCESSING]: <FactoryIcon className="w-6 h-6 text-white" />,
  [EventTypeEnum.QUALITY_TEST]: <BeakerIcon className="w-6 h-6 text-white" />,
  [EventTypeEnum.TRANSIT]: <TruckIcon className="w-6 h-6 text-white" />,
  [EventTypeEnum.PACKAGING]: <BoxIcon className="w-6 h-6 text-white" />,
};

const eventColors: Record<EventTypeEnum, string> = {
  [EventTypeEnum.COLLECTION]: 'bg-green-500',
  [EventTypeEnum.PROCESSING]: 'bg-blue-500',
  [EventTypeEnum.QUALITY_TEST]: 'bg-purple-500',
  [EventTypeEnum.TRANSIT]: 'bg-yellow-600',
  [EventTypeEnum.PACKAGING]: 'bg-brand-brown',
};

const TimelineEvent: React.FC<{ event: TimelineEventType; isLast: boolean }> = ({ event, isLast }) => {
  const icon = eventIcons[event.type];
  const color = eventColors[event.type];

  return (
    <div className="flex items-start">
      <div className="flex flex-col items-center mr-6">
        <div className={`flex items-center justify-center w-12 h-12 rounded-full z-10 ${color}`}>
          {icon}
        </div>
        {!isLast && <div className="w-0.5 h-full bg-gray-300 mt-2"></div>}
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 flex-1 -mt-2 border border-gray-200">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{event.type.replace('_', ' ')}</p>
                <h3 className="text-xl font-bold font-serif text-brand-green mt-1">{event.title}</h3>
            </div>
            <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon className="w-4 h-4 mr-2" />
                <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
        </div>
        
        <div className="mt-4 border-t pt-4 text-gray-700 space-y-3">
             <p><strong>Operator:</strong> {event.operator}</p>
             {event.type === EventTypeEnum.COLLECTION && (
                 <>
                    <div className="flex items-center"><MapPinIcon className="w-5 h-5 mr-2 text-brand-green" /><span><strong>Location:</strong> {event.location.name}</span></div>
                    <div className="flex items-center"><ScaleIcon className="w-5 h-5 mr-2 text-brand-green" /><span><strong>Quantity:</strong> {event.quantityKg} kg</span></div>
                    <p><strong>Harvest Method:</strong> {event.harvestMethod}</p>
                 </>
             )}
            {event.type === EventTypeEnum.PROCESSING && (
                <p><strong>Process Details:</strong> {event.process}</p>
            )}
             {event.type === EventTypeEnum.QUALITY_TEST && (
                 <>
                    <p><strong>Test:</strong> {event.testName}</p>
                    <div className="flex items-center font-semibold">
                        <strong>Result:</strong> 
                        <span className={`ml-2 flex items-center px-3 py-1 rounded-full text-sm ${event.result === 'Pass' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                           <CheckCircleIcon className="w-4 h-4 mr-1"/> {event.result}
                        </span>
                    </div>
                    {event.reportUrl && <a href={event.reportUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-brand-green hover:underline"><DocumentTextIcon className="w-5 h-5 mr-1" /> View Report</a>}
                 </>
             )}
             {event.type === EventTypeEnum.TRANSIT && (
                 <>
                    <p><strong>From:</strong> {event.from}</p>
                    <p><strong>To:</strong> {event.to}</p>
                    <p><strong>Carrier:</strong> {event.carrier}</p>
                 </>
             )}
             {event.type === EventTypeEnum.PACKAGING && (
                <p><strong>Packaging Location:</strong> {event.location}</p>
             )}
             {event.notes && <p className="text-sm italic text-gray-600 bg-gray-50 p-3 rounded-md border-l-4 border-brand-light-green">"{event.notes}"</p>}
        </div>
      </div>
    </div>
  );
};


const TraceabilityTimeline: React.FC<{ data: TraceabilityData }> = ({ data }) => {
    const collectionEvent = data.timeline.find(e => e.type === EventTypeEnum.COLLECTION);

    return (
        <div className="mt-12">
            <ProductDetails product={data.product} />

            {collectionEvent && collectionEvent.type === EventTypeEnum.COLLECTION && (
                 <MapPlaceholder location={collectionEvent.location} />
            )}

            <div className="mt-12">
                 <h2 className="text-2xl font-serif text-brand-green mb-8 text-center">Journey of Authenticity</h2>
                <div className="space-y-12">
                    {data.timeline.map((event, index) => (
                        <TimelineEvent key={event.id} event={event} isLast={index === data.timeline.length - 1} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TraceabilityTimeline;
