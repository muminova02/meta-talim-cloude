/**
 * Permission Handler Utility
 * Handles device sensor permission errors gracefully
 */

// Store original console methods
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

/**
 * Suppress specific permission policy violations
 */
export const suppressPermissionErrors = () => {
  // Override console.error to filter permission errors
  console.error = function(...args: any[]) {
    const message = args[0];
    if (typeof message === 'string') {
      // Suppress specific permission policy violations
      if (
        message.includes('Permissions policy violation') ||
        message.includes('deviceorientation events are blocked') ||
        message.includes('accelerometer is not allowed') ||
        message.includes('gyroscope is not allowed') ||
        message.includes('magnetometer is not allowed')
      ) {
        // Log a cleaner message instead
        console.info('Device sensor access restricted by browser policy (this is normal for security)');
        return;
      }
    }
    originalConsoleError.apply(console, args);
  };

  // Override console.warn to filter permission warnings
  console.warn = function(...args: any[]) {
    const message = args[0];
    if (typeof message === 'string') {
      // Suppress specific permission warnings
      if (
        message.includes('deviceorientation events are blocked') ||
        message.includes('accelerometer is not allowed') ||
        message.includes('gyroscope is not allowed')
      ) {
        return;
      }
    }
    originalConsoleWarn.apply(console, args);
  };
};

/**
 * Restore original console methods
 */
export const restoreConsoleMethods = () => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
};

/**
 * Check if device sensors are available
 */
export const checkDeviceSensors = (): Promise<{
  accelerometer: boolean;
  gyroscope: boolean;
  magnetometer: boolean;
}> => {
  return new Promise((resolve) => {
    const result = {
      accelerometer: false,
      gyroscope: false,
      magnetometer: false,
    };

    // Check accelerometer
    if ('Accelerometer' in window) {
      try {
        const sensor = new (window as any).Accelerometer({ frequency: 1 });
        sensor.addEventListener('reading', () => {
          result.accelerometer = true;
          sensor.stop();
        });
        sensor.start();
        setTimeout(() => sensor.stop(), 1000);
      } catch (e) {
        // Sensor not available
      }
    }

    // Check gyroscope
    if ('Gyroscope' in window) {
      try {
        const sensor = new (window as any).Gyroscope({ frequency: 1 });
        sensor.addEventListener('reading', () => {
          result.gyroscope = true;
          sensor.stop();
        });
        sensor.start();
        setTimeout(() => sensor.stop(), 1000);
      } catch (e) {
        // Sensor not available
      }
    }

    // Check magnetometer
    if ('Magnetometer' in window) {
      try {
        const sensor = new (window as any).Magnetometer({ frequency: 1 });
        sensor.addEventListener('reading', () => {
          result.magnetometer = true;
          sensor.stop();
        });
        sensor.start();
        setTimeout(() => sensor.stop(), 1000);
      } catch (e) {
        // Sensor not available
      }
    }

    // Resolve after a short delay
    setTimeout(() => resolve(result), 1500);
  });
};

/**
 * Initialize permission handling
 */
export const initializePermissionHandling = () => {
  // Suppress permission errors immediately
  suppressPermissionErrors();

  // Check device sensors availability
  checkDeviceSensors().then((sensors) => {
    console.info('Device sensors status:', sensors);
  });
};
