/**
 * Costants for end to end tests.
 */
export default class Constants{
    constructor(){
        /** @const */ this.PROD_ENV='https://www.easyknock.com/programs/sellstay';
        /** @const */ this.HOME_VALUE=200000;
        /** @const */ this.MORTGAGE_BALANCE=10000;
        /** @const */ this.LIENS=5000;
        /** @const */ this.NOT_QUALIFY_MESSAGE='Sorry! Based on the info you provided, you may not qualify for an EasyKnock program.';
    }
}