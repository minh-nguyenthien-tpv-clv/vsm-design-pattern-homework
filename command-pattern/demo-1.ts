class Account {
    private name : String

    constructor(name: String) {
        this.name = name
    }

    open() {
        console.log(`Account ${this.name} Opened`)
    }

    close() {
        console.log(`Account ${this.name} Closed`)
    }
}

interface Command {
    execute()
}

class OpenAccountCommand implements Command{
    private account: Account

    constructor(account: Account) {
        this.account = account
    }

    execute() {
        this.account.open()
    }
}

class CloseAccountCommand implements Command {
    account: Account

    constructor(account: Account) {
        this.account = account
    }

    execute() {
        this.account.close()
    }
}

class BankApp {
    private openAccount?: Command | null
    private closeAccount?: Command | null

    constructor(openAccount?: Command, closeAccount?: Command) {
        this.openAccount = openAccount
        this.closeAccount = closeAccount
    }


    clickOpenAccount() {
        console.log("User click open an account")
        this.openAccount!!.execute()
    }

    clickCloseAccount() {
        console.log("User click close an account")
        this.closeAccount!!.execute()
    }
}

const account = new Account("Minh")

const openAccount = new OpenAccountCommand(account)

const closeAccount = new CloseAccountCommand(account)

const bankApp = new BankApp(openAccount,closeAccount)

bankApp.clickOpenAccount()

bankApp.clickCloseAccount()