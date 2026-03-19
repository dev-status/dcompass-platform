export type Ticket = {
  id: string;
  label: string;
  qrValue: string;
  accessLabel: string;
  owner: string;
};

export type TicketBundle = {
  orderId: string;
  event: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  image: string;
  status: string;
  ticketType: string;
  holder: string;
  purchaseSummary: string;
  accessCode: string;
  tickets: Ticket[];
};

const ticketBundleTemplate: TicketBundle = {
  orderId: "DCP-2048",
  event: "Noches en Supra Roma",
  category: "DJ Set · Roma Norte",
  date: "Viernes 22 de marzo",
  time: "10:00 PM",
  venue: "Supra Roma · CDMX",
  image: "/hero/hero-v2.png",
  status: "Accesos listos",
  ticketType: "General",
  holder: "Jesús Romero",
  purchaseSummary: "2 boletos en una sola compra",
  accessCode: "DCP-SUPRA-2048",
  tickets: [
    {
      id: "BOL-001",
      label: "Boleto 1 de 2",
      qrValue: "QX-2048-01",
      accessLabel: "Acceso general",
      owner: "Jesús Romero",
    },
    {
      id: "BOL-002",
      label: "Boleto 2 de 2",
      qrValue: "QX-2048-02",
      accessLabel: "Acceso general",
      owner: "Jesús Romero",
    },
  ],
};

export function buildTicketBundle(orderId: string): TicketBundle {
  return {
    ...ticketBundleTemplate,
    orderId,
  };
}
