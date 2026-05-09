// Regional content variants. All variants are server-rendered as a single
// static grid (good for SEO — every variant is indexable). A small client
// component reads Intl timezone and adds a "popular near you" badge to the
// matching variant; nothing is hidden.

export const GEO_VARIANTS = [
    {
        id: 'us-east',
        region: 'US East Coast',
        timezones: ['America/New_York', 'America/Toronto', 'America/Detroit', 'America/Montreal'],
        intro: 'Teams across the US East Coast lean heavily on Notion as a central wiki, with Slack as the comms layer. Custom scheme URLs are most often shared inside Notion docs, where they fail silently.',
        useCase: 'Wrap your slack:// channel deep links into HTTPS so they survive being pasted into Notion runbooks and onboarding pages.',
    },
    {
        id: 'us-west',
        region: 'US West Coast',
        timezones: ['America/Los_Angeles', 'America/Vancouver', 'America/Denver', 'America/Phoenix'],
        intro: 'West Coast product and design teams rely on Figma and Linear daily. Both platforms understand their own deep-link schemes but block competing ones.',
        useCase: 'Convert figma:// prototype links into universal URLs you can drop into Linear specs without breaking the click target.',
    },
    {
        id: 'uk',
        region: 'United Kingdom',
        timezones: ['Europe/London', 'Europe/Dublin'],
        intro: 'UK teams frequently coordinate across Microsoft Teams, Confluence, and Jira — all of which sanitize non-HTTPS URLs aggressively.',
        useCase: 'Embed Zoom and Slack deep links inside Confluence pages and Jira tickets by wrapping the original scheme in a Shortlink.',
    },
    {
        id: 'dach',
        region: 'DACH (Germany / Austria / Switzerland)',
        timezones: ['Europe/Berlin', 'Europe/Vienna', 'Europe/Zurich'],
        intro: 'In German-speaking markets, Confluence and Jira dominate enterprise documentation. Both block custom schemes natively.',
        useCase: 'Paste Shortlinks into Confluence pages to give teammates one-click access to Zoom calls or Figma prototypes from your specs.',
    },
    {
        id: 'france',
        region: 'France',
        timezones: ['Europe/Paris', 'Europe/Brussels', 'Europe/Luxembourg'],
        intro: 'French product teams often combine Notion with Slack and Figma. Cross-tool linking breaks the moment a custom scheme leaves its native app.',
        useCase: 'Generate Shortlinks once and reuse them in Slack, Notion, and email — the same HTTPS link works in every context.',
    },
    {
        id: 'india',
        region: 'India',
        timezones: ['Asia/Kolkata', 'Asia/Calcutta'],
        intro: 'Engineering teams across India frequently ship across time zones, leaning on async tools like Slack, Notion, and GitHub for handoffs.',
        useCase: 'Wrap GitHub Desktop and VS Code deep links into Shortlinks so engineers on the next shift can open them directly from a Notion handoff doc.',
    },
    {
        id: 'japan',
        region: 'Japan',
        timezones: ['Asia/Tokyo'],
        intro: 'Tokyo-based teams often pair Slack with Figma and Notion. Sharing prototype links across these tools is common, and equally commonly broken.',
        useCase: 'Build figma:// and slack:// deep links once with the Shortlink builder, then reuse them across every internal document.',
    },
    {
        id: 'australia',
        region: 'Australia / New Zealand',
        timezones: ['Australia/Sydney', 'Australia/Melbourne', 'Australia/Brisbane', 'Australia/Perth', 'Pacific/Auckland'],
        intro: 'APAC teams running Atlassian stacks (Jira + Confluence) hit the custom-scheme block almost daily.',
        useCase: 'Convert custom scheme URLs into universal HTTPS links once, paste them anywhere, and stop manually re-explaining how to open the app.',
    },
    {
        id: 'default',
        region: 'Worldwide',
        timezones: [],
        intro: 'Distributed and remote teams across every region run into the same problem: deep links that work in one app break the moment they leave it.',
        useCase: 'Use Shortlink to wrap any custom scheme URL into an HTTPS link that works in every tool your team uses.',
    },
]

// Build a fast lookup: timezone -> variant id
export const TZ_TO_VARIANT = (() => {
    const map = {}
    for (const v of GEO_VARIANTS) {
        for (const tz of v.timezones) map[tz] = v.id
    }
    return map
})()
