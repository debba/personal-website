import {execFileSync} from 'node:child_process';

let cliToken: string | null | undefined;

// Production reads GITHUB_TOKEN from Vercel. Sensitive Vercel variables cannot be pulled,
// so local development falls back to the GitHub CLI session when it is available.
export function githubToken(): string | undefined {
    if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
    if (process.env.NODE_ENV !== 'development') return undefined;
    if (cliToken === undefined) {
        try {
            cliToken = execFileSync('gh', ['auth', 'token'], {encoding: 'utf8', timeout: 5000, stdio: ['ignore', 'pipe', 'ignore']}).trim() || null;
        } catch {
            cliToken = null;
        }
    }
    return cliToken ?? undefined;
}
