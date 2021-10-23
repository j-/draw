declare global {
  export interface PointerEvent {
    getCoalescedEvents?: () => PointerEvent[];
  }
}
