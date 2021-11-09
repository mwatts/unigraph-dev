import { registerDynamicViews } from "unigraph-dev-common/lib/api/unigraph-react";
import { TimeFrame, CalendarEvent } from "./Calendar";

export const init = () => {
    registerDynamicViews({"$/schema/calendar_event": CalendarEvent as any});
    registerDynamicViews({"$/schema/time_frame": TimeFrame as any});
}