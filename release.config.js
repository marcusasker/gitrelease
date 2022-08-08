
/* eslint-env node */
module.exports = {
    branches: [
        'main',
        '+([0-9])?(.{+([0-9]),x}).x',
        {name: 'dev', prerelease: true},
        {name: 'beta', prerelease: true},
        {name: 'alpha', prerelease: true}
    ],
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'conventionalcommits',
            },
        ],
        [
            '@semantic-release/release-notes-generator',
            {
                preset: 'conventionalcommits',
            },
        ],
        '@semantic-release/changelog',
        '@semantic-release/git',
        [
            '@semantic-release/github',
            {
                assets: [
                    {path: 'index.js', label: 'Source distribution'}
                ]
            }
        ]

    ]
};