// Create a single employee record from an array
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

// Create multiple employee records from an array of arrays
function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord);
}

// Add a TimeIn event to an employee's record
function createTimeInEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    date,
    hour: parseInt(hour, 10),
  });
  return employee;
}

// Add a TimeOut event to an employee's record
function createTimeOutEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    date,
    hour: parseInt(hour, 10),
  });
  return employee;
}

// Calculate hours worked on a given date
function hoursWorkedOnDate(employee, soughtDate) {
  const inEvent = employee.timeInEvents.find(e => e.date === soughtDate);
  const outEvent = employee.timeOutEvents.find(e => e.date === soughtDate);
  return (outEvent.hour - inEvent.hour) / 100;
}

// Calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

// Calculate total wages for all dates for a single employee
function allWagesFor(employee) {
  return employee.timeInEvents.reduce((total, e) => {
    return total + wagesEarnedOnDate(employee, e.date);
  }, 0);
}

// Calculate total payroll for all employees
function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((total, emp) => {
    return total + allWagesFor(emp);
  }, 0);
}
