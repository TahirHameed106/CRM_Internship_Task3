// src/data/dummy.js
export const customers = [
  { id: 1, name: 'Ayesha Khan', company: 'Nexora Pvt Ltd', email: 'ayesha@nexora.com', phone: '+92 300 1234567', status: 'Active', value: '$12,400', joined: 'Jan 12, 2026', avatar: 'AK' },
  { id: 2, name: 'Bilal Ahmed', company: 'Skyline Traders', email: 'bilal@skyline.com', phone: '+92 301 2233445', status: 'Active', value: '$8,900', joined: 'Feb 03, 2026', avatar: 'BA' },
  { id: 3, name: 'Sara Malik', company: 'Vertex Solutions', email: 'sara@vertex.com', phone: '+92 302 9988776', status: 'Inactive', value: '$3,200', joined: 'Nov 28, 2025', avatar: 'SM' },
  { id: 4, name: 'Usman Tariq', company: 'BrightWorks', email: 'usman@brightworks.com', phone: '+92 333 4455667', status: 'Active', value: '$21,000', joined: 'Mar 17, 2026', avatar: 'UT' },
  { id: 5, name: 'Hina Raza', company: 'Crestline Co.', email: 'hina@crestline.com', phone: '+92 345 1122334', status: 'Pending', value: '$5,600', joined: 'Apr 02, 2026', avatar: 'HR' },
  { id: 6, name: 'Omar Farooq', company: 'PulseTech', email: 'omar@pulsetech.com', phone: '+92 312 6677889', status: 'Active', value: '$15,750', joined: 'May 09, 2026', avatar: 'OF' },
  { id: 7, name: 'Mehwish Iqbal', company: 'Northbridge Inc.', email: 'mehwish@northbridge.com', phone: '+92 321 5566778', status: 'Inactive', value: '$2,100', joined: 'Jun 14, 2026', avatar: 'MI' },
  { id: 8, name: 'Hamza Sheikh', company: 'Orbit Labs', email: 'hamza@orbitlabs.com', phone: '+92 334 8899001', status: 'Active', value: '$18,300', joined: 'Jun 20, 2026', avatar: 'HS' },
];

export const leads = [
  { id: 1, name: 'Faisal Rauf', company: 'GreenField Agro', source: 'Website', stage: 'New', value: '$6,000', owner: 'John Doe', avatar: 'FR' },
  { id: 2, name: 'Zainab Noor', company: 'Crest Digital', source: 'Referral', stage: 'Contacted', value: '$9,500', owner: 'John Doe', avatar: 'ZN' },
  { id: 3, name: 'Adeel Akhtar', company: 'Maple Systems', source: 'Cold Call', stage: 'Qualified', value: '$14,200', owner: 'Sana Tariq', avatar: 'AA' },
  { id: 4, name: 'Komal Yousaf', company: 'BluePeak', source: 'Website', stage: 'New', value: '$4,800', owner: 'Sana Tariq', avatar: 'KY' },
  { id: 5, name: 'Tariq Mehmood', company: 'Falcon Retail', source: 'Event', stage: 'Negotiation', value: '$22,000', owner: 'John Doe', avatar: 'TM' },
  { id: 6, name: 'Nida Hassan', company: 'Wavefront', source: 'Referral', stage: 'Lost', value: '$3,000', owner: 'Sana Tariq', avatar: 'NH' },
  { id: 7, name: 'Imran Latif', company: 'Solstice Co.', source: 'Website', stage: 'Contacted', value: '$11,400', owner: 'John Doe', avatar: 'IL' },
];

export const employees = [
  { id: 1, name: 'John Doe', role: 'Sales Manager', dept: 'Sales', email: 'john@crm.com', phone: '+92 300 0000001', status: 'Active', avatar: 'JD', tasks: 5, joined: 'Jan 2024' },
  { id: 2, name: 'Sana Tariq', role: 'Account Executive', dept: 'Sales', email: 'sana@crm.com', phone: '+92 300 0000002', status: 'Active', avatar: 'ST', tasks: 8, joined: 'Mar 2024' },
  { id: 3, name: 'Ali Raza', role: 'UI/UX Designer', dept: 'Design', email: 'ali@crm.com', phone: '+92 300 0000003', status: 'On Leave', avatar: 'AR', tasks: 2, joined: 'Jun 2023' },
  { id: 4, name: 'Maria Khan', role: 'Backend Developer', dept: 'Engineering', email: 'maria@crm.com', phone: '+92 300 0000004', status: 'Active', avatar: 'MK', tasks: 11, joined: 'Sep 2023' },
  { id: 5, name: 'Zaid Hussain', role: 'Marketing Lead', dept: 'Marketing', email: 'zaid@crm.com', phone: '+92 300 0000005', status: 'Active', avatar: 'ZH', tasks: 6, joined: 'Nov 2023' },
  { id: 6, name: 'Rabia Noor', role: 'Support Specialist', dept: 'Support', email: 'rabia@crm.com', phone: '+92 300 0000006', status: 'Inactive', avatar: 'RN', tasks: 0, joined: 'Feb 2024' },
];

