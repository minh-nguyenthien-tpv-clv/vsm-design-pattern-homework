// Lịch trình
interface Schedule {
    vesselCode: string;
    ETA: Date;
    ETB: Date;
    ETD: Date;
    port: string;
    travelTime?: number; // Thời gian đi sẽ được tính toán
}

// Handler interface
interface Handler {
    setNext(handler: Handler): Handler;
    handle(schedule: Schedule, schedules: Schedule[]): string | null;
}

// Base Handler class
abstract class BaseHandler implements Handler {
    handleRequest(request: string) {
        throw new Error("Method not implemented.");
    }
    private nextHandler: Handler | null = null;

    setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    handle(schedule: Schedule, schedules: Schedule[]): string | null {
        if (this.nextHandler) {
            return this.nextHandler.handle(schedule, schedules);
        }
        return null;
    }
}

// Concrete Handlers
class UniqueVesselCodeHandler extends BaseHandler {
    handle(schedule: Schedule, schedules: Schedule[]): string | null {
        const exists = schedules.some(s => s.vesselCode === schedule.vesselCode);
        if (exists) {
            return `Vessel code ${schedule.vesselCode} already exists.`;
        }
        return super.handle(schedule, schedules);
    }
}

class TimeOrderHandler extends BaseHandler {
    handle(schedule: Schedule, schedules: Schedule[]): string | null {
        if (schedule.ETA > schedule.ETB || schedule.ETB > schedule.ETD) {
            return `ETA must be less than or equal to ETB and ETB must be less than or equal to ETD.`;
        }
        return super.handle(schedule, schedules);
    }
}

class NewRowTimeCheckHandler extends BaseHandler {
    handle(schedule: Schedule, schedules: Schedule[]): string | null {
        if (schedules.length > 0) {
            const lastSchedule = schedules[schedules.length - 1];
            if (schedule.ETA <= lastSchedule.ETD) {
                return `ETA of the new row must be greater than ETD of the last schedule.`;
            }
        }
        return super.handle(schedule, schedules);
    }
}

class TravelTimeCalculatorHandler extends BaseHandler {
    handle(schedule: Schedule, schedules: Schedule[]): string | null {
        if (schedules.length > 0) {
            const lastSchedule = schedules[schedules.length - 1];
            const travelTime = (schedule.ETA.getTime() - lastSchedule.ETA.getTime()) / (1000 * 60 * 60); // Convert milliseconds to hours
            schedule.travelTime = travelTime; // Lưu lại thời gian đi
        }
        return super.handle(schedule, schedules);
    }
}

// Client code
const schedules: Schedule[] = [];
const handlerA = new UniqueVesselCodeHandler();
const handlerB = new TimeOrderHandler();
const handlerC = new NewRowTimeCheckHandler();
const handlerD = new TravelTimeCalculatorHandler();

// Thiết lập chuỗi
handlerA.setNext(handlerB).setNext(handlerC).setNext(handlerD);

// Thêm một lịch trình mới
const newSchedule: Schedule = {
    vesselCode: 'Vessel001',
    ETA: new Date('2024-10-01T10:00:00'),
    ETB: new Date('2024-10-01T12:00:00'),
    ETD: new Date('2024-10-01T14:00:00'),
    port: 'Port A'
};

const result = handlerA.handle(newSchedule, schedules);
if (result) {
    console.log(result);
} else {
    schedules.push(newSchedule); // Nếu không có lỗi, thêm vào danh sách
    console.log(`Schedule added:`, newSchedule);
}

// Thêm một lịch trình khác
const newSchedule2: Schedule = {
    vesselCode: 'Vessel002',
    ETA: new Date('2024-10-01T15:00:00'),
    ETB: new Date('2024-10-01T16:00:00'),
    ETD: new Date('2024-10-01T18:00:00'),
    port: 'Port B'
};

const result2 = handlerA.handle(newSchedule2, schedules);
if (result2) {
    console.log(result2);
} else {
    schedules.push(newSchedule2); // Nếu không có lỗi, thêm vào danh sách
    console.log(`Schedule added:`, newSchedule2);
}
