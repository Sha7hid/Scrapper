// Import Playwright and its types
import { chromium } from "playwright";

const cookies: Array<{
    name: string;
    value: string;
    /**
     * Domain and path are required. For the cookie to apply to all subdomains as well, prefix domain with a dot, like
     * this: ".example.com"
     */
    domain: string;
    /**
     * Domain and path are required
     */
    path: string;
    /**
     * Unix time in seconds.
     */
    expires: number;
    httpOnly: boolean;
    secure: boolean;
    /**
     * sameSite flag
     */
    sameSite: "Strict" | "Lax" | "None";
}> = [
        {
            "name": "at-acbin",
            "value": "Atza|IwEBIOVQRwszce49-h0AVsJy2BjRo3qmGZdf3dP_2v_3s69maChf9AknSdL3XD-0NvJIN-gjAW4y9fGVmltdOQZ4k5ky1OOhaVMM_mjouM64bhFPw5RiB2J7FQTTURfGZKokv2oP4TNFeoYx52Tm4UimvVZcUmnI8bhwsWZ-02Y6ZqkQgJQOVRXtK948hceBSOyoFjMOpFI8IWKA9cmpF65DyeGwi0tutNgYG_T0WiVWgvLDSw",
            "domain": ".amazon.in",
            "path": "/",
            "expires": 1721270313.343102,
            "httpOnly": true,
            "secure": true,
            "sameSite": "None"
        },
        {
            "domain": ".amazon.in",
            "expires": 1721270313.683923,
            "httpOnly": false,
            "name": "i18n-prefs",
            "path": "/",
            "sameSite": "None",
            "secure": false,
            "value": "INR"
        },
        {
            "domain": ".amazon.in",
            "expires": 1721270313.34316,
            "httpOnly": true,
            "name": "sess-at-acbin",
            "path": "/",
            "sameSite": "None",
            "secure": true,
            "value": "\"o7exsi+fYw0JzL4kFUT/E2wUfMlMgG+iguApIA64y3g=\""
        },
        {
            "domain": ".amazon.in",
            "expires": 1724294318.181329,
            "httpOnly": false,
            "name": "session-id",
            "path": "/",
            "sameSite": "None",
            "secure": true,
            "value": "261-4395934-8899963"
        },
        {
            "domain": ".amazon.in",
            "expires": 1724294318.181409,
            "httpOnly": false,
            "name": "session-id-time",
            "path": "/",
            "sameSite": "None",
            "secure": true,
            "value": "2082787201l"
        },
        {
            "domain": ".amazon.in",
            "expires": 1724294318.181457,
            "httpOnly": true,
            "name": "session-token",
            "path": "/",
            "sameSite": "None",
            "secure": true,
            "value": "qSP8RrEGj7LUU/76o1H2QBC/JpiuivqQs7NFTZ9e/FMdLWS/CtuXlUnS2t1+oJ9dYGqRkC2S2evJvNLkHh1bsuBGA8seksk6tIJ+KeRZeaN3XGAdR4ycHDaDtnNECvoGhP+8VgFj1qfOOTqxCxsZTtK7vTA1xgHbdEM0gQ2vv1iLQUv9QOeF9/TuLlyjUB19bO/IdDJniT2nbZVFSuqcF+7B4L5NSw1MyJnqI5E7WIaoNmnSme5HiIEjI95EMGVT"
        },
        {
            "domain": ".amazon.in",
            "expires": 1721270313.343184,
            "httpOnly": true,
            "name": "sst-acbin",
            "path": "/",
            "sameSite": "None",
            "secure": true,
            "value": "Sst1|PQENjjm6Fw-wKk3xb54-c5BiCcEbJJUz5sazuMX99cMqkx75qQAQQdyvbeq242RoXYnje0uE3D4H3H9OQBqYuwnPKPvbSQvDF5mv1_pagxB1bAZSrDw-OTPGsHBHEhOKZv8GR9mhaTM1Q4CZpdOHEyp7USatDAYKHErDMuTWjbOxTZMU8iMAvPD29oXP5BnSKKT_qImVmClU7zmoawc2pEXM4IMDegkyXr3F14B6FbL5oYOO18Mb-zHWWHA-QkeU2LRT2EajcyFdhFYGjueeUOYCp7Qg2P9tYpGgdsFSTshvonQ"
        },
        {
            "domain": ".amazon.in",
            "expires": 1721270313.683825,
            "httpOnly": false,
            "name": "ubid-acbin",
            "path": "/",
            "sameSite": "None",
            "secure": true,
            "value": "260-6113969-2541566"
        },
        {
            "domain": ".amazon.in",
            "expires": 1721270313.683908,
            "httpOnly": false,
            "name": "x-acbin",
            "path": "/",
            "sameSite": "None",
            "secure": true,
            "value": "\"?MBOz10mKZDZWFfLlhbmfeREQWWomZ0uRmLrB3SXKTW13Un7pX6naiV2bEH4m?AT\""
        },
        {
            "domain": "www.amazon.in",
            "expires": 1719974314,
            "httpOnly": false,
            "name": "csm-hit",
            "path": "/",
            "sameSite": "None",
            "secure": false,
            "value": "tb:s-R9V52H2FWTK055V0C1D2|1689734313912&t:1689734314430&adb:adblk_no"
        }
    ]

    async function main(url:string) {
        return new Promise(async (resolve, reject) => {
          const browser = await chromium.launch({ headless: true });
          const context = await browser.newContext({
            bypassCSP: true,
            extraHTTPHeaders: {
              userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36",
            },
          });
      
          // Add cookies to the context.
          await context.addCookies([...cookies]);
      
          const page = await context.newPage();
          try {
            await page.goto(url);
            await page.waitForLoadState('load');
            
            // Wait for the element with data-hook="total-review-count" to appear.
            try {
            //   await page.waitForSelector('[data-hook="total-review-count"]', { timeout: 60000 });
            } catch (error) {
              console.error("Element not found within the specified timeout.");
              reject(error); // Reject the Promise if the element is not found
              return;
            }
      
            // Get the text content of the element, which contains the review count.
            const reviewCountElement = await page.evaluate(() => {
              const element = document.querySelector('[data-hook="total-review-count"]');
             const rating = document.querySelector('[class="a-icon-alt"]')
              return {
                reviewcount: element?.textContent?.trim() || '' ,// Handle the possibility of null
              name:document.getElementById('productTitle')?.textContent?.trim(),
              rating:rating?.textContent?.trim()
            };
            });
      
            let count = reviewCountElement.reviewcount;
            let name = reviewCountElement.name
            let rate = reviewCountElement.rating
            // Output the review count to the console.
      console.log("name",reviewCountElement.name)
            // Resolve the Promise with the review count
            resolve({ count, name ,rate});
          } catch (error) {
            console.error("Error:", error);
            reject(error); // Reject the Promise in case of an error
          } finally {
            // Close the page and context when done.
            await page.close();
            await context.close();
          }
        });
      }
      
      

// Export the main function
export { main };
