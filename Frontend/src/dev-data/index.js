export const TASKS = [
  {
    _id: 1,
    title: 'Building Frontend part of Task App',
    userId: '1',
    description:
      "As we know that how important is to manage a frontend, It's curcial skills",
    status: 'todo',
    subtasks: [
      {
        subtaskname: 'kcuh bhi',
        isDone: false,
        _id: 1,
      },
      {
        subtaskname: 'kcuh bhi',
        isDone: false,
        _id: 2,
      },
      {
        subtaskname: 'kcuh bhi',
        isDone: false,
        _id: 3,
      },
    ],
  },
  {
    _id: 2,
    title: 'Building UI for search',
    userId: '1',
    description: 'As we know that how important is',
    status: 'todo',
    subtasks: [
      {
        subtaskname: 'kcuh bhi',
        isDone: false,
        _id: 4,
      },
      {
        subtaskname: 'kcuh bhi',
        isDone: false,
        _id: 5,
      },
    ],
  },

  {
    _id: 3,
    title: 'Design System and search pages',
    userId: '1',
    description: 'As we know that how important is',
    status: 'doing',
    subtasks: [
      {
        subtaskname: 'kcuh bhi',
        isDone: false,
        _id: 6,
      },
      {
        subtaskname: 'kcuh bhi',
        isDone: true,
        _id: 7,
      },
      {
        subtaskname: 'kcuh bhi',
        isDone: true,
        _id: 8,
      },
    ],
  },
  {
    _id: 4,
    title: 'Add search end point',
    userId: '1',
    description: 'As we know that how important is',
    status: 'doing',
    subtasks: [
      {
        subtaskname: 'kcuh bhi',
        isDone: false,
        _id: 8,
      },
      {
        subtaskname: 'kcuh bhi',
        isDone: false,
        _id: 9,
      },
      {
        subtaskname: 'kcuh bhi',
        isDone: true,
        _id: 10,
      },
    ],
  },
  {
    _id: 5,
    title: 'Conduct 5 wireframes tests',
    userId: '1',
    description: 'As we know that how important is',
    status: 'done',
    subtasks: [
      {
        subtaskname: 'kcuh bhi',
        isDone: true,
        _id: 11,
      },
      {
        subtaskname: 'kcuh bhi',
        isDone: true,
        _id: 12,
      },
      {
        subtaskname: 'kcuh bhi',
        isDone: true,
        _id: 13,
      },
    ],
  },
];

export const BOARD = {
  _id: 1,
  name: 'Platform Launch',
  userId: 1,
  coulmns: [
    {
      _id: 1,
      name: 'todo',
      color: 'cyan',
    },
    {
      _id: 2,
      name: 'doing',
      color: 'violet',
    },
    {
      _id: 3,
      name: 'done',
      color: 'lightgreen',
    },
    // {
    //   _id: 4,
    //   name: 'next',
    //   color: 'yellow',
    // },
  ],
};
