# Universal CRM Dashboard

A responsive CRM dashboard UI built with Next.js and Tailwind CSS — manage customers, leads, employees, tasks, and meetings from one interface.

## Tech Stack

- Next.js 15 (App Router)
- Tailwind CSS
- Lucide React (icons)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Project Structure
```
src/
├── app/
│   ├── login/                 Login page
│   ├── forgot-password/       Forgot password page
│   └── dashboard/             Dashboard + CRM pages (layout, customers, leads)
├── components/                Sidebar, shared UI
├── context/                   Theme (light/dark) provider
└── data/                      Dummy data for UI
```
## Status

UI-only build — no backend yet. Data is mocked in `src/data/dummy.js`.

- [x] Authentication (Login, Forgot Password)
- [x] Dashboard Overview
- [x] Customer List / Profile / Add Customer
- [x] Lead Management / Add Lead
- [ ] Employee List
- [ ] Task Management
- [ ] Meeting Scheduler & Calendar
- [ ] Reports, Notifications, Settings, User Profile

## License

Student project — for learning purposes.
