export class RWLock {
  private readers = 0;
  private writer = false;
  private readQueue: (() => void)[] = [];
  private writeQueue: (() => void)[] = [];

  // Acquire a read lock
  async acquireReadLock(): Promise<void> {
    if (this.writer || this.writeQueue.length > 0) {
      await new Promise<void>((resolve) => this.readQueue.push(resolve));
    }
    this.readers++;
  }

  // Release a read lock
  releaseReadLock(): void {
    if (this.readers > 0) {
      this.readers--;
      if (this.readers === 0 && this.writeQueue.length > 0) {
        const nextWriter = this.writeQueue.shift();
        nextWriter?.();
      }
    } else {
      throw new Error("No read lock to release");
    }
  }

  // Acquire a write lock
  async acquireWriteLock(): Promise<void> {
    if (this.writer || this.readers > 0) {
      await new Promise<void>((resolve) => this.writeQueue.push(resolve));
    }
    this.writer = true;
  }

  // Release a write lock
  releaseWriteLock(): void {
    if (this.writer) {
      this.writer = false;
      if (this.readQueue.length > 0) {
        while (this.readQueue.length > 0) {
          const nextReader = this.readQueue.shift();
          nextReader?.();
        }
      } else if (this.writeQueue.length > 0) {
        const nextWriter = this.writeQueue.shift();
        nextWriter?.();
      }
    } else {
      throw new Error("No write lock to release");
    }
  }
}