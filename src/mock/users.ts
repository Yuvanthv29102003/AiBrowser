import type { User } from '../types';

export const mockUsers: User[] = [
  { 
    name: "John Doe", 
    id: "1001", 
    mobile: "9876543210", 
    gender: "Male", 
    country: "India", 
    activity: "30 min",
    email: "john.doe@example.com",
    status: 'active',
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  { 
    name: "Jane Smith", 
    id: "1002", 
    mobile: "9876543211", 
    gender: "Female", 
    country: "USA", 
    activity: "30 min",
    email: "jane.smith@example.com",
    status: 'inactive',
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  // 58 more mock users...
  { 
    name: "Robert Johnson", 
    id: "1003", 
    mobile: "9876543212", 
    gender: "Male", 
    country: "UK", 
    activity: "30 min",
    email: "robert.j@example.com",
    status: 'active',
    avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  { 
    name: "Emily Davis", 
    id: "1004", 
    mobile: "9876543213", 
    gender: "Female", 
    country: "Canada", 
    activity: "30 min",
    email: "emily.d@example.com",
    status: 'active',
    avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  { 
    name: "Michael Wilson", 
    id: "1005", 
    mobile: "9876543214", 
    gender: "Male", 
    country: "Australia", 
    activity: "30 min",
    email: "michael.w@example.com",
    status: 'inactive',
    avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  { 
    name: "Sarah Brown", 
    id: "1006", 
    mobile: "9876543215", 
    gender: "Female", 
    country: "Germany", 
    activity: "30 min",
    email: "sarah.b@example.com",
    status: 'active',
    avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  { 
    name: "David Taylor", 
    id: "1007", 
    mobile: "9876543216", 
    gender: "Male", 
    country: "France", 
    activity: "30 min",
    email: "david.t@example.com",
    status: 'active',
    avatarUrl: "https://randomuser.me/api/portraits/men/4.jpg"
  },
  { 
    name: "Emma Martinez", 
    id: "1008", 
    mobile: "9876543217", 
    gender: "Female", 
    country: "Spain", 
    activity: "30 min",
    email: "emma.m@example.com",
    status: 'inactive',
    avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  { 
    name: "James Anderson", 
    id: "1009", 
    mobile: "9876543218", 
    gender: "Male", 
    country: "Japan", 
    activity: "30 min",
    email: "james.a@example.com",
    status: 'active',
    avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  { 
    name: "Olivia Thomas", 
    id: "1010", 
    mobile: "9876543219", 
    gender: "Female", 
    country: "Brazil", 
    activity: "30 min",
    email: "olivia.t@example.com",
    status: 'active',
    avatarUrl: "https://randomuser.me/api/portraits/women/5.jpg"
  },
  // Add more users as needed...
];

// Generate the rest of the users programmatically to reach 60
const countries = ["India", "USA", "UK", "Canada", "Australia", "Germany", "France", "Japan", "Brazil", "China"];
const activities = ["15 Min", "30 Min", "45 Min", "1 Hr", "1 Hr 15 Min", "1 Hr 30 Min"];
const statuses: Array<'active' | 'inactive'> = ['active', 'inactive'];

for (let i = 11; i <= 60; i++) {
  const gender = Math.random() > 0.5 ? 'Male' : 'Female';
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const country = countries[Math.floor(Math.random() * countries.length)];
  const activity = activities[Math.floor(Math.random() * activities.length)];
  const id = (1000 + i).toString();
  const name = `User ${i}`;
  const email = `user${i}@example.com`;
  const mobile = `98765${Math.floor(10000 + Math.random() * 90000)}`;
  const avatarNumber = (i % 20) + 1; // Cycle through 20 different avatars
  
  mockUsers.push({
    name,
    id,
    mobile,
    gender,
    country,
    activity,
    email,
    status,
    avatarUrl: `https://randomuser.me/api/portraits/${gender.toLowerCase() === 'male' ? 'men' : 'women'}/${avatarNumber}.jpg`
  });
}

export default mockUsers;