export const tasks = [
  { id: 1, title: 'Send proposal to Nexora Pvt Ltd', assignee: 'John Doe', priority: 'High', status: 'In Progress', due: 'Jul 2, 2026' },
  { id: 2, title: 'Follow up with GreenField Agro lead', assignee: 'Sana Tariq', priority: 'Medium', status: 'Todo', due: 'Jul 3, 2026' },
  { id: 3, title: 'Update customer contract — BrightWorks', assignee: 'John Doe', priority: 'High', status: 'Todo', due: 'Jul 4, 2026' },
  { id: 4, title: 'Prepare Q2 sales report', assignee: 'Zaid Hussain', priority: 'Low', status: 'Done', due: 'Jun 30, 2026' },
  { id: 5, title: 'Onboarding call with Orbit Labs', assignee: 'Sana Tariq', priority: 'Medium', status: 'Done', due: 'Jun 28, 2026' },
  { id: 6, title: 'Fix CRM login redirect bug', assignee: 'Maria Khan', priority: 'High', status: 'In Progress', due: 'Jul 2, 2026' },
  { id: 7, title: 'Design email campaign banner', assignee: 'Ali Raza', priority: 'Low', status: 'Todo', due: 'Jul 7, 2026' },
];

export const meetings = [
  { id: 1, title: 'Product Demo — Nexora', date: 'Jul 1, 2026', time: '10:00 AM', with: 'Ayesha Khan', type: 'Demo', status: 'Upcoming' },
  { id: 2, title: 'Contract Review', date: 'Jul 1, 2026', time: '1:30 PM', with: 'Usman Tariq', type: 'Internal', status: 'Upcoming' },
  { id: 3, title: 'Onboarding Call', date: 'Jul 2, 2026', time: '4:00 PM', with: 'Omar Farooq', type: 'Onboarding', status: 'Upcoming' },
  { id: 4, title: 'Q2 Sales Review', date: 'Jun 30, 2026', time: '11:00 AM', with: 'Sales Team', type: 'Internal', status: 'Completed' },
  { id: 5, title: 'Lead Qualification Call', date: 'Jun 29, 2026', time: '3:00 PM', with: 'Faisal Rauf', type: 'Demo', status: 'Completed' },
  { id: 6, title: 'Strategy Planning', date: 'Jul 5, 2026', time: '9:00 AM', with: 'Management', type: 'Internal', status: 'Upcoming' },
];

export const statusColor = {
  Active: 'bg-emerald-100 text-emerald-700',
  Inactive: 'bg-gray-200 text-gray-600',
  Pending: 'bg-amber-100 text-amber-700',
};

export const stageColor = {
  New: 'bg-blue-100 text-blue-700',
  Contacted: 'bg-amber-100 text-amber-700',
  Qualified: 'bg-violet-100 text-violet-700',
  Negotiation: 'bg-orange-100 text-orange-700',
  Lost: 'bg-red-100 text-red-600',
};

export const salesChart = [
  { month: 'Jan', value: 32 }, { month: 'Feb', value: 45 }, { month: 'Mar', value: 38 },
  { month: 'Apr', value: 52 }, { month: 'May', value: 61 }, { month: 'Jun', value: 75 },
];

export const todaysMeetings = [
  { id: 1, title: 'Product Demo — Nexora Pvt Ltd', time: '10:00 AM', with: 'Ayesha Khan' },
  { id: 2, title: 'Contract Review', time: '1:30 PM', with: 'Usman Tariq' },
  { id: 3, title: 'Onboarding Call', time: '4:00 PM', with: 'Omar Farooq' },
];

export const dashboardActivity = [
  { text: 'New lead added: Faisal Rauf (GreenField Agro)', time: '12 min ago' },
  { text: 'Deal closed with BrightWorks worth $21,000', time: '1 hour ago' },
  { text: 'Task "Send proposal" marked complete', time: '3 hours ago' },
  { text: 'Meeting scheduled with Crestline Co.', time: 'Yesterday' },
  { text: 'New customer onboarded: Hamza Sheikh', time: 'Yesterday' },
];