import { NABExerciseFrontendPage } from './app.po';

describe('nabexercise-frontend App', () => {
  let page: NABExerciseFrontendPage;

  beforeEach(() => {
    page = new NABExerciseFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
