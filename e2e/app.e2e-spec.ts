import { StudioNewsletterPage } from './app.po';

describe('studio-newsletter App', () => {
  let page: StudioNewsletterPage;

  beforeEach(() => {
    page = new StudioNewsletterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
