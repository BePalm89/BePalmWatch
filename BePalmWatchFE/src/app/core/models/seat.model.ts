import { SeatStatus } from "../enum/seat-status.enum";

export interface Seat {
    row: number,
    seat: number,
    status: SeatStatus,
    id: number;
}