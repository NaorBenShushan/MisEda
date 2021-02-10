export default function validateOnRegister(values) {
  const errors = {};

  // first name errors
  if (!values.firstName) {
    errors.firstName = 'יש לציין שם פרטי';
  } else if (values.firstName.length < 2) {
    errors.firstName = 'שם פרטי קצר מדי';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'שם פרטי ארוך מדי';
  }

  // last name errors
  if (!values.lastName) {
    errors.lastName = 'יש לציין שם משפחה';
  } else if (values.lastName.length < 2) {
    errors.lastName = 'שם משפחה קצר מדי';
  } else if (values.lastName.length > 15) {
    errors.lastName = 'שם משפחה ארוך מדי';
  }

  // email errors
  if (!values.email) {
    errors.email = 'יש לציין אימייל';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'אימייל לא תקין';
  }

  // password errors
  if (!values.password) {
    errors.password = 'יש לציין סיסמה';
  } else if (values.password.length < 8) {
    errors.password = 'סיסמה קצרה מדי';
  } else if (values.password.length > 20) {
    errors.password = 'סיסמה ארוכה מדי';
  }

  return errors;
}
