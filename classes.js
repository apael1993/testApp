window.onload = main;

function main() {
    const job = new Job('title1', 'description1');
    const employee1 = new Employee('Karen', 100000, job);
    const employee2 = new Employee('Artur', 200000);
    let title = employee1.job.title;
    debugger;
}

class Job {

    constructor(title, description) {
        this.title = title;
        this.description = description;
    }
}

class Employee {

    constructor(name, salary, job) {
        this.name = name;
        this.salary = salary;
        this.job = job;
    }

    getSalaryForYear() {
        return 12 * this.salary;
    }
}