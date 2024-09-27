// Visitor interface
interface UpdateVisitor {
    visitVesselCodeUpdate(update: VesselCodeUpdate): void;
    visitEstimateTimeUpdate(update: EstimateTimeUpdate): void;
    visitDirectionUpdate(update: DirectionUpdate): void;
}

// Element interface
interface ScheduleUpdate {
    accept(visitor: UpdateVisitor): void;
}

// Concrete Element: Vessel Code Update
class VesselCodeUpdate implements ScheduleUpdate {
    constructor(public oldVesselCode: string, public newVesselCode: string) { }

    accept(visitor: UpdateVisitor): void {
        visitor.visitVesselCodeUpdate(this);
    }
}

// Concrete Element: ETA-ETB-ETD Update
class EstimateTimeUpdate implements ScheduleUpdate {
    constructor(
        public oldETA: Date, public newETA: Date,
        public oldETB: Date, public newETB: Date,
        public oldETD: Date, public newETD: Date
    ) { }

    accept(visitor: UpdateVisitor): void {
        visitor.visitEstimateTimeUpdate(this);
    }
}

// Concrete Element: Direction Update
class DirectionUpdate implements ScheduleUpdate {
    constructor(public oldDirection: string, public newDirection: string) { }

    accept(visitor: UpdateVisitor): void {
        visitor.visitDirectionUpdate(this);
    }
}

// Concrete Visitor: LogUpdateVisitor
class LogUpdateVisitor implements UpdateVisitor {
    visitVesselCodeUpdate(update: VesselCodeUpdate): void {
        console.log(`Vessel Code updated from ${update.oldVesselCode} to ${update.newVesselCode}`);
    }

    visitEstimateTimeUpdate(update: EstimateTimeUpdate): void {
        console.log(`ETA updated from ${update.oldETA} to ${update.newETA}`);
        console.log(`ETB updated from ${update.oldETB} to ${update.newETB}`);
        console.log(`ETD updated from ${update.oldETD} to ${update.newETD}`);
    }

    visitDirectionUpdate(update: DirectionUpdate): void {
        console.log(`Direction updated from ${update.oldDirection} to ${update.newDirection}`);
    }
}

// Concrete Visitor: ValidationVisitor
class ValidationVisitor implements UpdateVisitor {
    visitVesselCodeUpdate(update: VesselCodeUpdate): void {
        if (update.newVesselCode.length === 0) {
            throw new Error("Invalid vessel code");
        }
        console.log("Vessel code is valid.");
    }

    visitEstimateTimeUpdate(update: EstimateTimeUpdate): void {
        if (update.newETA > update.newETB || update.newETB > update.newETD) {
            throw new Error("Invalid ETA-ETB-ETD sequence.");
        }
        console.log("ETA-ETB-ETD sequence is valid.");
    }

    visitDirectionUpdate(update: DirectionUpdate): void {
        const validDirections = ["North", "South", "East", "West"];
        if (!validDirections.includes(update.newDirection)) {
            throw new Error("Invalid direction");
        }
        console.log("Direction is valid.");
    }
}

// Usage
const updates: ScheduleUpdate[] = [
    new VesselCodeUpdate("VES123", "VES456"),
    new EstimateTimeUpdate(
        new Date('2024-09-25T08:00'), new Date('2024-09-26T08:00'),
        new Date('2024-09-25T12:00'), new Date('2024-09-26T12:00'),
        new Date('2024-09-25T18:00'), new Date('2024-09-26T18:00')
    ),
    new DirectionUpdate("North", "South")
];

// Log updates
const logVisitor = new LogUpdateVisitor();
updates.forEach(update => update.accept(logVisitor));

// Validate updates
const validationVisitor = new ValidationVisitor();
updates.forEach(update => update.accept(validationVisitor));
