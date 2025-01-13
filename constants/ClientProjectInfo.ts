export interface IClientProjectInfo {
  projId: string;
  projName: string;
  projDescript: string;
  discount: number;
  vatRate: number;
  clientId: string;
  clientFName: string;
  clientLName: string;
  clientContactNum: string;
  clientAddress: string;
  systemType: string;
  kWCapacity: number;
  sex: string;
  isMale: boolean;
  paymentProgress: number;
  projectProgress: number;
  status: string;
  installers: { name: string; position: string }[];
  facilitatorName: string;
  facilitatorEmail: string;
  projectStarted: string;
  projectEnded?: string;
  totalDays?: number;
}

export const clientProjectInfoSample: IClientProjectInfo[] = [
  {
    projId: "P001",
    projName: "Solar Installation Project",
    projDescript: "Installation of a 5kW solar power system.",
    discount: 10,
    vatRate: 12,
    clientId: "2",
    clientFName: "Angelie",
    clientLName: "Gecole",
    clientContactNum: "123-456-7890",
    clientAddress: "456 Elm St, Riverside",
    systemType: "Solar PV",
    kWCapacity: 5,
    sex: "Male",
    isMale: true,
    paymentProgress: 90,
    projectProgress: 60,
    status: "OnGoing",
    installers: [
      { name: "Alice Smith", position: "Technician" },
      { name: "Bob Johnson", position: "Engineer" }
    ],
    facilitatorName: "Joshua Gocotano",
    facilitatorEmail: "gocotano.joshua02@gmail.com",
    projectStarted: "2024-09-01",
    projectEnded: "2025-01-15",
    totalDays: 45,
  },
];

export interface User {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  role: "Facilitator" | "Customer";
  address: string;
  email: string;
  status: "Active" | "On-Work" | "Suspended";
}

export const users: User[] = [
  {
    id: "1",
    name: "Joshua Gocotano",
    age: 23,
    gender: "Male",
    role: "Facilitator",
    address: "123 Main St, Springfield",
    email: "markvalintin9@gmail.com",
    status: "On-Work",
  },
  {
    id: "2",
    name: "Angelie Gecole",
    age: 22,
    gender: "Female",
    role: "Customer",
    address: "456 Elm St, Riverside",
    email: "angeleajeasgecole@gmail.com",
    status: "Active",
  },
  {
    id: "3",
    name: "Michael Brown",
    age: 35,
    gender: "Male",
    role: "Facilitator",
    address: "789 Oak Ave, Greenville",
    email: "michaelbrown@example.com",
    status: "Active",
  },
  {
    id: "4",
    name: "Emily Johnson",
    age: 24,
    gender: "Female",
    role: "Customer",
    address: "321 Maple St, Hilltown",
    email: "emilyjohnson@example.com",
    status: "Active",
  },
  {
    id: "5",
    name: "Sarah Williams",
    age: 29,
    gender: "Female",
    role: "Customer",
    address: "654 Pine Dr, Lakeview",
    email: "sarahwilliams@example.com",
    status: "Active",
  },
  {
    id: "6",
    name: "Roboam Dosdos",
    age: 23,
    gender: "Male",
    role: "Customer",
    address: "V. Rama, Cebu City",
    email: "dosdos@gmail.com",
    status: "Active",
  },
];

export const getProjectsByUserId = (id: string): IClientProjectInfo[] => {
  return clientProjectInfoSample.filter(
    (project) => project.clientId === id
  );
};


