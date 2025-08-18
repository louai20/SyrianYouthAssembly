// config/database.ts
export default ({ env }) => ({
    connection: {
        client: 'postgres',
        connection: {
            connectionString: env('DATABASE_URL'),
            ssl: env.bool('DATABASE_SSL', false)
                ? { rejectUnauthorized: false }
                : false,
            schema: env('DATABASE_SCHEMA', 'public'),
        },
        acquireConnectionTimeout: env.int('DB_ACQUIRE_TIMEOUT', 600000),
        pool: {
            min: env.int('DB_POOL_MIN', 0),
            max: env.int('DB_POOL_MAX', 10),
            acquireTimeoutMillis: env.int('DB_POOL_ACQUIRE', 300000),
            createTimeoutMillis: env.int('DB_POOL_CREATE', 300000),
            idleTimeoutMillis: env.int('DB_POOL_IDLE', 30000),
            reapIntervalMillis: env.int('DB_POOL_REAP', 1000),
            createRetryIntervalMillis: env.int('DB_POOL_RETRY', 2000),
            propagateCreateError: false,
        },
        debug: env.bool('DATABASE_DEBUG', false),
    },
    settings: {
        forceMigration: env.bool('DATABASE_FORCE_MIGRATION', true),
        runMigrations: env.bool('DATABASE_RUN_MIGRATIONS', true),
    },
});
