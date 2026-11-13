// Share concurrent refreshes and reuse successful generations in a warm server.
// Failures are retried after a minute, never cached as successful fresh data.
export function createActivityCache(generate, {clock = Date.now} = {}) {
    let previous = null;
    let pending = null;
    let retryAt = 0;
    let failure;
    return async () => {
        const now = clock();
        const ttl = previous?.summarySource === 'github' ? 5 * 60_000 : 6 * 60 * 60_000;
        if (previous && now - Date.parse(previous.updatedAt) < ttl) return previous;
        if (pending) return pending;
        if (failure && now < retryAt) throw failure;
        pending = Promise.resolve().then(() => generate({previous, now: new Date(now)})).then(feed => {
            previous = feed;
            failure = null;
            return feed;
        }).catch(error => {
            failure = error;
            retryAt = clock() + 60_000;
            throw error;
        }).finally(() => {pending = null;});
        return pending;
    };
}
