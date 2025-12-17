import { toLocalISODate } from "@/utils/analytics";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Property, PropertyView } from "./property";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const MONTH = 30 * 24 * 60 * 60 * 1000
export const DAY = 24 * 60 * 60 * 1000;
export type AnalyticalPeriod = "week" | "month" | "year"

export interface GraphEntry {
  label: string;
  start_date: Date,
  end_date: Date,
  value?: number,
}

export interface Graph {
  current: GraphEntry[],
  previous: GraphEntry[],

}
export const initEmptyGraph = (start_date: Date, end_date: Date, period: AnalyticalPeriod): Graph => {
  let graph: Graph = {
    current: [],
    previous: []
  };

  let split_perdiod = DAY;
  if (period == "month")
    split_perdiod = 7 * DAY;
  if (period == "year")
    split_perdiod = MONTH;


  for (let time = end_date.getTime(); time > start_date.getTime(); time -= split_perdiod) {
    graph.current.push({
      start_date: new Date(time),
      end_date: new Date(time - split_perdiod),
      label: toLocalISODate(new Date(time))
    });
  }
  let previous_end_date = start_date;
  let previous_start_date: Date;
  if (period == "month") {
    previous_start_date = new Date(previous_end_date.getTime() - MONTH)
  }
  else if (period == "year") {
    previous_start_date = new Date(previous_end_date.getTime() - 365 * DAY);
  }
  else {
    previous_start_date = new Date(previous_end_date.getTime() - (7 * DAY))
  }


  for (let time = previous_end_date.getTime(); time > previous_start_date.getTime(); time -= split_perdiod) {
    graph.previous.push({
      start_date: new Date(time),
      end_date: new Date(time - split_perdiod),
      label: toLocalISODate(new Date(time))
    });
  }

  return graph
}


export const fillPropertiesIntoGraph = (previousProperties: Property[], properties: Property[], graph: Graph): Graph => {

  
 
  for (let index = 0; index < graph.current.length; index++) {
    const interval_properties = properties.filter((property: Property) => new Date(property.created_at) > graph.current[index].end_date &&
      new Date(property.created_at) < graph.current[index].start_date)
    graph.current[index].value = interval_properties.length;

  }


  for (let index = 0; index < graph.previous.length; index++) {
    const interval_properties = previousProperties.filter((property: Property) => new Date(property.created_at) > graph.previous[index].end_date &&
      new Date(property.created_at) < graph.previous[index].start_date)
    graph.previous[index].value = interval_properties.length;

  }


  return graph;

}

export const fillViewsIntoGraph = (previousViews: PropertyView[], views: PropertyView[], graph: Graph): Graph => {

 

  for (let index = 0; index < graph.current.length; index++) {
    const interval_views = views.filter((view: PropertyView) => view.date >= toLocalISODate(graph.current[index].end_date) &&
      view.date <= toLocalISODate(graph.current[index].start_date))

    let current_views = 0
    interval_views.forEach((view: PropertyView) => current_views += view.count);
    graph.current[index].value = current_views
  }

  for (let index = 0; index < graph.previous.length; index++) {
    const interval_views = previousViews.filter((view: PropertyView) => view.date >= toLocalISODate(graph.previous[index].end_date) &&
      view.date  <=  toLocalISODate(graph.previous[index].start_date))
    let current_views = 0
    interval_views.forEach((view: PropertyView) => current_views += view.count);
    graph.previous[index].value = current_views
  }

  return graph;
}


export const graphEntiresToChartData = (graphEntries: GraphEntry[], previousEntries: GraphEntry[]) => {
  const chartData: any[] = [];

  if (graphEntries.length != previousEntries.length)
    return [];

  for (let index = 0; index < graphEntries.length; index++) {
    chartData.splice(0, 0, {
      month: graphEntries[index].label,
      current: graphEntries[index].value,
      previous: previousEntries[index].value
    })
  }


  return chartData;
}