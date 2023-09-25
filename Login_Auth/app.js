const firebaseConfig = {
  apiKey: "AIzaSyBuKGnaofpLqhtiIw30gCz7IJgaf610wXA",
  authDomain: "sanjaylib.firebaseapp.com",
  projectId: "sanjaylib",
  storageBucket: "sanjaylib.appspot.com",
  messagingSenderId: "790876356298",
  appId: "1:790876356298:web:cf6ea0623109e18cdb7e33",
  measurementId: "G-7QJDRMTVW4",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

function register() {
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  full_name = document.getElementById("full_name").value;

  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is not valid");
    return;
  }
  if (validate_field(full_name) == false) {
    alert("Email or Password is not valid");
    return;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      var user = auth.currentUser;

      var database_ref = database.ref();

      var user_data = {
        email: email,
        full_name: full_name,
        last_login: Date.now(),
      };

      database_ref.child("users/" + user.uid).set(user_data);

      alert("User Created!!");
    })
    .catch(function (error) {
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

function login() {
  email = document.getElementById("lemail").value;
  password = document.getElementById("lpassword").value;

  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is not valid");
    return;
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      var user = auth.currentUser;
      var database_ref = database.ref();
      var user_data = {
        last_login: Date.now(),
      };

      database_ref.child("users/" + user.uid).update(user_data);
      window.location.replace(
        "https://sanjaykumardd.github.io/library-management/"
      );
      alert("User Logged In!!");
    })
    .catch(function (error) {
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    return true;
  } else {
    return false;
  }
}

function validate_password(password) {
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}
