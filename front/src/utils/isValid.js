import axios from "axios";
export const isValid = async (form) => {
  let errors = [];
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!re.test(form.email)) errors.push("Invalid Email");
  if (form.name.length < 3) errors.push("Name must be more than 4 characters");
  if (form.phone.length < 5) errors.push("invalid phone number");
  try {
    await axios.get(`/api/exams/${form.examCode}`);
  } catch (error) {
    errors.push("invalid exam code");
  }
  return errors;
};

export const isValidExam = async (form) => {
  let errors = [];
  if (form.name.length < 4) errors.push("Name must be more than 4 characters");
  if (form.examCode < 4) {
    errors.push("exam code must be more than 4 characters");
  } else {
    try {
      await axios.get(`/api/exam-code/${form.examCode}`);
    } catch (error) {
      errors.push("exam code already used");
    }
  }
  if (form.startDate >= form.endDate) errors.push("Invalid date!");
  if (form.startDate==="") errors.push("Invalid start date!");
  if (form.endDate==="") errors.push("Invalid end date!");
  if (form.duration.length > 3 || form.duration.length < 1) errors.push("Invalid duration");

  return errors;
};

export const isValidQuestion = (form) => {
  let errors = [];
  if (form.head.length < 4) errors.push("question must be more than 4 characters");

  let answers = form.choices;
  for (let index = 0; index < answers.length; index++) {
    if (!answers[index].choice) {
      errors.push("empty answer");
      break;
    }
    if (answers[index].choice.length < 2) {
      errors.push("answer must be more than 2 characters");
      break;
    }
  }

  return errors;
};
