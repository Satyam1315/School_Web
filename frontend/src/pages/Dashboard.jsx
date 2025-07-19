import { Link } from 'react-router-dom';

const actions = [
  {
    title: 'Students',
    add: { to: '/students/add', label: 'Add Student' },
    view: { to: '/students/list', label: 'View Students' },
    icon: (
      <svg className="w-8 h-8 text-indigo-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    ),
  },
  {
    title: 'Teachers',
    add: { to: '/teachers/add', label: 'Add Teacher' },
    view: { to: '/teachers/list', label: 'View Teachers' },
    icon: (
      <svg className="w-8 h-8 text-indigo-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 7v-6m0 0l-9-5m9 5l9-5" /></svg>
    ),
  },
  {
    title: 'Classes',
    add: { to: '/classes/add', label: 'Add Class' },
    view: { to: '/classes/list', label: 'View Classes' },
    icon: (
      <svg className="w-8 h-8 text-indigo-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4 4 4-4m0-5V3a1 1 0 00-1-1H5a1 1 0 00-1 1v12a1 1 0 001 1h3" /></svg>
    ),
  },
  {
    title: 'Facilities',
    add: { to: '/facilities/add', label: 'Add Facility' },
    view: { to: '/facilities/list', label: 'View Facilities' },
    icon: (
      <svg className="w-8 h-8 text-indigo-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v4a1 1 0 001 1h3m10-5v4a1 1 0 001 1h3m-7 4v4m0 0l-4-4m4 4l4-4" /></svg>
    ),
  },
];

export default function Dashboard() {
  return (
    <div className="outer-container">
      <div className="outer-card">
        <h2>Welcome to the Dashboard</h2>
        <div className="inner-card">
          {actions.map((action) => (
            <div key={action.title} className="title">
              {action.icon}
              <h3>{action.title}</h3>
              <div>
                <Link to={action.add.to} className="add-link">
                  {action.add.label}
                </Link>
                <Link to={action.view.to} className="view-link">
                  {action.view.label}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
