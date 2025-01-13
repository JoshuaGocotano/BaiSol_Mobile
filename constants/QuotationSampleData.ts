// const handleDownloadPdf = async () => {
  //   if (formRef.current) {
  //     // Convert the `View` referenced by `formRef` into a PDF
  //     const pdf = await somePdfLibrary.createPdf(formRef.current);
  //     pdf.saveToFile("Quotation.pdf");
  //   }
  // };

  // code to call this sample data
// import { mockProjects, mockAvailableClients } from "./MockData";

// export const getAllClientsProjects = () => mockProjects;

// export const getAllAvailableClients = () => mockAvailableClients;


// Mock data for projects
export const Projects = [
    {
      projId: "1d3f5a1c-8a9b-4c3b-93c9-d715849f1b3e",
      projName: "Solar Panel Installation",
      projDescript: "Installing solar panels for residential use.",
      status: "OnGoing",
      updatedAt: "2025-01-01T10:00:00Z",
      createdAt: "2024-12-01T10:00:00Z",
      clientId: "abcd1234-5678-90ef-ghij-klmnopqrstuv",
      clientName: "John Doe",
      clientAddress: "123 Solar Street, Sunshine City",
    },
    {
      projId: "2a4d6b2f-7c8d-5e2a-94d9-e82694a37c4b",
      projName: "Solar Maintenance",
      projDescript: "Maintenance of existing solar installations.",
      status: "Completed",
      updatedAt: "2025-01-10T14:00:00Z",
      createdAt: "2024-11-15T10:00:00Z",
      clientId: "zxyw9876-5432-10vu-tsrq-ponmlkjihgf",
      clientName: "Jane Smith",
      clientAddress: "456 Energy Lane, Renewable City",
    },
  ];
  
  // Mock data for available clients
  export const AvailableClients = [
    {
      clientId: "abcd1234-5678-90ef-ghij-klmnopqrstuv",
      clientEmail: "johndoe@example.com",
    },
    {
      clientId: "zxyw9876-5432-10vu-tsrq-ponmlkjihgf",
      clientEmail: "janesmith@example.com",
    },
  ];
  
  // Mock data for client project info
  export const ClientProjectInfo = {
    projId: "1d3f5a1c-8a9b-4c3b-93c9-d715849f1b3e",
    projName: "Solar Panel Installation",
    projDescript: "Installing solar panels for residential use.",
    discount: 10,
    vatRate: 12,
    clientId: "abcd1234-5678-90ef-ghij-klmnopqrstuv",
    clientFName: "John",
    clientLName: "Doe",
    clientContactNum: "1234567890",
    clientAddress: "123 Solar Street, Sunshine City",
    systemType: "Residential",
    kWCapacity: 5,
    sex: "Male",
    isMale: true,
    paymentProgress: 50,
    projectProgress: 75,
    status: "OnGoing",
    installers: [
      { name: "Alice Installer", position: "Lead Technician" },
      { name: "Bob Helper", position: "Assistant" },
    ],
    facilitatorName: "Michael Coordinator",
    facilitatorEmail: "michael.coordinator@example.com",
    projectStarted: "2024-12-01T10:00:00Z",
    projectEnded: null,
    totalDays: null,
  };
  
  // Mock data for project supplies
  export const ProjectSupplies = [
    {
      description: "Solar Panel 400W",
      lineTotal: "5000",
    },
    {
      description: "Inverter 5kW",
      lineTotal: "2000",
    },
  ];
  
  // Mock data for project expenses
  export const ProjectExpense = {
    quoteId: "expense12345",
    subTotal: "7000",
    discount: "700",
    discountRate: "10",
    subTotalAfterDiscount: "6300",
    vat: "756",
    vatRate: "12",
    total: "7056",
    estimationDate: 30,
    totalMaterialCost: { description: "Total Material Cost", lineTotal: "5000" },
    totalLaborCost: { description: "Total Labor and Installation Cost", lineTotal: "2000" },
  };
  
  // Mock data for project info
  export const ProjectInfo = {
    customerId: "abcd1234-5678-90ef-ghij-klmnopqrstuv",
    customerName: "Angelie Gecole",
    customerEmail: "angeleajeasgecole@gmail.com",
    customerAddress: "456 Elm St., Riverside",
    projectId: "1d3f5a1c-8a9b-4c3b-93c9-d715849f1b3e",
    projectDescription: "Installation of a 5kW solar power system.",
    projectDateCreation: "2024-12-01T10:00:00Z",
    projectDateValidity: "2025-12-01T10:00:00Z",
  };
  
