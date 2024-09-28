// Command Interface
interface Command {
    execute(): void;
    undo(): void;
}

// Schedule Row Interface
interface ScheduleRow {
    vesselCode: string;
    eta: Date;
    etb: Date;
    etd: Date;
    port: string;
}

// Command Implementations
class AddScheduleCommand implements Command {
    private schedule: ScheduleManager;
    private newRow: ScheduleRow;

    constructor(schedule: ScheduleManager) {
        this.schedule = schedule;
        const lastRow = schedule.getLastRow();
        this.newRow = {
            vesselCode: `V${Math.floor(Math.random() * 1000)}`,
            eta: new Date(lastRow.eta.getTime() + 24 * 60 * 60 * 1000),
            etb: new Date(lastRow.etb.getTime() + 24 * 60 * 60 * 1000),
            etd: new Date(lastRow.etd.getTime() + 24 * 60 * 60 * 1000),
            port: this.getRandomPort(),
        };
    }

    private getRandomPort(): string {
        const ports = ["HKG", "SIN", "SHG", "NGB", "QIN", "HAN", "BKK", "TPE", "YOK", "KRS", "JKT", "KUA", "MAN", "KOL", "DHA", "DJB", "TBS", "KHI"];
        return ports[Math.floor(Math.random() * ports.length)];
    }

    execute(): void {
        this.schedule.addRow(this.newRow);
    }

    undo(): void {
        this.schedule.removeRow(this.newRow.vesselCode);
    }
}

class EditScheduleCommand implements Command {
    private schedule: ScheduleManager;
    private oldRow: ScheduleRow;
    private newRow: ScheduleRow;

    constructor(schedule: ScheduleManager, oldRow: ScheduleRow, newRow: ScheduleRow) {
        this.schedule = schedule;
        this.oldRow = oldRow;
        this.newRow = newRow;
    }

    execute(): void {
        this.schedule.editRow(this.oldRow.vesselCode, this.newRow);
    }

    undo(): void {
        this.schedule.editRow(this.newRow.vesselCode, this.oldRow);
    }
}

class RemoveScheduleCommand implements Command {
    private schedule: ScheduleManager;
    private row: ScheduleRow;

    constructor(schedule: ScheduleManager, row: ScheduleRow) {
        this.schedule = schedule;
        this.row = row;
    }

    execute(): void {
        this.schedule.removeRow(this.row.vesselCode);
    }

    undo(): void {
        this.schedule.addRow(this.row);
    }
}

// Schedule Manager
class ScheduleManager {
    private schedule: ScheduleRow[] = [];
    private commandHistory: Command[] = [];
    private undoStack: Command[] = [];

    constructor() {
        this.initSchedule();
    }

    private initSchedule(): void {
        // Initialize with 5 rows
        const ports = ["HKG", "SIN", "SHG", "NGB", "QIN", "HAN", "BKK", "TPE", "YOK", "KRS", "JKT", "KUA", "MAN", "KOL", "DHA", "DJB", "TBS", "KHI"];
        const today = new Date();
        for (let i = 0; i < 5; i++) {
            this.schedule.push({
                vesselCode: `V${Math.floor(Math.random() * 1000)}`,
                eta: new Date(today.getTime() + i * 24 * 60 * 60 * 1000),
                etb: new Date(today.getTime() + i * 24 * 60 * 60 * 1000),
                etd: new Date(today.getTime() + i * 24 * 60 * 60 * 1000),
                port: ports[Math.floor(Math.random() * ports.length)],
            });
        }
    }

    getLastRow(): ScheduleRow {
        return this.schedule[this.schedule.length - 1];
    }

    addRow(row: ScheduleRow): void {
        this.schedule.push(row);
        this.commandHistory.push(new AddScheduleCommand(this));
    }

    removeRow(vesselCode: string): void {
        this.schedule = this.schedule.filter(row => row.vesselCode !== vesselCode);
    }

    editRow(vesselCode: string, updatedRow: ScheduleRow): void {
        const index = this.schedule.findIndex(row => row.vesselCode === vesselCode);
        if (index !== -1) {
            this.schedule[index] = updatedRow;
        }
    }

    executeCommand(command: Command): void {
        command.execute();
        this.commandHistory.push(command);
        this.undoStack = []; // Clear redo stack on new command
    }

    undo(): void {
        const command = this.commandHistory.pop();
        if (command) {
            command.undo();
            this.undoStack.push(command);
        }
    }

    redo(): void {
        const command = this.undoStack.pop();
        if (command) {
            command.execute();
            this.commandHistory.push(command);
        }
    }

    getSchedule(): ScheduleRow[] {
        return this.schedule;
    }
}

// Example usage
const scheduleManager = new ScheduleManager();
console.log("Initial Schedule:", scheduleManager.getSchedule());

const addCommand = new AddScheduleCommand(scheduleManager);
scheduleManager.executeCommand(addCommand);
console.log("After Add Command:", scheduleManager.getSchedule());

const editCommand = new EditScheduleCommand(scheduleManager, scheduleManager.getSchedule()[0], {
    vesselCode: scheduleManager.getSchedule()[0].vesselCode,
    eta: new Date(),
    etb: new Date(),
    etd: new Date(),
    port: "SIN",
});
scheduleManager.executeCommand(editCommand);
console.log("After Edit Command:", scheduleManager.getSchedule());

scheduleManager.undo();
console.log("After Undo Edit:", scheduleManager.getSchedule());

scheduleManager.redo();
console.log("After Redo Edit:", scheduleManager.getSchedule());

const removeCommand = new RemoveScheduleCommand(scheduleManager, scheduleManager.getSchedule()[0]);
scheduleManager.executeCommand(removeCommand);
console.log("After Remove Command:", scheduleManager.getSchedule());
