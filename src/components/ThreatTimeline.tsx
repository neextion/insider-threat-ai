
import { THREAT_EVENTS } from '@/lib/data';

export const ThreatTimeline = () => {
  const sortedEvents = [...THREAT_EVENTS].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="relative pl-8">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-secondary"></div>
      {sortedEvents.map((event, index) => (
        <div key={event.id} className="relative mb-8">
          <div className="absolute left-[-1.2rem] top-1.5 h-4 w-4 rounded-full bg-blue-500"></div>
          <p className="text-sm text-gray-400">{new Date(event.timestamp).toLocaleString()}</p>
          <h3 className="font-semibold">{event.type.replace(/_/g, ' ')}</h3>
          <p className="text-sm">{event.description}</p>
        </div>
      ))}
    </div>
  );
};
