#! /usr/bin/env node
import { faker } from "@faker-js/faker/locale/af_ZA";
import chalk from "chalk";
import inquirer from "inquirer";
// Customer Class
class Customer {
    // mobNumber: number;
    constructor(fname, lname, age, gender, acc
    // mob: number
    ) {
        this.firstName = fname;
        this.lastName = lname;
        this.age = age;
        this.gender = gender;
        this.accNumber = acc;
        // this.mobNumber = mob;
    }
}
class Bank {
    constructor() {
        this.customer = [];
        this.account = [];
    }
    addCustomer(obj) {
        this.customer.push(obj);
    }
    addAccountNumber(obj) {
        this.account.push(obj);
    }
    trasection(accobj) {
        let NewAccounts = this.account.filter((acc) => acc.accNumber == accobj.accNumber);
        this.account = [...NewAccounts, accobj];
    }
}
let myBank = new Bank();
// // Customer Create
for (let i = 1; i <= 3; i++) {
    let fname = faker.person.firstName("male");
    let lname = faker.person.lastName();
    // let num = parseInt(faker.phone.number("12345678901"))
    const cus = new Customer(fname, lname, 25 * i, "male", 1000 + i);
    myBank.addCustomer(cus);
    myBank.addAccountNumber({ accNumber: cus.accNumber, balance: 100 * i });
}
// // By bank functionallity
async function bankService(bank) {
    do {
        let service = await inquirer.prompt([
            {
                type: "list",
                name: "select",
                message: "Please Select The Services",
                choices: ["View Balance", "Cash Withdrow", "Cash Deposite"],
            },
        ]);
        if (service.select == "View Balance") {
            let res = await inquirer.prompt([
                {
                    name: "num",
                    message: "Enter your Account Number!",
                    type: "input",
                },
            ]);
            let account = myBank.account.find((acc) => acc.accNumber == res.num);
            if (!account) {
                console.log(chalk.red.bold("Invalid Account Number"));
            }
            if (account) {
                let name = myBank.customer.find((item) => item.accNumber == account?.accNumber);
                console.log(`Dear ${chalk.green(name?.firstName)}  ${chalk.green(name?.lastName)}  Your account Balnce is ${chalk.blueBright(`$${account.balance}`)}`);
            }
        }
        // // Cash WithDraw
        if (service.select === "Cash Withdrow") {
            let res = await inquirer.prompt([
                {
                    name: "num",
                    message: "Enter your Account Number!",
                    type: "input",
                },
            ]);
            let account = myBank.account.find((acc) => acc.accNumber == res.num);
            if (!account) {
                console.log(chalk.red.bold("Invalid Account Number"));
            }
            if (account) {
                let ans = await inquirer.prompt({
                    type: "number",
                    message: "Enter Your Amount",
                    name: "rupee",
                });
                let newBalance = account.balance - ans.rupee;
                //  Trasection Method
                bank.trasection({ accNumber: account.accNumber, balance: newBalance });
                console.log(`Dear user your Remaning balance is: $${newBalance}`);
            }
        }
        // "Cash Deposit"
        if (service.select == "Cash Deposite") {
            let res = await inquirer.prompt([
                {
                    name: "num",
                    message: "Enter your Account Number!",
                    type: "input",
                },
            ]);
            let account = myBank.account.find((acc) => acc.accNumber == res.num);
            if (!account) {
                console.log(chalk.red.bold("Invalid Account Number"));
            }
            if (account) {
                let ans = await inquirer.prompt({
                    type: "number",
                    message: "Enter Your Amount",
                    name: "rupee",
                });
                let newBalance = account.balance + ans.rupee;
                //  Trasection Method
                bank.trasection({ accNumber: account.accNumber, balance: newBalance });
                console.log(`Dear User User Balance is: $${newBalance}`);
            }
        }
    } while (true);
}
bankService(myBank);
