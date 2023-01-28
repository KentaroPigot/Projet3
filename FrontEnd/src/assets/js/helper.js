const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getData = async function () {
  try {
    // const res = await Promise.race(
    //   fetch('http://localhost:5678/api/works'),
    //   timeout(30)
    // );
    const res = await fetch('http://localhost:5678/api/works');
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const getCategories = async function () {
  try {
    const res = await fetch('http://localhost:5678/api/categories');
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const checkEmail = function (eml) {
  const email = eml.value.toLowerCase();
  console.log(email);

  //check si email ok, return boolean
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
    ? true
    : false;
};

export const checkPassword = function (passw) {
  const password = passw.value;
  console.log(password);
  //check voir si il y a un input
  return password !== '' ? true : false;
};

export const checkIfFormValid = function (files, title, categ) {
  console.log('checkForm');
  //Attend un files,
  if (!Math.round(files.size / 1024) >= 4) {
    console.log('file too big');
    return false;
  }
  if (!title) {
    console.log('input a title');
    return false;
  }
  if (!categ) {
    console.log('input a categ');
    return false;
  }
  return true;
};
