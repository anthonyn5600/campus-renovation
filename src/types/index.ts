export interface Building {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: "academic" | "parking" | "athletics" | "housing" | "services" | "dining" | "facilities";
  aliases: string[];
}

export interface CampusEvent {
  title: string;
  location: string;
  datetime: string;
  endDatetime: string;
  dateFormatted: string;
  description: string;
  permalink: string;
  category: string;
}

export interface Restaurant {
  name: string;
  address: string;
  phone: string;
  category: string;
  lat?: number;
  lng?: number;
}

export interface Department {
  name: string;
  phone: string;
  email: string;
  room: string;
  college: string;
}
