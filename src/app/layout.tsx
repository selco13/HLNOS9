import globalStyles from './globals.module.scss'

export const metadata = {
    title: 'Classicy',
    description: 'MacOS 8.5 "Platinum"',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <title>Classicy - MacOS 8.6</title>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#808080" />

                <link
                    rel="apple-touch-icon"
                    sizes="57x57"
                    href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/apple-icon-57x57.png`}
                />
                <link
                    rel="apple-touch-icon"
                    sizes="60x60"
                    href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/apple-icon-60x60.png`}
                />
                <link
                    rel="apple-touch-icon"
                    sizes="72x72"
                    href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/apple-icon-72x72.png`}
                />
                <link
                    rel="apple-touch-icon"
                    sizes="76x76"
                    href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/apple-icon-76x76.png`}
                />
                <link
                    rel="apple-touch-icon"
                    sizes="114x114"
                    href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/apple-icon-114x114.png`}
                />
                <link
                    rel="apple-touch-icon"
                    sizes="120x120"
                    href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/apple-icon-120x120.png`}
                />
                <link
                    rel="apple-touch-icon"
                    sizes="144x144"
                    href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/apple-icon-144x144.png`}
                />
                <link
                    rel="apple-touch-icon"
                    sizes="152x152"
                    href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/apple-icon-152x152.png`}
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/apple-icon-180x180.png`}
                />
                <link
                    rel="apple-touch-icon"
                    sizes="192x192"
                    href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/apple-icon-192x192.png`}
                />

                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/favicon-32x32.png`}
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="96x96"
                    href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/favicon-96x96.png`}
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/favicon-16x16.png`}
                />

                <meta
                    name="msapplication-TileImage"
                    content={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/ms-icon-144x144.png`}
                />
                <meta name="msapplication-TileColor" content="#808080" />
            </head>
            <body className={globalStyles.classicy}>{children}</body>
        </html>
    )
}
