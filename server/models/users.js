const users = [
  // for signup
  //* 0 valid data
  {
    firstName: 'NGIRIMANA',
    lastName: 'schadrack',
    email: 'chadrack@gmail.com',
    password: 'safari1006',
  },

  //* 1 invalid data with wrong email
  {
    firstName: 'NGIRIMANA',
    lastName: 'schadrack',
    email: 'chadrack',
    password: 'safari1006',
  },
  //* 2 user data with short password
  {
    firstName: 'NGIRIMANA',
    lastName: 'schadrack',
    email: 'chadrack@gmail.com',
    password: 'safari',
  },

  //* 3 user with incomplete data

  {
    lastname: 'schadrack',
    email: 'chadrack@gmail.com',
    password: 'safari1006',
  },
  // for SignIn
  //* 4 correct signIn data
  {
    email: 'chadrack@gmail.com',
    password: 'safari1006',

  },
  //* ***** 5 incorrect password for signin
  {
    email: 'niyo@gmail.com',
    password: 'amani444444',
  },
  //* ****** 6 missing email
  {
    password: 'safari1006',
  },
  //* ******* 7 missing password
  {
    email: 'chadrack@gmail.com',
  },
  //* ******** 8 wrong email
  {
    email: 'andelachalenge',
    password: 'safari1006',
  },
  //* ********* 9 empty first_name
  {
    firstName: '',
    lastName: 'schadrack',
    email: 'chadrack@gmail.com',
    password: 'safari1006',


  },
  //* ********** 10 empty last_name
  {
    firstName: 'NGIRIMANA',
    lastName: '',
    email: 'chadrack@gmail.com',
    password: 'safari1006',

  },
  // ************ 11 empty password
  {
    firstName: 'NGIRIMANA',
    lastName: 'schadrack',
    email: 'chadrack@gmail.com',
    password: '',

  },
  // 12 correct data
  {
    firstName: 'rukundo',
    lastName: 'jmv',
    email: 'jmv@gmail.com',
    password: 'safari1006',
  },

];
export default users;
