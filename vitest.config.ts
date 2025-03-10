import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        include: ['test/**/*.test.ts'],
        // Optional: use Jest compatibility mode if you have a lot of Jest-specific code
        globals: true,
        // setupFiles: ['./test/setup.ts'], // If you have setup files
        coverage: {
            provider: 'v8', // or 'c8' or 'istanbul'
            reporter: ['text', 'json', 'html', 'lcov'], // lcov is needed for VS Code
            reportsDirectory: './coverage',
            enabled: true,
            include: ['src/**/*.ts']
        }
    }
});
