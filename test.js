const {Builder, By, Key, until} = require("selenium-webdriver")

async function abrirSite(){
    try{
        let driver = await new Builder().forBrowser("chrome").build()
        await driver.manage().window().maximize()
        await driver.get("https://www.lovinwine.com.br/")
        await driver.sleep(5000)

        // Aceitando cookies
        await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Continuar e fechar')]")))
        const acceptCookies = await driver.findElement(By.xpath("//*[contains(text(), 'Continuar e fechar')]"))
        await acceptCookies.click()

        await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Você tem mais de 18 anos?')]")))
        const confirmAge = await driver.findElement(By.xpath("//*[contains(text(), 'Sim')]"))
        await confirmAge.click()
        await driver.sleep(3000)

        // Login
        const loginIcon = await driver.findElement(By.className("client__login"))
        await loginIcon.click()
        await driver.sleep(3000)
        const loginPage = await driver.findElement(By.xpath("//a[@href='/entrar']"))
        await loginPage.click()
        await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Entrar')]")))
        await driver.executeScript(`document.evaluate("//button[contains(text(), 'Entrar')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()`)

        const emailInput = await driver.findElement(By.id("email"))
        await emailInput.sendKeys("")
        const passwordInput = await driver.findElement(By.id("password"))
        await passwordInput.sendKeys("")
        await driver.sleep(3000)
        await driver.executeScript(`document.evaluate("//button[contains(text(), 'Entrar')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()`)
        await driver.sleep(5000)

        // Navegação
        const nav1 = await driver.findElement(By.xpath("//a[@href='/vinhos']"))
        await nav1.click()
        await driver.sleep(3000)
        const nav2 = await driver.findElement(By.xpath("//a[@href='/menu-kits-especiais']"))
        await nav2.click()
        await driver.sleep(3000)

        // Adicionando item ao carrinho
        await driver.executeScript(`document.evaluate("//button[contains(text(), 'Adicionar')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()`)
        await driver.sleep(2000)
        const dismissCart = await driver.findElement(By.className("cart-drawer-focusable"))
        await dismissCart.click()
        await driver.sleep(3000)

        // Sair da conta
        const accountIcon = await driver.findElement(By.className("client__login"))
        await accountIcon.click()
        await driver.sleep(3000)
        const accountPage = await driver.findElement(By.xpath("//a[@href='/conta']"))
        await accountPage.click()
        await driver.executeScript(`document.evaluate("//a[contains(text(), 'SAIR')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()`)


    } catch (e) {
        console.log(e)
    }
}

abrirSite()