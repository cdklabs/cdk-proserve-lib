import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        include: ['test/**/*.test.ts'],
        globals: true,
        testTimeout: 15000,
        hookTimeout: 30000,
        teardownTimeout: 10000,
        pool: 'threads',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html', 'lcov'],
            reportsDirectory: './coverage',
            enabled: true,
            include: ['src/**/*.ts'],
            exclude: [
                'src/index.ts',
                'src/aspects/index.ts',
                'src/constructs/index.ts',
                'src/patterns/index.ts',
                '**/types/**/*.ts'
            ]
        },
        setupFiles: ['test/setup.ts']
    }
});
