export const userColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.username}</div>;
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "age",
    headerName: "Age",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

//temporary data
export const userRows = [
  {
    username: "Snow",

    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    username: "Jamie Lannister",

    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    username: "Lannister",

    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    username: "Stark",

    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    username: "Targaryen",

    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    username: "Melisandre",

    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    username: "Clifford",

    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    username: "Frances",

    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    username: "Roxie",

    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    username: "Roxie",

    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];
