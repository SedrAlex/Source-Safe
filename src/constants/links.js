const LINKS = [
  {
    title: "Dashboard",
    icon: "house",
    pages: [],
  },
  {
    title: "Groups",
    icon: "table",
    pages: [
      {
        title: "Groups",
        path: "/groups",
      },
      {
        title: "New Group",
        path: "/groups/new",
      },
    ],
  },
  {
    title: "Files",
    icon: "pdf",
    pages: [
      {
        title: "Files",
        path: "/files",
      },
      {
        title: "New File",
        path: "/files/new",
      },
    ],
  },
  {
    title: "Invitations",
    icon: "envelope",
    pages: [
      {
        title: "Invitations",
        path: "/invitations",
      },
    
    ],
  },
  // {
  //   title: "Profile",
  //   icon: "users",
  //   pages: [
  //     {
  //       title: "Sign in",
  //       path: "/sign-in",
  //     },
  //     {
  //       title: "Sign up",
  //       path: "/sign-up",
  //     },
  //   ],
  // },
 
];

export default LINKS;
