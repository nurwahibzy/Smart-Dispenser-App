export interface HelpdeskPayload {
  name: string;
  title: string;
  contact: string;
  description: string;
  category: 'bug' | 'feedback' | 'other';
}

export interface HelpdeskTicket extends HelpdeskPayload {
  id: string;
  status: 'pending' | 'in_progress' | 'resolved';
  createdAt: string | Date; 
}

// export interface  HelpdeskResponse {
//   success: boolean;
//   message: string;
//   data?: HelpdeskTicket;
//   ticketId?: string; // ID tiket yang baru dibuat, jika ada
// }