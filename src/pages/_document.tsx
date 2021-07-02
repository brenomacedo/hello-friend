import Document, { Html, Head, NextScript, Main } from 'next/document'

class MyDocument extends Document {

    render() {
        return (
            <Html>
                <Head>
                    <link rel="icon" href="/logo.png" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&family=Poppins:wght@100;400;500&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script dangerouslySetInnerHTML={{
                        __html: `
                        (function() {
                            window.__onThemeChange = function() {};
                            function setTheme(newTheme) {
                                window.__theme = newTheme;
                                preferredTheme = newTheme;
                                document.body.className = newTheme;
                                window.__onThemeChange(newTheme);
                            }
                            var preferredTheme;
                            try {
                                preferredTheme = localStorage.getItem('theme');
                            } catch (err) { }
                            window.__setPreferredTheme = function(newTheme) {
                                setTheme(newTheme);
                                try {
                                    localStorage.setItem('theme', newTheme);
                                } catch (err) {}
                            }
                            var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
                            darkQuery.addListener(function(e) {
                                window.__setPreferredTheme(e.matches ? 'dark' : 'light')
                            });
                            setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
                        })();
                        `
                    }} />
                </body>
            </Html>
        )
    }

}

export default MyDocument
