/**
* Page object for the Sell and Stay page.
*/
export default class SellStay {
    constructor(){}

    getCalculatorSection(){
        return cy.xpath('//h2[text()="How Much Cash Can You Access?"]/parent::div/parent::section');
    }
    
    getHomeValueInput () {
        return cy.get('#homeValue');
    }

    getMortgageBalanceInput () {
        return cy.get('#mortgageBalance');
    }

    getLiensInput () {
        return cy.get('#liens');
    }

    getSubmitButton(){
        return cy.get('button[type=submit]');
    }

    getNotQualifyMessage(){
        return cy.xpath('//h3[text()="Sorry! Based on the info you provided, you may not qualify for an EasyKnock program."]');
    }

    getLastResult(){
        return cy.xpath('//main //div/h3/span/text()[2]');
    }

    getLastResultValue(){
        return this.getLastResult().invoke('text')
        .then(value => parseInt(value.replace(/,/g, '')))
    }

    typeHomeValue(value){
        const field = this.getHomeValueInput();
         return field.type(value);
    }

    typeMortgageBalance(value){
        const field = this.getMortgageBalanceInput();
         return field.type(value);
    }

    typeLiens(value){
        const field = this.getLiensInput();
         return field.type(value);
    }
}