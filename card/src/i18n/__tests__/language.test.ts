import { describe, expect, it, vi } from 'vitest';
import { normalizeChromeLanguage, resolveBackendLanguage, resolveChromeLanguage } from '../language';
import { fetchIntegrationTranslations, resolveEntityLabel, resolveErrorLabel, resolveStatusLabel } from '../integrationTranslations';
import { validateConfig } from '@/utils/typeGuards';

describe('resolveChromeLanguage', () => {
  it('maps Home Assistant codes onto the shipped packs', () => {
    expect(normalizeChromeLanguage('en')).toBe('en');
    expect(normalizeChromeLanguage('en-US')).toBe('en');
    expect(normalizeChromeLanguage('tr')).toBe('tr');
    expect(normalizeChromeLanguage('tr-TR')).toBe('tr');
    expect(normalizeChromeLanguage('TR_tr')).toBe('tr');
    expect(normalizeChromeLanguage('de-DE')).toBe('en');
    expect(normalizeChromeLanguage('zh-Hans')).toBe('en');
    expect(normalizeChromeLanguage('xx')).toBe('en');
  });

  it('lets an explicit language override the Home Assistant language', () => {
    expect(resolveChromeLanguage('en', 'tr')).toBe('en');
    expect(resolveChromeLanguage('tr', 'en')).toBe('tr');
    expect(resolveChromeLanguage(undefined, 'tr')).toBe('tr');
    expect(resolveChromeLanguage('auto', 'tr-TR')).toBe('tr');
    expect(resolveChromeLanguage('auto', 'de-DE')).toBe('en');
  });

  it('requests the Home Assistant language until the card overrides it', () => {
    expect(resolveBackendLanguage('auto', 'de-DE')).toBe('de-DE');
    expect(resolveBackendLanguage(undefined, 'en')).toBe('en');
    expect(resolveBackendLanguage('tr', 'en')).toBe('tr');
    expect(resolveBackendLanguage('en', 'tr')).toBe('en');
    // Codes without a shipped pack fall back to English.
    expect(resolveBackendLanguage('fr_FR', 'de')).toBe('en');
  });
});

describe('integration labels', () => {
  it('uses the German vacuum status from the integration', () => {
    expect(
      resolveStatusLabel({ 'component.botslab_vacuum.entity.sensor.state.state.sweeping': 'Saugen' }, 'sweeping')
    ).toBe('Saugen');
  });

  it('title-cases a status the integration does not translate', () => {
    expect(resolveStatusLabel({}, 'charging_completed')).toBe('Charging completed');
  });

  it('requests entity translations for the botslab integration', async () => {
    const callWS = vi
      .fn()
      .mockResolvedValue({ resources: { 'component.botslab_vacuum.entity.switch.child_lock.name': 'Kindersicherung' } });

    await expect(fetchIntegrationTranslations(callWS, 'de')).resolves.toEqual({
      'component.botslab_vacuum.entity.switch.child_lock.name': 'Kindersicherung',
    });
    expect(callWS).toHaveBeenCalledWith({
      type: 'frontend/get_translations',
      language: 'de',
      category: 'entity',
      integration: ['botslab_vacuum'],
    });
  });

  it('falls back to the chrome label when the integration and entity have no name', () => {
    expect(
      resolveEntityLabel({
        resources: {},
        platform: 'switch',
        key: 'child_lock',
        chromeLabel: 'Child Lock',
      })
    ).toBe('Child Lock');
  });

  it('resolves localized error_code labels and falls back cleanly for unknown codes', () => {
    const trResources = {
      'component.botslab_vacuum.entity.sensor.error_code.state.5': 'Ana rulo fırça sıkıştı veya saç dolandı',
      'component.botslab_vacuum.entity.sensor.error_code.state.in_trouble': 'Robot sıkıştı veya arıza verdi (hata kodu yok)',
      'component.botslab_vacuum.entity.sensor.error_code.state.unknown': 'Bilinmeyen arıza kodu (özniteliklere bakın)',
    };
    expect(resolveErrorLabel(trResources, '5', 'Main roller brush tangled or stuck')).toBe(
      'Ana rulo fırça sıkıştı veya saç dolandı'
    );
    expect(resolveErrorLabel(trResources, 'in_trouble', 'Robot stuck or faulted (InTrouble)')).toBe(
      'Robot sıkıştı veya arıza verdi (hata kodu yok)'
    );
    expect(resolveErrorLabel(trResources, 'unknown', 'Error 102')).toBe('Error 102');
    expect(resolveErrorLabel(trResources, 'unknown', 'Normal')).toBe('Bilinmeyen arıza kodu (özniteliklere bakın)');
    expect(resolveErrorLabel(trResources, '0', 'Normal')).toBeNull();
  });
});

describe('validateConfig language', () => {
  it('accepts language auto and keeps unknown theme keys', () => {
    const result = validateConfig({
      type: 'custom:dreame-vacuum-map-card',
      entity: 'vacuum.dima',
      language: 'auto',
      accent_color: '#fff',
    });

    expect(result.valid).toBe(true);
    expect(result.data).toMatchObject({ language: 'auto', accent_color: '#fff' });
  });
});
