import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SOCIAL_LINKS,
  NAVIGATION,
  HERO_CONTENT,
  PRICING_TIERS,
  FOOTER_TEXT,
} from '@/lib/config';

describe('Website Configuration', () => {
  describe('Site Constants', () => {
    it('should have site name defined', () => {
      expect(SITE_NAME).toBe('SoloChief');
    });

    it('should have site description defined', () => {
      expect(SITE_DESCRIPTION).toBeTruthy();
      expect(SITE_DESCRIPTION.length).toBeGreaterThan(0);
    });
  });

  describe('Social Links', () => {
    it('should have all social media links', () => {
      expect(SOCIAL_LINKS.twitter).toBeDefined();
      expect(SOCIAL_LINKS.linkedin).toBeDefined();
      expect(SOCIAL_LINKS.instagram).toBeDefined();
      expect(SOCIAL_LINKS.youtube).toBeDefined();
    });

    it('should have valid URLs', () => {
      Object.values(SOCIAL_LINKS).forEach((url) => {
        expect(url).toMatch(/^https:\/\//);
      });
    });
  });

  describe('Navigation', () => {
    it('should have company navigation links', () => {
      expect(NAVIGATION.company).toBeDefined();
      expect(NAVIGATION.company.length).toBeGreaterThan(0);
    });

    it('should have legal navigation links', () => {
      expect(NAVIGATION.legal).toBeDefined();
      expect(NAVIGATION.legal.length).toBeGreaterThan(0);
    });

    it('should have label and href for each link', () => {
      NAVIGATION.company.forEach((link) => {
        expect(link.label).toBeTruthy();
        expect(link.href).toBeTruthy();
      });
    });
  });

  describe('Hero Content', () => {
    it('should have hero badge', () => {
      expect(HERO_CONTENT.badge).toBe('Future of Business');
    });

    it('should have hero headline', () => {
      expect(HERO_CONTENT.headline).toBeTruthy();
    });

    it('should have hero CTA with valid link', () => {
      expect(HERO_CONTENT.cta.primary).toBeDefined();
      expect(HERO_CONTENT.cta.primary.href).toBe('/book');
      expect(HERO_CONTENT.cta.primary.label).toBeTruthy();
    });
  });

  describe('Pricing Tiers', () => {
    it('should have at least 3 pricing tiers', () => {
      expect(PRICING_TIERS.length).toBeGreaterThanOrEqual(3);
    });

    it('should have name, price, and description for each tier', () => {
      PRICING_TIERS.forEach((tier) => {
        expect(tier.name).toBeTruthy();
        expect(tier.price).toBeTruthy();
        expect(tier.description).toBeTruthy();
        expect(Array.isArray(tier.features)).toBe(true);
        expect(tier.features.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Footer Text', () => {
    it('should have description', () => {
      expect(FOOTER_TEXT.description).toBeTruthy();
    });

    it('should have copyright template', () => {
      expect(FOOTER_TEXT.copyright).toContain('{{year}}');
      expect(FOOTER_TEXT.copyright).toContain(SITE_NAME);
    });
  });
});
