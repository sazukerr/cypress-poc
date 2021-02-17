import Constants from '../constants.js';
import HelperFunctions from '../helpers/helper_functions.js';
import SellStay from '../page_objects/sell_stay.js';

describe('Sell and Stay Tests', () => {
    const sellStay = new SellStay();
    const helperFunctions = new HelperFunctions();
    const HOME_VALUE = new Constants().HOME_VALUE;
    const MORTGAGE_BALANCE = new Constants().MORTGAGE_BALANCE;
    const LIENS = new Constants().LIENS;
    const ENV = new Constants().PROD_ENV;

    describe('Calculator E2E tests', () => {

        beforeEach( () => {
            cy.visit(ENV);
        });

        it.skip('Calculator should be visible', () => {
            sellStay.getCalculatorSection().should('be.visible');
        });

        it('Verify calculator result', () => {
            sellStay.typeHomeValue(HOME_VALUE);
            sellStay.typeMortgageBalance(MORTGAGE_BALANCE);
            sellStay.typeLiens(LIENS);
            sellStay.getSubmitButton().click();
            sellStay.getLastResultValue().
            then(number => expect(number).to.be.equal(helperFunctions.calculateValue(HOME_VALUE, MORTGAGE_BALANCE, LIENS)));
        });

        it('Verify calculator not qualify message', () => {
            /**
             * This is a simple case that could be modified to validate other messages/cases.
             * e.g. Home value: 10,000,001
             * Mortgage balance: 0
             * Liens: 0 
             */
            const notQualifyMessage = new Constants().NOT_QUALIFY_MESSAGE;
            sellStay.typeHomeValue(HOME_VALUE - 150000);
            sellStay.typeMortgageBalance(MORTGAGE_BALANCE);
            sellStay.typeLiens(LIENS);
            sellStay.getSubmitButton().click();
            sellStay.getNotQualifyMessage().invoke('text').should((text) => {
                expect(text).to.eq(notQualifyMessage)
              });
        });

    })

    describe.skip ('Calculator tests that could be set in other levels', () => {

        /** 
         * These are some basic tests. However it could be others like:
         * - Verify boundary values: AFAIK home value should be at least 100,000 and
         *   less than 10,000,001; and mortgage balance + liens should be less than 
         *   home value * .665.
         *   So it is possible to create some tests to validate the boundary values
         *   (two or three) either FE or BE.
         * - Create random values: The best practices say we should use static values
         *   for tests, however exists the possibility to set functions where the
         *   values are generated randomly (but following some rules).
         * - More negative scenarios (e.g. Calculate button is not enable if some of
         *   the values is not set.)
         */
        before( () => {
            cy.visit(ENV);
        });

        it('Home Value input is visible', () => {
            sellStay.getHomeValueInput().should('be.visible');
        });

        it('Mortgage Balance input is visible', () => {
            sellStay.getMortgageBalanceInput().should('be.visible');
        });

        it('Other liens input is visible', () => {
            sellStay.getLiensInput().should('be.visible');
        });

        it('Calculate button should is disabled', () => {
            sellStay.getSubmitButton().should('be.disabled');
        });
    })

});