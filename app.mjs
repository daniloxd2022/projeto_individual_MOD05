import inquirer from 'inquirer';
import chalk from 'chalk';

class CSSPropertiesManager {
  constructor(initialList) {
    this.list = initialList;
  }

  start() {
    this.showMenu();
  }

  showMenu() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'O que você deseja fazer?',
          choices: [
            'Exibir lista CSS',
            'Adicionar itens CSS',
            'Remover itens CSS',
            'Sair',
          ],
        },
      ])
      .then((answer) => {
        let action = answer['action'];

        switch (action) {
          case 'Exibir lista CSS':
            this.showList();
            break;
          case 'Adicionar itens CSS':
            this.insertItem();
            break;
          case 'Remover itens CSS':
            this.removeItem();
            break;
          case 'Sair':
            this.exit();
            break;
        }
      });
  }

  showList() {
    console.log(`Lista CSS: ${this.list.sort().join(', ')}`);
    this.showMenu();
  }

  insertItem() {
    inquirer
      .prompt([
        {
          name: 'item',
          message: 'Digite um item CSS:',
        },
      ])
      .then((answer) => {
        let newItem = answer['item'];

        if (this.list.includes(newItem)) {
          console.log(chalk.bgRed.black('Esta propriedade já foi adicionada. Escolha outra!'));
        } else {
          this.list.push(newItem);
          console.log(chalk.green('Propriedade CSS inserida com sucesso!!!'));
        }

        this.showList();
      });
  }

  removeItem() {
    inquirer
      .prompt([
        {
          name: 'item',
          message: 'Digite um item CSS a ser removido:',
        },
      ])
      .then((answer) => {
        let itemToRemove = answer['item'];

        if (this.list.includes(itemToRemove)) {
          this.list = this.list.filter(item => item !== itemToRemove);
          console.log(chalk.bgGreen.black('Propriedade CSS removida com sucesso!!!'));
        } else {
          console.log(chalk.bgRed.black('Esta propriedade não existe na lista. Escolha outra!'));
        }

        this.showList();
      });
  }

  exit() {
    console.log(`Lista CSS final: ${this.list.sort().join(', ')}`);
    console.log(chalk.bgYellow.black('FIM DA APLICAÇÃO!!!'));
    process.exit();
  }
}

let cssManager = new CSSPropertiesManager(['color','font-family','align-items', 'background-color', 'border-radius']);
cssManager.start();
