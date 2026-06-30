# Universal CRM Dashboard

A responsive CRM dashboard UI for managing customers, leads, employees, tasks, and meetings — built as a university project to practice a real-world, production-style frontend workflow.

## Overview

This is a UI-only implementation of a universal CRM system. The goal is to demonstrate clean component architecture, responsive design, and a professional business interface — backend integration is planned as a future phase - after completing the internship planning to start the backend journey stay tuned.

## Tech Stack

| Layer       | Technology              |
|-------------|--------------------------|
| Framework   | Next.js 15 (App Router) |
| Styling     | Tailwind CSS             |
| Icons       | Lucide React              |
| Charts      | Custom / Recharts (planned) |
| State       | React Hooks + Context API |
| Deployment  | Vercel                    |

## Features

- Light & dark mode (persisted via Context API + localStorage)
- Fully responsive layout — desktop, tablet, and mobile
- Collapsible sidebar navigation
- Searchable, filterable, paginated data tables
- Form validation on auth and entry forms
- Modular, reusable component structure

## Project Structure 
```
src/
├── app/
│   ├── login/                  Login page
│   ├── forgot-password/        Forgot password page
│   └── dashboard/
│       ├── layout.jsx          Sidebar + top navbar wrapper
│       ├── page.jsx            Dashboard overview (stats, charts, activity)
│       ├── customers/          Customer list, profile, add customer
│       └── leads/               Lead list, add lead
├── components/
│   └── Sidebar.jsx              Main navigation sidebar
├── context/
│   └── ThemeContext.jsx         Light/dark theme provider
└── data/
└── dummy.js                  Mock data for customers, leads, dashboard widgets

```
## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/TahirHameed106/CRM_Internship_Task3.git
cd the crm-dashboard
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages Implemented

| Page | Status |
|------|--------|
| Login | ✅ Done |
| Forgot Password | ✅ Done |
| Dashboard Overview | ✅ Done |
| Customer List | ✅ Done |
| Customer Profile | ✅ Done |
| Add Customer | ✅ Done |
| Lead Management | ✅ Done |
| Add Lead | ✅ Done |
| Employee List | ⏳ Planned |
| Task Management | ⏳ Planned |
| Meeting Scheduler | ⏳ Planned |
| Calendar | ⏳ Planned |
| Reports | ⏳ Planned |
| Notifications | ⏳ Planned |
| Settings | ⏳ Planned |
| User Profile | ⏳ Planned |

## Design System

The UI follows a 60/30/10 color rule for visual consistency learned in the HCI course:

- **60%** — Light backgrounds (white / soft gray)
- **30%** — Deep navy (sidebar, headings, primary text)
- **10%** — Violet accent (buttons, highlights, active states)

Theme tokens are defined centrally in `globals.css` and switch automatically between light and dark mode.

## Roadmap

- [ ] Complete remaining CRM pages (Employees, Tasks, Meetings, Calendar)
- [ ] Add Reports and Settings modules
- [ ] Integrate backend with Supabase (PostgreSQL + Auth)
- [ ] Replace dummy data with live API calls
- [ ] Deploy production version to Vercel

## License

This is a my  project built for learning purposes as part of a  internship task.

## Author

Built by [Tahir Hameed] — [GitHub](https://github.com/TahirHameed106) . [LinkedIn](https://linkedin.com/in/tahir-se)
