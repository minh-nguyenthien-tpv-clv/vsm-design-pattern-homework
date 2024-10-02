// Visitor Interface
interface Visitor {
    visitFullTimeEmployee(employee: FullTimeEmployee): void;
    visitPartTimeEmployee(employee: PartTimeEmployee): void;
}

// Concrete Visitor
class SalaryCalculator implements Visitor {
    visitFullTimeEmployee(employee: FullTimeEmployee): void {
        const salary = employee.getSalary();
        console.log(`Full-time employee salary: ${salary}`);
    }

    visitPartTimeEmployee(employee: PartTimeEmployee): void {
        const salary = employee.getHourlyRate() * employee.getHoursWorked();
        console.log(`Part-time employee salary: ${salary}`);
    }
}

// Element Interface
interface Employee {
    accept(visitor: Visitor): void;
}

// Concrete Elements
class FullTimeEmployee implements Employee {
    private salary: number;

    constructor(salary: number) {
        this.salary = salary;
    }

    getSalary(): number {
        return this.salary;
    }

    accept(visitor: Visitor): void {
        visitor.visitFullTimeEmployee(this);
    }
}

class PartTimeEmployee implements Employee {
    private hourlyRate: number;
    private hoursWorked: number;

    constructor(hourlyRate: number, hoursWorked: number) {
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWorked;
    }

    getHourlyRate(): number {
        return this.hourlyRate;
    }

    getHoursWorked(): number {
        return this.hoursWorked;
    }

    accept(visitor: Visitor): void {
        visitor.visitPartTimeEmployee(this);
    }
}

// Client code
const employees: Employee[] = [
    new FullTimeEmployee(3000),
    new PartTimeEmployee(20, 120),
];

const salaryCalculator = new SalaryCalculator();

employees.forEach(employee => {
    employee.accept(salaryCalculator);
});
