import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventLocation } from "@/app/types";

interface Props {
  locations: EventLocation[];
  selectedLocation: string;
  setSelectedLocation: Dispatch<SetStateAction<string>>;
}

export function Filtering({
  locations,
  selectedLocation,
  setSelectedLocation,
}: Props) {
  return (
    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
      <SelectTrigger className="w-auto" data-testid="location-filter">
        <SelectValue placeholder="Filter by location" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All locations</SelectItem>
        {locations.map((location: EventLocation) => (
          <SelectItem
            key={`location_filter_${location.id}`}
            value={`${location.id}`}
          >
            {location.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
