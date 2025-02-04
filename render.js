const puppeteer = require('puppeteer');

(async () => {
    // Launch a new headless browser instance
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();

    // Define the HTML content you want to render (with background & doodles)
    const htmlContent = `
    <html>
        <head>
            <style>
                body {
                    background: linear-gradient(135deg, #001f3f, #003f88);
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                    margin: 0;
                    position: relative;
                }

                /* Doodle Effect */
                .doodle {
                    position: absolute;
                    width: 120px;
                    height: 120px;
                    opacity: 0.15;
                }

                .circle {
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                }

                .wave {
                    position: absolute;
                    width: 100%;
                    height: 250px;
                    background: rgba(255, 255, 255, 0.07);
                    bottom: 0;
                    clip-path: polygon(0% 40%, 100% 80%, 100% 100%, 0% 100%);
                }

                /* Positioning Doodles */
                .doodle:nth-child(1) { top: 15%; left: 10%; }
                .doodle:nth-child(2) { top: 40%; left: 80%; width: 200px; height: 200px; }
                .doodle:nth-child(3) { bottom: 10%; left: 50%; }
            </style>
        </head>
        <body>
            <div class="doodle circle"></div>
            <div class="doodle circle"></div>
            <div class="wave"></div>
        </body>
    </html>`;

    // Set the page content to our HTML string
    await page.setContent(htmlContent);

    // Take a screenshot of the full page and save it
    await page.screenshot({
        path: 'background_doodles.png',
        fullPage: true
    });

    // Close the browser instance
    await browser.close();
    
    console.log("✅ Screenshot saved as 'background_doodles.png'");
})();