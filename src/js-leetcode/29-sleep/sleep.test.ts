import { vi, beforeEach, afterEach } from 'vitest';
import sleep from './sleep';

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('should await with sleep function using await', async () => {
    const sleepPromise = sleep(3000);
    vi.advanceTimersByTime(3000);
    await sleepPromise;

    // No need to check actual time difference since we're using fake timers
    expect(vi.getTimerCount()).toBe(0); // Verify all timers are complete
  });

  test('should await with sleep function using then', async () => {
    let completed = false;
    const sleepPromise = sleep(3000).then(() => {
      completed = true;
    });

    expect(completed).toBe(false);
    vi.advanceTimersByTime(3000);
    await sleepPromise;
    expect(completed).toBe(true);
  });
});
