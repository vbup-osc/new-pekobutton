import { unregister } from 'register-service-worker';

if ('serviceWorker' in window.navigator && (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'pre-release')) {
    unregister();
}